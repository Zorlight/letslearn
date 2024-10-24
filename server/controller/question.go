package controller

import (
	"github.com/sen1or/lets-learn/domain"
	"github.com/sen1or/lets-learn/repository"
)

type QuestionController struct {
	repo repository.QuestionRepository
}

func NewQuestionController(repo repository.QuestionRepository) *QuestionController {
	return &QuestionController{
		repo: repo,
	}
}

func (c *QuestionController) Create(body domain.Question) error {
	if err := c.repo.Create(body); err != nil {
		return err
	}

	return nil
}
