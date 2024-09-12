package api

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/sen1or/lets-learn/domain"

	"github.com/gofrs/uuid/v5"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/facebook"
	"gorm.io/gorm"
)

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

func (a *api) OAuthFacebookLogin(w http.ResponseWriter, r *http.Request) {
	b := make([]byte, 16)
	_, err := rand.Read(b)

	if err != nil {
		a.errorResponse(w, http.StatusInternalServerError, err)
		return
	}

	state := base64.URLEncoding.EncodeToString(b)

	url := facebookOauthConfig.AuthCodeURL(state)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

func (a *api) OAuthFacebookCallBack(w http.ResponseWriter, r *http.Request) {
	code := r.URL.Query().Get("code")
	clientAddr := os.Getenv("CLIENT_URL")
	urlDirectOnFail := clientAddr + "/auth/login"

	facebookUser, err := getUserDataFromFacebook(code)
	if err != nil {
		a.setError(w, fmt.Errorf("failed to get user data"))
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
	existedRecord, err := a.userRepo.GetByFacebookID(facebookUser.ID)
	if err != nil && errors.Is(err, gorm.ErrRecordNotFound) {
		err = a.userRepo.Create(*newOAuthUserRecord)

		if err != nil {
			a.setError(w, fmt.Errorf("error while saving user"))
			http.Redirect(w, r, urlDirectOnFail, http.StatusTemporaryRedirect)
			return
		}

		finalUserId = newOAuthUserRecord.ID
	} else {
		finalUserId = existedRecord.ID
		a.refreshTokenRepo.RevokeAll(finalUserId)
	}

	refreshToken, accessToken, err := a.refreshTokenRepo.GenerateTokenPair(finalUserId)

	if err != nil {
		a.setError(w, err)
		http.Redirect(w, r, urlDirectOnFail, http.StatusTemporaryRedirect)
		return
	}

	a.setTokens(w, refreshToken, accessToken)
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
