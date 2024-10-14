package main

import (
	"fmt"
	"log"
	"os"

	"github.com/sen1or/lets-learn/api"
	"github.com/sen1or/lets-learn/hack"
	"github.com/stripe/stripe-go/v80"

	_ "github.com/joho/godotenv/autoload"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	stripe.Key = os.Getenv("STRIPE_SECRET_KEY")

	dbConn := GetDatabaseConnection()
	hack.AutoMigrateAllTables(*dbConn)
	api := api.NewApi(*dbConn)
	go api.ListenAndServe()

	select {}
}

func GetDatabaseConnection() *gorm.DB {
	host := os.Getenv("POSTGRES_HOST")
	user := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")
	dbname := os.Getenv("POSTGRES_DB")
	port := os.Getenv("POSTGRES_PORT")

	var dsn = fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Saigon", host, user, password, dbname, port)
	var db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		DryRun: false,
	})
	if err != nil {
		log.Panic(err)
	}

	return db
}
