export interface FileUploadConfig {
  multiple: boolean;
  allowedTypes: string[];
}

const defaultConfig: FileUploadConfig = {
  multiple: true,
  allowedTypes: [
    "text/plain",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml",
    "image/webp",
    "video/mp4",
    "video/x-msvideo",
    "video/mpeg",
    "video/quicktime",
    "application/pdf",
    "audio/mpeg",
    "audio/wav",
    "audio/ogg",
    "audio/mp4",
    "audio/webm",
  ],
};

export default defaultConfig;
