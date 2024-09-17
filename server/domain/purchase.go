package domain

import (
	"github.com/gofrs/uuid/v5"
	"gorm.io/gorm"
)

type Purchase struct {
	ID uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()"`
	gorm.Model
	UserID   uuid.UUID
	CourseID uuid.UUID
}
