package domain

import (
	"time"

	"github.com/gofrs/uuid/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

type Question struct {
	ID           uuid.UUID         `json:"id" gorm:"type:uuid;primary_key;default:uuid_generate_v4()"`
	QuestionName string            `json:"name" gorm:"size:255"`
	QuestionText string            `json:"text" gorm:"size:1023"`
	Status       string            `json:"status" gorm:"size:50"`
	Type         string            `json:"type"`
	DefaultMark  float64           `json:"defaultMark"`
	Usage        int               `json:"usage" gorm:"default:0"`
	DeletedAt    *time.Time        `json:"deletedAt"`
	Data         pgtype.JSONBCodec `json:"data" gorm:"type:jsonb"`

	QuestionChoices  []QuestionChoice `json:"questionChoices" gorm:"foreignKey:QuestionID"`
	StudentResponses []QuestionChoice `json:"studentResponses"`

	QuestionBank   QuestionBank `json:"questionBank" `
	QuestionBankID uuid.UUID    `json:"questionBankID"`

	Creator   User      `gorm:"foreignKey:CreatorID"`
	CreatorID uuid.UUID `json:"creatorID"`
}

type QuestionChoice struct {
	ID               uuid.UUID `json:"id" gorm:"type:uuid;primary_key;default:uuid_generate_v4()"`
	QuestionID       uuid.UUID `json:"questionID" gorm:"type:uuid;not null"`
	Text             string    `json:"text" gorm:"size:255"`
	GradePercent     float64   `json:"gradePercent"`
	Feedback         string    `gorm:"size:1000"`
	StudentResponses []StudentResponse
}
