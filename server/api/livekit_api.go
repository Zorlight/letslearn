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

var host = os.Getenv("LIVEKIT_HOST")
var roomClient = lksdk.NewRoomServiceClient(host, os.Getenv("LIVEKIT_API_KEY"), os.Getenv("LIVEKIT_API_SECRET"))

func (a *api) LiveKitCreateRoom(w http.ResponseWriter, r *http.Request) {
	newRoomName, err := uuid.NewGen().NewV4()
	if err != nil {
		a.errorResponse(w, http.StatusInternalServerError, err)
		return
	}

	_, err = roomClient.CreateRoom(context.Background(), &livekit.CreateRoomRequest{
		Name:            newRoomName.String(),
		EmptyTimeout:    1 * 60,
		MaxParticipants: 2,
	})

	if err != nil {
		a.errorResponse(w, http.StatusInternalServerError, err)
		return
	}

	w.Header().Set("Content-Type", "plain/text")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(newRoomName.String()))
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

func (a *api) LiveKitGetJoinToken(w http.ResponseWriter, r *http.Request) {
	roomName := r.PathValue("roomName")
	username, iOk := r.URL.Query()["username"]

	if !iOk {
		a.errorResponse(w, http.StatusBadRequest, errors.New("missing username query"))
		return
	}

	apiKey := os.Getenv("LIVEKIT_API_KEY")
	apiSecret := os.Getenv("LIVEKIT_API_SECRET")

	at := auth.NewAccessToken(apiKey, apiSecret)

	grant := &auth.VideoGrant{
		RoomJoin: true,
		Room:     roomName,
	}

	at.AddGrant(grant).
		SetIdentity(username[0]).
		SetValidFor(time.Hour)

	token, err := at.ToJWT()
	if err != nil {
		a.errorResponse(w, http.StatusInternalServerError, err)
		return
	}

	response := &struct {
		Token string `json:"token"`
	}{
		Token: token,
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
