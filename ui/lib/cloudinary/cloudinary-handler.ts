"use server";
import crypto from "crypto";
import { getPublicIdFromCloudinaryUrl } from "../utils";

const videoType = [
  "video/mp4",
  "video/quicktime",
  "video/x-ms-wmv",
  "video/x-msvideo",
  "video/x-flv",
  "video/webm",
  "video/3gpp",
  "video/3gpp2",
  "video/ogg",
  "video/x-matroska",
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "audio/mp4",
  "audio/webm",
];

export async function UploadFile(formData: FormData) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.UPLOAD_PRESET_NAME;
  if (!cloudName || !uploadPreset) {
    return {
      error: "Cloud name or upload preset is not found",
    };
  }
  const file = formData.get("file") as File;
  const resourceType = videoType.includes(file.type) ? "video" : "image";
  if (file === null) {
    return {
      error: "File not found",
    };
  }

  const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`;
  formData.append("upload_preset", `${process.env.UPLOAD_PRESET_NAME}`);
  const res = await fetch(uploadUrl, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    return {
      error: `Failed to upload file: ${file.name}`,
    };
  }

  return {
    message: "Uploaded successfully!",
    data: await res.json(),
  };
}

const generateSHA1 = (data: any) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
};

const generateSignature = (publicId: string, apiSecret: string) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

export async function DeleteFile(imageUrl: string) {
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!apiKey || !apiSecret) {
    return {
      error: "API key or API secret is not found",
    };
  }
  const publicId = getPublicIdFromCloudinaryUrl(imageUrl);
  const timestamp = new Date().getTime().toString();
  const signature = generateSHA1(generateSignature(publicId, apiSecret));

  const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`;

  const formData = new FormData();
  formData.append("api_key", apiKey);
  formData.append("public_id", publicId);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);

  const res = await fetch(uploadUrl, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    return {
      error: "Failed to delete file",
    };
  }

  return {
    message: "Deleted successfully!",
  };
}

export async function DeleteFiles(listImageUrls: string[]) {
  const failedMessages: string[] = [];
  listImageUrls.map(async (url) => {
    const res = await DeleteFile(getPublicIdFromCloudinaryUrl(url));
    if (res.error) {
      failedMessages.push(res.error);
    }
  });

  if (failedMessages.length > 0) {
    return {
      errors: failedMessages,
    };
  }

  return {
    message: "Deleted successfully!",
  };
}

export async function UploadFiles(formData: FormData) {
  const failedMessages: string[] = [];
  const data: any[] = [];

  const files = formData.getAll("file") as File[];
  await Promise.all(
    files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      const itemRes = await UploadFile(formData);
      if (itemRes.error) failedMessages.push(itemRes.error);
      if (itemRes.data) data.push(itemRes.data);
    })
  );

  if (failedMessages.length > 0) {
    return {
      errors: failedMessages,
    };
  }

  return {
    message: "Uploaded successfully!",
    data,
  };
}
