package domain

import (
	"github.com/gofrs/uuid/v5"
	"gorm.io/gorm"
)

type User struct {
	ID         uuid.UUID `json:"id" gorm:"primaryKey"`
	FacebookID string    `json:"-" gorm:"unique"`
	gorm.Model
	Username     string `json:"username" gorm:"unique;size:20;not null"`
	Email        string `json:"email" gorm:"unique;not null"`
	PasswordHash string `json:"-"`
	IsVerified   bool   `json:"isVerified" gorm:"not full;default:false"`

	RefreshTokens []RefreshToken `json:"-"`
	VerifyToken   []VerifyToken  `json:"-"`
}

type UserRepository interface {
	GetByID(uuid.UUID) (*User, error)
	GetByName(string) (*User, error)
	GetByEmail(string) (*User, error)
	GetByFacebookID(string) (*User, error)

	Create(User) error
	Update(User) error
	Delete(string) error
}
