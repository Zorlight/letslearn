package api

import (
	"encoding/json"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"time"

	"github.com/sen1or/lets-learn/config"
	"github.com/sen1or/lets-learn/domain"
	"github.com/sen1or/lets-learn/repository"

	"github.com/gorilla/mux"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

type api struct {
	logger *zap.Logger
	db     *gorm.DB // For raw sql queries

	userRepo         domain.UserRepository
	refreshTokenRepo domain.RefreshTokenRepository
	verifyTokenRepo  domain.VerifyTokenRepository
}

func NewApi(dbConn gorm.DB) *api {
	var userRepo = repository.NewUserRepository(dbConn)
	var refreshTokenRepo = repository.NewRefreshTokenRepository(dbConn)
	var verifyTokenRepo = repository.NewVerifyTokenRepo(dbConn)
	var logger, _ = zap.NewProduction()

	return &api{
		logger: logger,
		db:     &dbConn,

		userRepo:         userRepo,
		refreshTokenRepo: refreshTokenRepo,
		verifyTokenRepo:  verifyTokenRepo,
	}
}

func (a *api) ListenAndServeTLS() {
	server := &http.Server{
		Addr:         ":8000",
		Handler:      a.Routes(),
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	if _, err := os.Stat(config.SERVER_CRT_FILE); err != nil {
		log.Panic("error loading server cert file", err.Error())
	}

	if _, err := os.Stat(config.SERVER_KEY_FILE); err != nil {
		log.Panic("error loading server key file", err.Error())
	}

	log.Println("server url is https://localhost:8000")
	log.Panic("server ends: ", server.ListenAndServeTLS(config.SERVER_CRT_FILE, config.SERVER_KEY_FILE))
}

func (a *api) Routes() *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/v1/users/{id}", a.GetUserByIdHandler).Methods("GET")

	router.HandleFunc("/v1/auth/signup", a.SignUpHandler).Methods("POST")
	router.HandleFunc("/v1/auth/login", a.LogInHandler).Methods("POST")
	router.HandleFunc("/v1/auth/google", a.OAuthGoogleLogin).Methods("GET")
	router.HandleFunc("/v1/auth/google/callback", a.OAuthGoogleCallBack).Methods("GET")
	router.HandleFunc("/v1/auth/verify", a.verifyEmailHandler).Methods("GET")

	router.HandleFunc("/v1/meeting", a.LiveKitCreateRoom).Methods("POST")
	router.HandleFunc("/v1/meeting/{roomName}", a.LiveKitDeleteRoom).Methods("DELETE")
	router.HandleFunc("/v1/meeting/{roomName}", a.LiveKitGetJoinToken).Methods("POST")

	router.PathPrefix("/").HandlerFunc(a.RouteNotFound)

	router.Use(a.loggingMiddleware)
	router.Use(a.corsMiddleware)

	return router
}

func (a *api) RouteNotFound(w http.ResponseWriter, r *http.Request) {
	a.errorResponse(w, http.StatusNotFound, fmt.Errorf("route not found"))
}

// Set the error message to the custom "X-LetsLive-Error" header
// The function doesn't end the request, if so call errorResponse
func (a *api) setError(w http.ResponseWriter, err error) {
	w.Header().Add("X-LetsLive-Error", err.Error())
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

func (a *api) setTokens(w http.ResponseWriter, refreshToken string, accessToken string) {
	http.SetCookie(w, &http.Cookie{
		Name:  "refreshToken",
		Value: refreshToken,

		Expires:  time.Now().Add(config.REFRESH_TOKEN_EXPIRES_DURATION),
		MaxAge:   config.REFRESH_TOKEN_MAX_AGE,
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteDefaultMode,
	})

	http.SetCookie(w, &http.Cookie{
		Name:  "accessToken",
		Value: accessToken,

		Expires:  time.Now().Add(config.ACCESS_TOKEN_EXPIRES_DURATION),
		MaxAge:   config.ACCESS_TOKEN_MAX_AGE,
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteDefaultMode,
	})
}

func (a *api) corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5000")
		w.Header().Set("Access-Control-Allow-Methods", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

type LoggingResponseWriter struct {
	w          http.ResponseWriter
	statusCode int
	bytes      int
}

func (lrw *LoggingResponseWriter) Header() http.Header {
	return lrw.w.Header()
}

func (lrw *LoggingResponseWriter) Write(data []byte) (int, error) {
	wb, err := lrw.w.Write(data)
	lrw.bytes += wb
	return wb, err
}

func (lrw *LoggingResponseWriter) WriteHeader(statusCode int) {
	lrw.w.WriteHeader(statusCode)
	lrw.statusCode = statusCode
}

func (a *api) loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		timeStart := time.Now()
		lrw := &LoggingResponseWriter{w: w}
		next.ServeHTTP(lrw, r)

		duration := time.Since(timeStart).Milliseconds()
		remoteAddr := r.Header.Get("X-Forwarded-For")
		if remoteAddr == "" {
			if ip, _, err := net.SplitHostPort(r.RemoteAddr); err != nil {
				remoteAddr = "unknown address"
			} else {
				remoteAddr = ip
			}
		}

		fields := []zap.Field{
			zap.Int64("duration", duration),
			zap.String("method", r.Method),
			zap.String("remote#addr", remoteAddr),
			zap.Int("response#bytes", lrw.bytes),
			zap.Int("response#status", lrw.statusCode),
			zap.String("uri", r.RequestURI),
		}

		if lrw.statusCode == 200 {
			a.logger.Info("Server: ", fields...)
		} else {
			err := lrw.w.Header().Get("X-LetsLearn-Error")
			if len(err) == 0 {
				a.logger.Info("Server: ", fields...)
			} else {
				a.logger.Error(err, fields...)

			}
		}

		// TODO: prometheus
	})
}
