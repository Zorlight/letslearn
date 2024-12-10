package main

import (
	"github.com/sen1or/lets-learn/api"

	_ "github.com/joho/godotenv/autoload"
)

func main() {
	api := api.NewApi()
	go api.ListenAndServe()

	select {}
}
