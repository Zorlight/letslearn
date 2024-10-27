package domain

import "github.com/gofrs/uuid/v5"

type QuestionBank struct {
	ID          uuid.UUID `json:"id" gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Title       string    `json:"title" gorm:"not null"`
	Description *string   `json:"description" gorm:"type:text"`

	Questions []Question `json:"questions" gorm:"foreignKey:QuestionBankID"`
	Creator   User       `json:"-" gorm:"foreignKey:CreatorID;constraint:OnDelete:CASCADE"`
	CreatorID uuid.UUID  `json:"-" gorm:"not null;index"`
}

type QuestionBankRepository interface {
	Create(*QuestionBank) error
	GetAllQuestionBanksOfUser(userID uuid.UUID) ([]QuestionBank, error)
}
