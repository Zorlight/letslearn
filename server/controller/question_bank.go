package controller

import (
	"github.com/sen1or/lets-learn/domain"
	"github.com/sen1or/lets-learn/repository"
)

type QuestionBankController struct {
	repo repository.QuestionBankRepository
}

func NewQuestionBankController(repo repository.QuestionBankRepository) *QuestionBankController {
	return &QuestionBankController{
		repo: repo,
	}
}

func (c *QuestionBankController) Create(body domain.QuestionBank) error {
	if err := c.repo.Create(body); err != nil {
		return err
	}

	return nil
}
