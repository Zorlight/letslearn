package domain

import "github.com/gofrs/uuid/v5"

type Chapter struct {
	ID           uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()"`
	Title        string    `gorm:"size:255"`
	Description  *string   `gorm:"size:1000"`
	VideoUrl     *string   `gorm:"size:500"`
	IsPublished  bool
	IsFree       bool
	UserProgress []UserProgress
}
