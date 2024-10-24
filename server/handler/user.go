package handler

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/gofrs/uuid/v5"
	"github.com/sen1or/lets-learn/controller"
)

type UserHandler struct {
	ErrorHandler
	ctrl controller.UserController
}

func NewUserHandler(ctrl controller.UserController) *UserHandler {
	return &UserHandler{
		ctrl: ctrl,
	}
}

func (h *UserHandler) GetUserByIdHandler(w http.ResponseWriter, r *http.Request) {
	userId := r.PathValue("id")
	userUUID, err := uuid.FromString(userId)

	if err != nil {
		h.WriteErrorResponse(w, http.StatusBadRequest, errors.New("userId not valid"))
	}
	user, err := h.ctrl.GetByID(userUUID)

	if err != nil {
		h.WriteErrorResponse(w, http.StatusInternalServerError, err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}
