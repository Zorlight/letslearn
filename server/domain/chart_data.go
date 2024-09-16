package domain

import "github.com/gofrs/uuid/v5"

type ChartData struct {
	ID    uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4()"`
	Name  string
	Value int
}
