package handler

import (
	"context"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	auth "github.com/livekit/protocol/auth"
	livekit "github.com/livekit/protocol/livekit"
	lksdk "github.com/livekit/server-sdk-go"
)

var livekitHost = os.Getenv("LIVEKIT_HOST")
var livekitServerUrl = os.Getenv("LIVEKIT_URL")
var roomClient = lksdk.NewRoomServiceClient(livekitHost, os.Getenv("LIVEKIT_API_KEY"), os.Getenv("LIVEKIT_API_SECRET"))

type LivekitHandler struct {
	ErrorHandler
}

func NewLivekitHandler() *LivekitHandler {
	return &LivekitHandler{}
}

// start the live meeting
func (h *LivekitHandler) LiveKitCreateSession(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	meetingID, ok := params["meetingID"]

	if !ok {
		h.WriteErrorResponse(w, http.StatusBadRequest, errors.New("missing meeting ID"))
		return
	}

	_, err := roomClient.CreateRoom(context.Background(), &livekit.CreateRoomRequest{
		Name:            meetingID,
		EmptyTimeout:    10 * 60,
		MaxParticipants: 100,
	})

	if err != nil {
		h.WriteErrorResponse(w, http.StatusInternalServerError, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *LivekitHandler) LiveKitDeleteRoom(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	meetingID, ok := params["meetingID"]

	if !ok {
		h.WriteErrorResponse(w, http.StatusBadRequest, errors.New("missing meeting ID"))
		return
	}

	_, err := roomClient.DeleteRoom(context.Background(), &livekit.DeleteRoomRequest{
		Room: meetingID,
	})

	if err != nil {
		h.WriteErrorResponse(w, http.StatusInternalServerError, err)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (h *LivekitHandler) LiveKitGetJoinConnectionDetails(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	meetingID, mOk := params["meetingID"]
	username := r.URL.Query().Get("name")

	if len(username) == 0 || !mOk {
		h.WriteErrorResponse(w, http.StatusBadRequest, errors.New("missing information"))
		return
	}

	var existRoom = false
	listRoomsResponse, err := roomClient.ListRooms(context.Background(), &livekit.ListRoomsRequest{})
	log.Printf("ROOM REPONSES: %s", listRoomsResponse.String())

	for _, room := range listRoomsResponse.Rooms {
		log.Printf("ROOM NAME: %s", room.Name)
		if room.Name == meetingID {
			existRoom = true
		}
	}

	if !existRoom {
		h.WriteErrorResponse(w, http.StatusNotFound, errors.New("room not found"))
		return
	}

	apiKey := os.Getenv("LIVEKIT_API_KEY")
	apiSecret := os.Getenv("LIVEKIT_API_SECRET")

	at := auth.NewAccessToken(apiKey, apiSecret)

	grant := &auth.VideoGrant{
		Room:     meetingID,
		RoomJoin: true,
	}

	at.AddGrant(grant).
		SetIdentity(username).
		SetValidFor(24 * time.Hour)

	token, err := at.ToJWT()
	if err != nil {
		h.WriteErrorResponse(w, http.StatusInternalServerError, err)
		return
	}

	response := &struct {
		ParticipantToken string `json:"participantToken"`
		ParticipantName  string `json:"participantName"`
		ServerUrl        string `json:"serverUrl"`
		RoomName         string `json:"roomName"`
	}{
		ParticipantToken: token,
		ParticipantName:  username,
		ServerUrl:        livekitServerUrl,
		RoomName:         meetingID,
	}

	//jRes, err := json.Marshal(response)

	//if err != nil {
	//	h.WriteErrorResponse(w, http.StatusInternalServerError, err)
	//	return
	//}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
