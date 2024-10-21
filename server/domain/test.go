package domain

import (
	"github.com/gofrs/uuid/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"gorm.io/gorm"
)

type Test struct {
	ID uuid.UUID `gorm:"type:uuid;primaryKey;default:uuid_generate_v4()"`
	gorm.Model
	Name             string `gorm:"size:255;not null"`
	Description      string `gorm:"type:text"`
	Type             string `gorm:"size:50;not null"`
	OpenValue        string `gorm:"size:255"`
	OpenEnabled      bool   `gorm:"default:false"`
	CloseEnabled     bool   `gorm:"default:false"`
	CloseValue       string `gorm:"size:255"`
	TimeLimitEnabled bool   `gorm:"default:false"`
	TimeLimitValue   int
	TimeLimitUnit    string            `gorm:"size:50"`
	Data             pgtype.JSONBCodec `gorm:"type:jsonb"`
	Questions        []Question
}
