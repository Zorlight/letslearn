package handler

import (
	"net"
	"net/http"
	"time"

	"go.uber.org/zap"
)

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

type LoggingHandler struct {
	logger *zap.Logger
}

func NewLoggingHandler(logger *zap.Logger) *LoggingHandler {
	return &LoggingHandler{
		logger: logger,
	}
}

func (h *LoggingHandler) LoggingMiddleware(next http.Handler) http.Handler {
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

		if lrw.statusCode/100 == 2 {
			h.logger.Info("Success: ", fields...)
		} else {
			err := lrw.w.Header().Get("X-LetsLearn-Error")
			if len(err) == 0 {
				h.logger.Info("Failed: ", fields...)
			} else {
				h.logger.Error(err, fields...)
			}
		}

		// TODO: prometheus
	})
}
