package domain

import "github.com/gofrs/uuid/v5"

type Category struct {
	ID   uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()"`
	Name string    `gorm:"size:255"`
}
