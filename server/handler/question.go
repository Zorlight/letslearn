package handler

import (
	"encoding/json"
	"net/http"

	"github.com/gofrs/uuid/v5"
	"github.com/gorilla/mux"
	"github.com/sen1or/lets-learn/controller"
	"github.com/sen1or/lets-learn/domain"
)

type QuestionHandler struct {
	ErrorHandler
	ctrl *controller.QuestionController
}

func NewQuestionHandler(ctrl *controller.QuestionController) *QuestionHandler {
	return &QuestionHandler{
		ctrl: ctrl,
	}
}

func (h *QuestionHandler) Create(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	questionBankID, err := uuid.FromString(params["questionBankID"])

	if err != nil {
		h.WriteErrorResponse(w, http.StatusBadRequest, err)
		return
	}

	var body domain.Question
	defer r.Body.Close()

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		h.WriteErrorResponse(w, http.StatusBadRequest, err)
		return
	}

	body.QuestionBankID = questionBankID

	if err := h.ctrl.Create(body); err != nil {
		h.WriteErrorResponse(w, http.StatusBadRequest, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
