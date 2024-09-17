package domain

import "github.com/gofrs/uuid/v5"

type Section struct {
	ID       uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()"`
	CourseID uuid.UUID
	Title    string `gorm:"size:255"`
	Topics   []Topic
}
