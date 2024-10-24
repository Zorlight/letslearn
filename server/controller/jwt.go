package controller

import (
	"os"
	"time"

	"github.com/gofrs/uuid/v5"
	"github.com/golang-jwt/jwt/v5"
	"github.com/sen1or/lets-learn/config"
	"github.com/sen1or/lets-learn/domain"
	"github.com/sen1or/lets-learn/repository"
)

type JWTTokenController struct {
	repo repository.JWTTokenRepository
}

func NewJWTTokenController(repo repository.JWTTokenRepository) *JWTTokenController {
	return &JWTTokenController{
		repo: repo,
	}
}

func (c *JWTTokenController) RevokeByValue(tokenValue string) error {
	refreshToken, err := c.repo.GetByValue(tokenValue)

	if err != nil {
		return err
	}

	timeNow := time.Now()
	refreshToken.RevokedAt = &timeNow

	return c.repo.Save(*refreshToken)
}

func (c *JWTTokenController) RevokeAll(userId uuid.UUID) error {
	return c.repo.RevokeAllRefreshTokensOfUser(userId)
}

func (c *JWTTokenController) Create(tokenRecord domain.RefreshToken) error {
	return c.repo.Create(tokenRecord)
}

func (c *JWTTokenController) GetByValue(tokenValue string) (*domain.RefreshToken, error) {
	return c.repo.GetByValue(tokenValue)
}

func (c *JWTTokenController) GenerateTokenPair(userId uuid.UUID) (refreshToken string, accessToken string, err error) {
	unsignedRefreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userId":    userId.String(),
		"expiresAt": time.Now().Add(config.REFRESH_TOKEN_EXPIRES_DURATION),
	})

	unsignedAccessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userId":    userId.String(),
		"expiresAt": time.Now().Add(config.ACCESS_TOKEN_EXPIRES_DURATION),
	})

	refreshToken, err = unsignedRefreshToken.SignedString([]byte(os.Getenv("REFRESH_TOKEN_SECRET")))
	accessToken, err = unsignedAccessToken.SignedString([]byte(os.Getenv("ACCESS_TOKEN_SECRET")))

	if err != nil {
		return "", "", err
	}

	refreshTokenExpiresAt := time.Now().Add(config.REFRESH_TOKEN_EXPIRES_DURATION)
	refreshTokenRecord, err := createRefreshTokenObject(refreshToken, refreshTokenExpiresAt, userId)

	if err != nil {
		return "", "", err
	}

	if err := c.repo.Create(*refreshTokenRecord); err != nil {
		return "", "", err
	}

	return
}

func createRefreshTokenObject(signedRefreshToken string, expiresAt time.Time, userId uuid.UUID) (*domain.RefreshToken, error) {
	uuid, err := uuid.NewV4()
	if err != nil {
		return nil, err
	}

	refreshToken := &domain.RefreshToken{
		ID:        uuid,
		UserID:    userId,
		Value:     signedRefreshToken,
		ExpiresAt: expiresAt,
	}

	return refreshToken, nil
}
