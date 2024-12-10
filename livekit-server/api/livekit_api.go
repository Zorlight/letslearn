package api

import (
	"context"
	"encoding/json"
	"errors"
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

// start the live meeting
func (a *api) LiveKitCreateSession(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	meetingID, ok := params["meetingID"]

	if !ok {
		a.errorResponse(w, http.StatusBadRequest, errors.New("missing meeting ID"))
		return
	}

	_, err := roomClient.CreateRoom(context.Background(), &livekit.CreateRoomRequest{
		Name:            meetingID,
		EmptyTimeout:    10 * 60,
		MaxParticipants: 100,
	})

	if err != nil {
		a.errorResponse(w, http.StatusInternalServerError, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (a *api) LiveKitDeleteRoom(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	meetingID, ok := params["meetingID"]

	if !ok {
		a.errorResponse(w, http.StatusBadRequest, errors.New("missing meeting ID"))
		return
	}

	_, err := roomClient.DeleteRoom(context.Background(), &livekit.DeleteRoomRequest{
		Room: meetingID,
	})

	if err != nil {
		a.errorResponse(w, http.StatusInternalServerError, err)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (a *api) LiveKitGetJoinConnectionDetails(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	meetingID, mOk := params["meetingID"]
	username := r.URL.Query().Get("name")

	if len(username) == 0 || !mOk {
		a.errorResponse(w, http.StatusBadRequest, errors.New("missing information"))
		return
	}

	var existRoom = false
	listRoomsResponse, err := roomClient.ListRooms(context.Background(), &livekit.ListRoomsRequest{})
	if err != nil {
		a.errorResponse(w, http.StatusInternalServerError, err)
		return
	}

	for _, room := range listRoomsResponse.Rooms {
		if room.Name == meetingID {
			existRoom = true
		}
	}

	if !existRoom {
		a.errorResponse(w, http.StatusNotFound, errors.New("room not found"))
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
		a.errorResponse(w, http.StatusInternalServerError, err)
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

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
