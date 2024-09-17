package domain

import (
	"github.com/gofrs/uuid/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"gorm.io/gorm"
)

type Question struct {
	ID uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()"`
	gorm.Model
	QuestionName     string `gorm:"size:255"`
	QuestionText     string `gorm:"size:1000"`
	Status           string `gorm:"size:50"` // QuestionStatus
	DefaultMark      float64
	QuestionChoices  []QuestionChoice
	Usage            int
	QuestionData     pgtype.JSONBCodec `gorm:"type:jsonb"`
	StudentResponses []QuestionChoice
}

type QuestionChoice struct {
	ID               uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()"`
	QuestionID       uuid.UUID
	Text             string `gorm:"size:255"`
	GradePercent     float64
	Feedback         string `gorm:"size:1000"`
	StudentResponses []StudentResponse
}
