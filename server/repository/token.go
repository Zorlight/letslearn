package repository

import (
	"time"

	"github.com/gofrs/uuid/v5"
	"github.com/sen1or/lets-learn/domain"
	"gorm.io/gorm"
)

type JWTTokenRepository interface {
	Create(domain.RefreshToken) error
	Save(domain.RefreshToken) error
	GetByValue(tokenValue string) (*domain.RefreshToken, error)
	RevokeAllRefreshTokensOfUser(userID uuid.UUID) error
}

type postgresTokenRepo struct {
	db gorm.DB
}

func NewJWTTokenRepository(conn gorm.DB) JWTTokenRepository {
	return &postgresTokenRepo{
		db: conn,
	}
}
func (r *postgresTokenRepo) Create(tokenRecord domain.RefreshToken) error {
	result := r.db.Create(&tokenRecord)
	return result.Error
}

func (r *postgresTokenRepo) GetByValue(tokenValue string) (*domain.RefreshToken, error) {
	var refreshToken domain.RefreshToken
	result := r.db.First(&refreshToken, "value = ", tokenValue)

	if result.Error != nil {
		return nil, result.Error
	}

	return &refreshToken, nil
}

func (r *postgresTokenRepo) Save(token domain.RefreshToken) error {
	result := r.db.Save(token)
	return result.Error
}

func (r *postgresTokenRepo) RevokeAllRefreshTokensOfUser(userID uuid.UUID) error {
	var refreshToken domain.RefreshToken
	var timeNow = time.Now()

	result := r.db.Model(&refreshToken).Where("user_id = ?", userID.String()).Updates(&domain.RefreshToken{RevokedAt: &timeNow})

	return result.Error
}
