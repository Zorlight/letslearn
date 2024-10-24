package handler

import (
	"encoding/json"
	"net/http"

	"github.com/sen1or/lets-learn/controller"
	"github.com/sen1or/lets-learn/domain"
)

type QuestionBankHandler struct {
	ErrorHandler
	ctrl *controller.QuestionBankController
}

func NewQuestionBankHandler(ctrl *controller.QuestionBankController) *QuestionBankHandler {
	return &QuestionBankHandler{
		ctrl: ctrl,
	}
}

func (h *QuestionBankHandler) Create(w http.ResponseWriter, r *http.Request) {
	var body domain.QuestionBank
	defer r.Body.Close()

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		h.WriteErrorResponse(w, http.StatusBadRequest, err)
		return
	}

	if err := h.ctrl.Create(body); err != nil {
		h.WriteErrorResponse(w, http.StatusBadRequest, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
