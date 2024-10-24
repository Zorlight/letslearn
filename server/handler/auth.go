package handler

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/smtp"
	"os"
	"time"

	"github.com/sen1or/lets-learn/config"
	"github.com/sen1or/lets-learn/controller"
	"github.com/sen1or/lets-learn/domain"
	"gorm.io/gorm"

	"github.com/go-playground/validator/v10"
	"github.com/gofrs/uuid/v5"
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/facebook"
	"golang.org/x/oauth2/google"
)

type userLogInForm struct {
	Email    string `validate:"required,email"`
	Password string `validate:"required,gte=8,lte=72"`
}

type signUpForm struct {
	Username  string `validate:"required,gte=6,lte=50"`
	Email     string `validate:"required,email"`
	Password  string `validate:"required,gte=8,lte=72"`
	IsTeacher bool   `validate:"required"`
}

type AuthHandler struct {
	ErrorHandler
	jwtTokenCtrl    *controller.JWTTokenController
	verifyTokenCtrl *controller.VerifyTokenController
	userCtrl        *controller.UserController
}

func NewAuthHandler(jwtTokenCtrl *controller.JWTTokenController, userCtrl *controller.UserController, verifyTokenCtrl *controller.VerifyTokenController) *AuthHandler {
	return &AuthHandler{
		jwtTokenCtrl:    jwtTokenCtrl,
		userCtrl:        userCtrl,
		verifyTokenCtrl: verifyTokenCtrl,
	}
}

func (h *AuthHandler) LogInHandler(w http.ResponseWriter, r *http.Request) {
	var userCredentials userLogInForm
	if err := json.NewDecoder(r.Body).Decode(&userCredentials); err != nil {
		h.WriteErrorResponse(w, http.StatusBadRequest, err)
		return
	}

	validate := validator.New(validator.WithRequiredStructEnabled())
	err := validate.Struct(&userCredentials)
	if err != nil {
		h.WriteErrorResponse(w, http.StatusBadRequest, err)
		return
	}

	user, err := h.userCtrl.GetByEmail(userCredentials.Email)
	if err != nil {
		h.WriteErrorResponse(w, http.StatusBadRequest, err)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(userCredentials.Password)); err != nil {
		h.WriteErrorResponse(w, http.StatusUnauthorized, errors.New("username or password is not correct!"))
		return
	}

	// TODO: sync the expires date of refresh token in database with client
	refreshToken, accessToken, err := h.jwtTokenCtrl.GenerateTokenPair(user.ID)
	if err != nil {
		h.WriteErrorResponse(w, http.StatusInternalServerError, err)
		return
	}

	h.setTokens(w, refreshToken, accessToken)

	w.WriteHeader(http.StatusOK)
}

func (h *AuthHandler) SignUpHandler(w http.ResponseWriter, r *http.Request) {
	var userForm signUpForm
	json.NewDecoder(r.Body).Decode(&userForm)

	log.Printf("user: %v", userForm)

	validate := validator.New(validator.WithRequiredStructEnabled())
	err := validate.Struct(&userForm)
	if err != nil {
		h.WriteErrorResponse(w, http.StatusBadRequest, err)
		return
	}

	uuid, err := uuid.NewGen().NewV4()
	if err != nil {
		h.WriteErrorResponse(w, http.StatusInternalServerError, err)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(userForm.Password), bcrypt.DefaultCost)

	if err != nil {
		h.WriteErrorResponse(w, http.StatusInternalServerError, err)
		return
	}

	user := &domain.User{
		ID:           uuid,
		Username:     userForm.Username,
		Email:        userForm.Email,
		PasswordHash: string(hashedPassword),
		IsTeacher:    userForm.IsTeacher,
	}

	if err := h.userCtrl.Create(user); err != nil {
		h.WriteErrorResponse(w, http.StatusInternalServerError, err)
		return
	}

	go h.sendConfirmEmail(user.ID, user.Email)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(*user)
}

func (h *AuthHandler) VerifyEmailHandler(w http.ResponseWriter, r *http.Request) {
	var tokenValue = r.URL.Query().Get("token")

	token, err := h.verifyTokenCtrl.GetByTokenValue(tokenValue)
	if err != nil {
		h.WriteErrorResponse(w, http.StatusBadRequest, err)
		return
	}

	user, err := h.userCtrl.GetByID(token.UserID)
	if err != nil {
		h.WriteErrorResponse(w, http.StatusInternalServerError, err)
		return
	} else if user.IsVerified {
		w.Write([]byte("Your email has already been verified!"))
		w.WriteHeader(http.StatusOK)
		return
	}

	if token.ExpiresAt.Before(time.Now()) {
		h.WriteErrorResponse(w, http.StatusBadRequest, fmt.Errorf("verify token expired: %s", token.ExpiresAt.Local().String()))
		return
	}

	updateVerifiedUser := &domain.User{
		ID:         user.ID,
		IsVerified: true,
	}

	if err := h.userCtrl.Save(updateVerifiedUser); err != nil {
		h.WriteErrorResponse(w, http.StatusInternalServerError, err)
		return
	}

	h.verifyTokenCtrl.DeleteByID(token.ID)
	w.Write([]byte("Email verification complete!"))
	w.WriteHeader(http.StatusOK)
}

func (h *AuthHandler) sendConfirmEmail(userId uuid.UUID, userEmail string) {
	verifyTokenValue, err := h.verifyTokenCtrl.Create(userId)
	if err != nil {
		log.Printf("error while trying to create verify token: %s", err.Error())
		return
	}

	smtpServer := "smtp.gmail.com:587"
	smtpUser := "letsliveglobal@gmail.com"
	smtpPassword := os.Getenv("GMAIL_APP_PASSWORD")

	from := "letsliveglobal@gmail.com"
	to := []string{userEmail}
	subject := "Lets Live Email Confirmation"
	body := `<!DOCTYPE html>
<html>
<head>
    <title>` + subject + `</title>
</head>
<body>
    <p>This is a test email with a clickable link.</p>
	<p>Click <a href="https://localhost:8000/v1/auth/verify?token=` + verifyTokenValue + `">here</a> to confirm your email.</p>
</body>
</html>`

	msg := "From: " + from + "\n" +
		"To: " + userEmail + "\n" +
		"Subject: " + subject + "\n" +
		"Content-Type: text/html; charset=\"UTF-8\"\n\n" +
		body

	auth := smtp.PlainAuth("", smtpUser, smtpPassword, "smtp.gmail.com")

	err = smtp.SendMail(smtpServer, auth, from, to, []byte(msg))
	if err != nil {
		log.Printf("failed trying to send confirmation email: %s", err.Error())
	}
}

func (h *AuthHandler) setTokens(w http.ResponseWriter, refreshToken string, accessToken string) {
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

// FACEBOOK AUTH
type facebookOAuthUser struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

var facebookOauthConfig = &oauth2.Config{
	RedirectURL:  "https://localhost:8000/v1/auth/facebook/callback",
	ClientID:     os.Getenv("FACEBOOK_OAUTH_CLIENT_ID"),
	ClientSecret: os.Getenv("FACEBOOK_OAUTH_CLIENT_SECRET"),
	Scopes:       []string{"email"},
	Endpoint:     facebook.Endpoint,
}

func (h *AuthHandler) OAuthFacebookLogin(w http.ResponseWriter, r *http.Request) {
	b := make([]byte, 16)
	_, err := rand.Read(b)

	if err != nil {
		h.WriteErrorResponse(w, http.StatusInternalServerError, err)
		return
	}

	state := base64.URLEncoding.EncodeToString(b)

	url := facebookOauthConfig.AuthCodeURL(state)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

func (h *AuthHandler) OAuthFacebookCallBack(w http.ResponseWriter, r *http.Request) {
	code := r.URL.Query().Get("code")
	clientAddr := os.Getenv("CLIENT_URL")
	urlDirectOnFail := clientAddr + "/auth/login"

	facebookUser, err := getUserDataFromFacebook(code)
	if err != nil {
		h.SetError(w, fmt.Errorf("failed to get user data"))
		http.Redirect(w, r, urlDirectOnFail, http.StatusTemporaryRedirect)
		return
	}

	usernameId, _ := uuid.NewGen().NewV4()
	newOAuthUserRecord := &domain.User{
		ID:         usernameId,
		Username:   facebookUser.Name,
		IsVerified: true,
	}

	// The final UserId that will be used to generate token pair
	var finalUserId uuid.UUID

	// Check if the user had already singed up before
	existedRecord, err := h.userCtrl.GetByFacebookID(facebookUser.ID)
	if err != nil && errors.Is(err, gorm.ErrRecordNotFound) {
		err = h.userCtrl.Create(newOAuthUserRecord)

		if err != nil {
			h.SetError(w, fmt.Errorf("error while saving user"))
			http.Redirect(w, r, urlDirectOnFail, http.StatusTemporaryRedirect)
			return
		}

		finalUserId = newOAuthUserRecord.ID
	} else {
		finalUserId = existedRecord.ID
		h.jwtTokenCtrl.RevokeAll(finalUserId)
	}

	refreshToken, accessToken, err := h.jwtTokenCtrl.GenerateTokenPair(finalUserId)

	if err != nil {
		h.SetError(w, err)
		http.Redirect(w, r, urlDirectOnFail, http.StatusTemporaryRedirect)
		return
	}

	h.setTokens(w, refreshToken, accessToken)
	http.Redirect(w, r, clientAddr, http.StatusTemporaryRedirect)
}
func getUserDataFromFacebook(code string) (*facebookOAuthUser, error) {
	token, err := facebookOauthConfig.Exchange(context.Background(), code)
	if err != nil {
		return nil, fmt.Errorf("code exchange not valid: %s", err.Error())
	}

	client := facebookOauthConfig.Client(context.Background(), token)

	reponse, err := client.Get("https://graph.facebook.com/me?fields=id,name,email")
	if err != nil {
		return nil, fmt.Errorf("failed getting user info: %s", err.Error())
	}

	defer reponse.Body.Close()
	userData, err := io.ReadAll(reponse.Body)
	if err != nil {
		return nil, fmt.Errorf("failed reading user info: %s", err.Error())
	}

	var returnedOAuthUser facebookOAuthUser
	if err := json.Unmarshal(userData, &returnedOAuthUser); err != nil {
		return nil, fmt.Errorf("user data format not valid: %s", err.Error())
	}

	return &returnedOAuthUser, nil
}

// GOOGLE AUTH
type googleOAuthUser struct {
	Email         string `json:"email"`
	VerifiedEmail bool   `json:"verified_email"`
}

const oauthGoogleUrlAPI = "https://www.googleapis.com/oauth2/v2/userinfo?access_token="

var googleOauthConfig = &oauth2.Config{
	RedirectURL:  "https://localhost:8000/v1/auth/google/callback",
	ClientID:     os.Getenv("GOOGLE_OAUTH_CLIENT_ID"),
	ClientSecret: os.Getenv("GOOGLE_OAUTH_CLIENT_SECRET"),
	Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
	Endpoint:     google.Endpoint,
}

func (h *AuthHandler) OAuthGoogleLogin(w http.ResponseWriter, r *http.Request) {
	oauthState, err := generateOAuthCookieState(w)
	if err != nil {
		h.WriteErrorResponse(w, http.StatusInternalServerError, err)
		return
	}

	u := googleOauthConfig.AuthCodeURL(oauthState)
	http.Redirect(w, r, u, http.StatusTemporaryRedirect)
}

func generateOAuthCookieState(w http.ResponseWriter) (string, error) {
	var expiration = time.Now().Add(1 * time.Hour)

	b := make([]byte, 16)
	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}

	state := base64.URLEncoding.EncodeToString(b)
	cookie := &http.Cookie{Name: "oauthstate", Value: state, Expires: expiration}
	http.SetCookie(w, cookie)

	return state, nil
}

func (h *AuthHandler) OAuthGoogleCallBack(w http.ResponseWriter, r *http.Request) {
	oauthState, _ := r.Cookie("oauthstate")
	clientAddr := os.Getenv("CLIENT_URL")
	urlDirectOnFail := clientAddr + "/auth/login"

	if r.FormValue("state") != oauthState.Value {
		h.SetError(w, fmt.Errorf("invalid state, csrf attack?"))
		http.Redirect(w, r, urlDirectOnFail, http.StatusTemporaryRedirect)
		return
	}

	data, err := getUserDataFromGoogle(r.FormValue("code"))
	if err != nil {
		h.SetError(w, fmt.Errorf("can't get user data"))
		http.Redirect(w, r, urlDirectOnFail, http.StatusTemporaryRedirect)
		return
	}

	var returnedOAuthUser googleOAuthUser
	if err := json.Unmarshal(data, &returnedOAuthUser); err != nil {
		h.SetError(w, fmt.Errorf("user data format not valid"))
		http.Redirect(w, r, urlDirectOnFail, http.StatusTemporaryRedirect)
		return
	}

	// TODO: MORE PROPER WAY TO HANDLE USERNAME
	userId, _ := uuid.NewGen().NewV4()
	usernameId, _ := uuid.NewGen().NewV4()
	username := "ll-" + usernameId.String()[:5]

	newOAuthUserRecord := &domain.User{
		ID:         userId,
		Username:   username,
		Email:      returnedOAuthUser.Email,
		IsVerified: returnedOAuthUser.VerifiedEmail,
	}

	// The final UserId that will be used to generate token pair
	var finalUserId uuid.UUID

	// Check if the user had already singed up before
	existedRecord, err := h.userCtrl.GetByEmail(returnedOAuthUser.Email)
	if err != nil && errors.Is(err, gorm.ErrRecordNotFound) {
		err = h.userCtrl.Create(newOAuthUserRecord)

		if err != nil {
			h.SetError(w, fmt.Errorf("error while saving user"))
			http.Redirect(w, r, urlDirectOnFail, http.StatusTemporaryRedirect)
			return
		}

		finalUserId = newOAuthUserRecord.ID
	} else {
		finalUserId = existedRecord.ID
		h.jwtTokenCtrl.RevokeAll(finalUserId)
	}

	refreshToken, accessToken, err := h.jwtTokenCtrl.GenerateTokenPair(finalUserId)

	if err != nil {
		h.SetError(w, err)
		http.Redirect(w, r, urlDirectOnFail, http.StatusTemporaryRedirect)
		return
	}

	h.setTokens(w, refreshToken, accessToken)
	http.Redirect(w, r, clientAddr, http.StatusTemporaryRedirect)
}

func getUserDataFromGoogle(code string) ([]byte, error) {
	token, err := googleOauthConfig.Exchange(context.Background(), code)
	if err != nil {
		return nil, fmt.Errorf("code exchange not valid: %s", err.Error())
	}

	reponse, err := http.Get(oauthGoogleUrlAPI + token.AccessToken)
	if err != nil {
		return nil, fmt.Errorf("failed getting user info: %s", err.Error())
	}

	defer reponse.Body.Close()
	userData, err := io.ReadAll(reponse.Body)
	if err != nil {
		return nil, fmt.Errorf("failed reading user info: %s", err.Error())
	}

	return userData, nil
}
