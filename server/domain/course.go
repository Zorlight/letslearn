package domain

import "github.com/gofrs/uuid/v5"

type Course struct {
	ID          uuid.UUID  `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Title       string     `gorm:"not null"`
	Description *string    `gorm:"type:text"`
	ImageUrl    *string    `gorm:"type:text"`
	Price       *float64   `gorm:"default:null"`
	CategoryID  *uuid.UUID `gorm:"type:uuid"`
	Category    Category   `gorm:"foreignKey:CategoryID"`
	Level       *string    `gorm:"type:text"`
	Students    []User     `gorm:"many2many:user_courses"`
	Sections    []Section
	Resources   []AttachedFile
	IsPublished bool `gorm:"not null;default:false"`
}
