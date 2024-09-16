package domain

import "github.com/gofrs/uuid/v5"

type StudentResponse struct {
	ID               uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()"`
	StudentID        uuid.UUID
	QuestionID       uuid.UUID
	QuestionChoiceID uuid.UUID
}
