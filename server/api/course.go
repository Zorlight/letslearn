package api

import (
	"encoding/json"
	"net/http"

	"github.com/sen1or/lets-learn/domain"
)

func (a *api) CreateCourse(w http.ResponseWriter, r *http.Request) {
	var course domain.Course
	body := r.Body
	defer body.Close()

	if err := json.NewDecoder(body).Decode(&course); err != nil {
		a.errorResponse(w, http.StatusBadRequest, err)
		return
	}

	if err := a.courseRepo.Create(&course); err != nil {
		a.errorResponse(w, http.StatusInternalServerError, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

//func (r *postgresCourseRepo) Create(title string, description *string, imageURL *string, category string, level *string) error {
