package api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

const PORT = "8111"

type api struct{}

func NewApi() *api {
	return &api{}
}

func (a *api) ListenAndServe() {
	server := &http.Server{
		Addr:         ":" + PORT,
		Handler:      a.Routes(),
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	log.Printf("server url is http://localhost:%s\n", PORT)
	log.Panic("server ends: ", server.ListenAndServe())
}

func (a *api) Routes() *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/v1/meeting/{meetingID}", a.LiveKitGetJoinConnectionDetails).Methods("GET")
	router.HandleFunc("/v1/meeting/{meetingID}", a.LiveKitCreateSession).Methods("POST")
	router.HandleFunc("/v1/meeting/{meetingID}", a.LiveKitDeleteRoom).Methods("DELETE")

	router.PathPrefix("/").HandlerFunc(a.RouteNotFound)

	router.Use(a.corsMiddleware)

	return router
}

func (a *api) RouteNotFound(w http.ResponseWriter, r *http.Request) {
	a.errorResponse(w, http.StatusNotFound, fmt.Errorf("route not found"))
}

// Set error to the custom header and write the error to the request
// After calling, the request will end and no other write should be done
func (a *api) errorResponse(w http.ResponseWriter, status int, err error) {
	w.Header().Add("X-LetsLearn-Error", err.Error())
	type errorRes struct {
		message string
	}
	response := &errorRes{message: err.Error()}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("X-Content-Type-Options", "nosniff")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(response)
}

func (a *api) corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5000")
		w.Header().Set("Access-Control-Allow-Methods", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
