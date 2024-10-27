package repository

import (
	"github.com/sen1or/lets-learn/domain"

	"gorm.io/gorm"
)

type QuestionRepository interface {
	Create(domain.Question) error
}

type postgresQuestionRepo struct {
	db gorm.DB
}

func NewQuestionRepository(conn gorm.DB) QuestionRepository {
	return &postgresQuestionRepo{
		db: conn,
	}
}

func (r *postgresQuestionRepo) Create(question domain.Question) error {
	result := r.db.Create(&question)
	return result.Error
}
