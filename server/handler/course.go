package handler

import (
	"encoding/json"
	"net/http"

	"github.com/gofrs/uuid/v5"
	"github.com/gorilla/mux"
	"github.com/sen1or/lets-learn/controller"
	"github.com/sen1or/lets-learn/domain"
)

type CourseHandler struct {
	ErrorHandler
	ctrl *controller.CourseController
}

func NewCourseHandler(ctrl *controller.CourseController) *CourseHandler {
	return &CourseHandler{
		ctrl: ctrl,
	}
}

func (h *CourseHandler) CreateCourse(w http.ResponseWriter, r *http.Request) {
	var course domain.Course
	body := r.Body
	defer body.Close()

	if err := json.NewDecoder(body).Decode(&course); err != nil {
		h.WriteErrorResponse(w, http.StatusBadRequest, err)
		return
	}

	if err := h.ctrl.Create(&course); err != nil {
		h.WriteErrorResponse(w, http.StatusInternalServerError, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *CourseHandler) GetCourseOfUser(w http.ResponseWriter, r *http.Request) {
	courseID := mux.Vars(r)["courseID"]
	courseUUID, err := uuid.FromString(courseID)
	if err != nil {
		h.WriteErrorResponse(w, http.StatusBadRequest, err)
		return
	}

	courses, err := h.ctrl.GetAllCoursesOfUser(courseUUID)
	if err != nil {
		h.WriteErrorResponse(w, http.StatusInternalServerError, err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(&courses); err != nil {
		h.WriteErrorResponse(w, http.StatusInternalServerError, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)

}
