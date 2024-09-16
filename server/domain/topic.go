package domain

import "github.com/gofrs/uuid/v5"

type Topic struct {
	ID        uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()"`
	SectionID uuid.UUID
	Title     string `gorm:"size:255"`
	Type      string `gorm:"size:50"`
	Url       *string
}
