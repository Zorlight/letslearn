package repository

import (
	"github.com/gofrs/uuid/v5"
	"github.com/sen1or/lets-learn/domain"

	"gorm.io/gorm"
)

type CourseRepository interface {
	Create(*domain.Course) error
	GetAllCoursesOfUser(userID uuid.UUID) ([]domain.Course, error)
}

type postgresCourseRepo struct {
	db gorm.DB
}

func NewCourseRepository(conn gorm.DB) CourseRepository {
	return &postgresCourseRepo{
		db: conn,
	}
}

// func (r *postgresCourseRepo) Create(title string, description *string, imageURL *string, category string, level *string) error {
func (r *postgresCourseRepo) Create(course *domain.Course) error {
	result := r.db.Create(course)
	return result.Error
}

func (r *postgresCourseRepo) GetAllCoursesOfUser(userID uuid.UUID) ([]domain.Course, error) {
	var courses []domain.Course
	result := r.db.Where("creator_id = ", userID.String()).Find(&courses)
	if result.Error != nil {
		return nil, result.Error
	}

	return courses, nil
}
