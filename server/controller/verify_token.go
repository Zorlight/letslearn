package controller

import (
	"time"

	"github.com/gofrs/uuid/v5"
	"github.com/sen1or/lets-learn/domain"
	"github.com/sen1or/lets-learn/repository"
)

type VerifyTokenController struct {
	repo repository.VerifyTokenRepository
}

func NewVerifyTokenController(repo repository.VerifyTokenRepository) *VerifyTokenController {
	return &VerifyTokenController{
		repo: repo,
	}
}

func (c *VerifyTokenController) GetByTokenValue(tokenValue string) (*domain.VerifyToken, error) {
	return c.repo.GetByTokenValue(tokenValue)
}

func (c *VerifyTokenController) Create(userID uuid.UUID) (string, error) {
	token, _ := uuid.NewGen().NewV4()
	newToken := &domain.VerifyToken{
		Token:     token.String(),
		ExpiresAt: time.Now().Add(1 * time.Hour),
		UserID:    userID,
	}
	if err := c.repo.Create(newToken); err != nil {
		return "", err
	}

	return token.String(), nil
}

func (c *VerifyTokenController) DeleteByID(tokenID uint) error {
	return c.repo.Delete(tokenID)
}

func (c *VerifyTokenController) DeleteByValue(tokenValue string) error {
	token, err := c.repo.GetByTokenValue(tokenValue)
	if err != nil {
		return err
	}

	return c.repo.Delete(token.ID)
}
