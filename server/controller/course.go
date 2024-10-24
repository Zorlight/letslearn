package controller

import (
	"github.com/gofrs/uuid/v5"
	"github.com/sen1or/lets-learn/domain"
	"github.com/sen1or/lets-learn/repository"
)

type CourseController struct {
	repo repository.CourseRepository
}

func NewCourseController(repo repository.CourseRepository) *CourseController {
	return &CourseController{
		repo: repo,
	}
}

func (c *CourseController) Create(course *domain.Course) error {
	return c.repo.Create(course)
}

func (c *CourseController) GetAllCoursesOfUser(userID uuid.UUID) ([]domain.Course, error) {
	return c.repo.GetAllCoursesOfUser(userID)
}
