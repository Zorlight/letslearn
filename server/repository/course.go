package repository

import (
	"github.com/sen1or/lets-learn/domain"

	"gorm.io/gorm"
)

type postgresCourseRepo struct {
	db gorm.DB
}

func NewCourseRepository(conn gorm.DB) domain.CourseRepository {
	return &postgresCourseRepo{
		db: conn,
	}
}

// func (r *postgresCourseRepo) Create(title string, description *string, imageURL *string, category string, level *string) error {
func (r *postgresCourseRepo) Create(course *domain.Course) error {
	result := r.db.Create(course)
	return result.Error
}
