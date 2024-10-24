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
	IsTeacher    bool   `json:"isTeacher" gorm:"not null"`

	RefreshTokens  []RefreshToken `json:"-"`
	VerifyTokens   []VerifyToken  `json:"-"`
	UserProgresses []UserProgress `json:"-"`
	Courses        []Course       `json:"-" gorm:"many2many:user_courses"`
}
