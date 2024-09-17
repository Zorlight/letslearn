package domain

import "github.com/gofrs/uuid/v5"

type AttachedFile struct {
	ID       string `gorm:"type:uuid;default:uuid_generate_v4()"`
	CourseID uuid.UUID
	CloudUrl string `gorm:"size:500"`
}
