package repository

import (
	"github.com/sen1or/lets-learn/domain"
	"log"

	"gorm.io/gorm"
)

type VerifyTokenRepository interface {
	Create(*domain.VerifyToken) error
	GetByTokenValue(token string) (*domain.VerifyToken, error)
	Save(domain.VerifyToken) error
	Delete(tokenId uint) error
}

type postgresVerifyTokenRepo struct {
	db gorm.DB
}

func NewVerifyTokenRepo(conn gorm.DB) VerifyTokenRepository {
	return &postgresVerifyTokenRepo{
		db: conn,
	}
}

func (r *postgresVerifyTokenRepo) Create(newToken *domain.VerifyToken) error {
	result := r.db.Create(newToken)
	if result.Error != nil {
		log.Printf("error while creating new verify token: %s", result.Error.Error())
		return nil
	}

	return nil
}

func (r *postgresVerifyTokenRepo) GetByTokenValue(token string) (*domain.VerifyToken, error) {
	var record domain.VerifyToken
	result := r.db.First(&record, "token = ?", token)

	if result.Error != nil {
		return nil, result.Error
	}

	return &record, nil
}

func (r *postgresVerifyTokenRepo) Save(verifyToken domain.VerifyToken) error {
	result := r.db.Model(&verifyToken).Save(&verifyToken)
	return result.Error
}

func (r *postgresVerifyTokenRepo) Delete(tokenID uint) error {
	result := r.db.Where("id = ?", tokenID).Delete(&domain.VerifyToken{})
	return result.Error
}
