package api

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"os"
	"time"

	"github.com/gofrs/uuid/v5"
	auth "github.com/livekit/protocol/auth"
	livekit "github.com/livekit/protocol/livekit"
	lksdk "github.com/livekit/server-sdk-go"
)

var livekitHost = os.Getenv("LIVEKIT_HOST")
var livekitServerUrl = os.Getenv("LIVEKIT_URL")
var roomClient = lksdk.NewRoomServiceClient(livekitHost, os.Getenv("LIVEKIT_API_KEY"), os.Getenv("LIVEKIT_API_SECRET"))

func (a *api) LiveKitCreateRoom(w http.ResponseWriter, r *http.Request) {
	newRoomID, err := uuid.NewGen().NewV4()
	if err != nil {
		a.errorResponse(w, http.StatusInternalServerError, err)
		return
	}

	_, err = roomClient.CreateRoom(context.Background(), &livekit.CreateRoomRequest{
		Name:            newRoomID.String(),
		EmptyTimeout:    1 * 60,
		MaxParticipants: 100,
	})

	if err != nil {
		a.errorResponse(w, http.StatusInternalServerError, err)
		return
	}

	w.Header().Set("Content-Type", "plain/text")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(newRoomID.String()))
}

func (a *api) LiveKitDeleteRoom(w http.ResponseWriter, r *http.Request) {
	roomName := r.URL.Query().Get("roomName")
	_, err := roomClient.DeleteRoom(context.Background(), &livekit.DeleteRoomRequest{
		Room: roomName,
	})

	if err != nil {
		a.errorResponse(w, http.StatusInternalServerError, err)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (a *api) LiveKitGetJoinConnectionDetails(w http.ResponseWriter, r *http.Request) {
	roomName, rOk := r.URL.Query()["roomName"]
	username, uOk := r.URL.Query()["participantName"]

	if !uOk || !rOk {
		a.errorResponse(w, http.StatusBadRequest, errors.New("missing information"))
		return
	}

	var existRoom = false
	listRoomsResponse, err := roomClient.ListRooms(context.Background(), &livekit.ListRoomsRequest{})
	for _, room := range listRoomsResponse.Rooms {
		if room.Name == roomName[0] {
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
		Room:     roomName[0],
		RoomJoin: true,
	}

	at.AddGrant(grant).
		SetIdentity(username[0]).
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
		ParticipantName:  username[0],
		ServerUrl:        livekitServerUrl,
		RoomName:         roomName[0],
	}

	//jRes, err := json.Marshal(response)

	//if err != nil {
	//	a.errorResponse(w, http.StatusInternalServerError, err)
	//	return
	//}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
