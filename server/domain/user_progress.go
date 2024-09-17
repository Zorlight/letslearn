package domain

import (
	"time"

	"github.com/gofrs/uuid/v5"
)

type UserProgress struct {
	ID          uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	UserID      uuid.UUID
	ChapterID   uuid.UUID
	IsCompleted bool      `gorm:"not null;default:false"`
	CompletedAt time.Time `gorm:"default:null"`
}
