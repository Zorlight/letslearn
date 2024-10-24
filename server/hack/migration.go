package hack

import (
	"github.com/sen1or/lets-learn/domain"

	"gorm.io/gorm"
)

func AutoMigrateAllTables(dbConn gorm.DB) error {
	migrator := dbConn.Migrator()

	err := migrator.AutoMigrate(
		&domain.Course{},
		&domain.User{},
		&domain.Section{},
		&domain.Chapter{},
		&domain.ChartData{},
		&domain.Purchase{},
		&domain.Question{},
		&domain.QuestionChoice{},
		&domain.RefreshToken{},
		&domain.StudentResponse{},
		&domain.Topic{},
		&domain.UserProgress{},
		&domain.VerifyToken{},
		&domain.AttachedFile{},
	)

	if err != nil {
		return err
	}

	return nil
}

//func (mm *MyMigrator) RecreateDatabase() {
//	migrator := mm.dbConn.Migrator()
//
//	err := migrator.DropTable(&domain.User{})
//	if err != nil {
//		return err
//	}
//
//	return nil
//
//}
