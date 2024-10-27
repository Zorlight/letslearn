package repository

import (
	"github.com/sen1or/lets-learn/domain"
	"gorm.io/gorm"
)

type QuestionBankRepository interface {
	Create(domain.QuestionBank) error
}

type postgresQuestionBankRepo struct {
	db gorm.DB
}

func NewQuestionBankRepository(conn gorm.DB) QuestionBankRepository {
	return &postgresQuestionBankRepo{
		db: conn,
	}
}

func (r *postgresQuestionBankRepo) Create(bank domain.QuestionBank) error {
	result := r.db.Create(&bank)
	return result.Error
}
