package api

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	"github.com/sen1or/lets-learn/config"
	"github.com/sen1or/lets-learn/controller"
	"github.com/sen1or/lets-learn/handler"
	"github.com/sen1or/lets-learn/repository"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

type api struct {
	handler.ErrorHandler
	db *gorm.DB // For raw sql queries

	userHandler         *handler.UserHandler
	authHandler         *handler.AuthHandler
	courseHandler       *handler.CourseHandler
	questionHandler     *handler.QuestionHandler
	questionBankHandler *handler.QuestionBankHandler
	loggingHandler      *handler.LoggingHandler
	livkitHandler       *handler.LivekitHandler
}

func NewApi(dbConn gorm.DB) *api {
	var userRepo = repository.NewUserRepository(dbConn)
	var userCtrl = controller.NewUserController(userRepo)
	var userHandler = handler.NewUserHandler(*userCtrl)

	var jwtTokenRepository = repository.NewJWTTokenRepository(dbConn)
	var jwtTokenController = controller.NewJWTTokenController(jwtTokenRepository)
	var verifyTokenRepo = repository.NewVerifyTokenRepo(dbConn)
	var verifyTokenCtrl = controller.NewVerifyTokenController(verifyTokenRepo)
	var authHandler = handler.NewAuthHandler(jwtTokenController, userCtrl, verifyTokenCtrl)

	var courseRepo = repository.NewCourseRepository(dbConn)
	var courseCtrl = controller.NewCourseController(courseRepo)
	var courseHandler = handler.NewCourseHandler(courseCtrl)

	var questionBankRepo = repository.NewQuestionBankRepository(dbConn)
	var questionBankCtrl = controller.NewQuestionBankController(questionBankRepo)
	var questionBankHandler = handler.NewQuestionBankHandler(questionBankCtrl)

	var questionRepo = repository.NewQuestionRepository(dbConn)
	var questionCtrl = controller.NewQuestionController(questionRepo)
	var questionHandler = handler.NewQuestionHandler(questionCtrl)

	var livekitHandler = handler.NewLivekitHandler()

	var logger, _ = zap.NewProduction()

	return &api{
		db: &dbConn,

		userHandler:         userHandler,
		authHandler:         authHandler,
		courseHandler:       courseHandler,
		loggingHandler:      handler.NewLoggingHandler(logger),
		questionBankHandler: questionBankHandler,
		questionHandler:     questionHandler,
		livkitHandler:       livekitHandler,
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

func (a *api) ListenAndServe() {
	server := &http.Server{
		Addr:         ":8000",
		Handler:      a.Routes(),
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	log.Println("server url is http://localhost:8000")
	log.Panic("server ends: ", server.ListenAndServe())
}

func (a *api) Routes() *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/v1/users/{id}", a.userHandler.GetUserByIdHandler).Methods("GET")

	router.HandleFunc("/v1/auth/signup", a.authHandler.SignUpHandler).Methods("POST")
	router.HandleFunc("/v1/auth/login", a.authHandler.LogInHandler).Methods("POST")
	router.HandleFunc("/v1/auth/google", a.authHandler.OAuthGoogleLogin).Methods("GET")
	router.HandleFunc("/v1/auth/google/callback", a.authHandler.OAuthGoogleCallBack).Methods("GET")
	router.HandleFunc("/v1/auth/facebook", a.authHandler.OAuthFacebookLogin).Methods("GET")
	router.HandleFunc("/v1/auth/facebook/callback", a.authHandler.OAuthFacebookCallBack).Methods("GET")
	router.HandleFunc("/v1/auth/verify", a.authHandler.VerifyEmailHandler).Methods("GET")

	router.HandleFunc("/v1/meeting/{meetingID}", a.livkitHandler.LiveKitGetJoinConnectionDetails).Methods("GET")
	router.HandleFunc("/v1/meeting/{meetingID}", a.livkitHandler.LiveKitCreateSession).Methods("POST")
	router.HandleFunc("/v1/meeting/{meetingID}", a.livkitHandler.LiveKitDeleteRoom).Methods("DELETE")

	//router.HandleFunc("/v1/stripe/payment", a.CreateStripePaymentIntentHandler).Methods(http.MethodPost)
	//router.HandleFunc("/v1/stripe/webhook", a.StripeWebhookHandler).Methods(http.MethodPost)

	router.HandleFunc("/v1/course", a.courseHandler.CreateCourse).Methods(http.MethodPost)

	router.HandleFunc("/v1/question-bank", a.questionBankHandler.Create).Methods(http.MethodPost)
	router.HandleFunc("/v1/question-bank/{questionBankID}", a.questionHandler.Create).Methods(http.MethodPost)

	router.PathPrefix("/").HandlerFunc(a.RouteNotFound)

	router.Use(a.loggingHandler.LoggingMiddleware)
	router.Use(a.corsMiddleware)

	return router
}

func (a *api) RouteNotFound(w http.ResponseWriter, r *http.Request) {
	a.WriteErrorResponse(w, http.StatusNotFound, fmt.Errorf("route not found"))
}

// Set the error message to the custom "X-LetsLive-Error" header
// The function doesn't end the request, if so call errorResponse
func (a *api) setError(w http.ResponseWriter, err error) {
	w.Header().Add("X-LetsLive-Error", err.Error())
}

func (a *api) corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
