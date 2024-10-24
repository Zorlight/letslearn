package controller

import (
	"github.com/gofrs/uuid/v5"
	"github.com/sen1or/lets-learn/domain"
	"github.com/sen1or/lets-learn/repository"
)

type UserController struct {
	repo repository.UserRepository
}

func NewUserController(repo repository.UserRepository) *UserController {
	return &UserController{
		repo: repo,
	}
}

func (c *UserController) Create(body *domain.User) error {
	if err := c.repo.Create(body); err != nil {
		return err
	}

	return nil
}

func (c *UserController) GetByID(id uuid.UUID) (*domain.User, error) {
	user, err := c.repo.GetByID(id)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (c *UserController) GetByEmail(email string) (*domain.User, error) {
	user, err := c.repo.GetByEmail(email)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (c *UserController) GetByFacebookID(id string) (*domain.User, error) {
	user, err := c.repo.GetByFacebookID(id)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (c *UserController) GetByName(username string) (*domain.User, error) {
	user, err := c.repo.GetByName(username)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (c *UserController) Save(user *domain.User) error {
	return c.repo.Save(user)

}

func (c *UserController) Delete(userID string) error {
	return c.repo.Delete(userID)
}
