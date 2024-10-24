package handler

import (
	"encoding/json"
	"net/http"
)

type ErrorHandler struct{}

// Set error to the custom header and write the error to the request
// After calling, the request will end and no other write should be done
func (h ErrorHandler) WriteErrorResponse(w http.ResponseWriter, status int, err error) {
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

// Set the error message to the custom "X-LetsLive-Error" header
// The function doesn't end the request, if so call errorResponse
func (h *ErrorHandler) SetError(w http.ResponseWriter, err error) {
	w.Header().Add("X-LetsLive-Error", err.Error())
}
