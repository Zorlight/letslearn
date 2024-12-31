import {
  DeleteFile,
  DeleteFiles,
  UploadFile,
} from "@/lib/cloudinary/cloudinary-handler";
import { makeRequest } from "@/lib/http-handle/http-handle";

export const uploadFile = async (
  file: File,
  onSuccess: (data: any) => void,
  onFail: (err?: string) => void
) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await UploadFile(formData);
    if (res.error) onFail(res.error);
    else onSuccess(res.data);
  } catch (err: any) {
    onFail(err);
  }
};

export const deleteFile = async (
  url: string,
  onSuccess: (message: string) => void,
  onFail: (err?: string) => void
) => {
  try {
    const res = await DeleteFile(url);
    if (res.error) onFail(res.error);
    if (res.message) onSuccess(res.message);
  } catch (err: any) {
    onFail(err);
  }
};

export const deleteFiles = async (
  listImageUrls: string[],
  onSuccess: (message: string) => void,
  onFail: (err?: string) => void
) => {
  try {
    const res = await DeleteFiles(listImageUrls);
    if (res.errors) onFail(res.errors[0]);
    if (res.message) onSuccess(res.message);
  } catch (err: any) {
    onFail(err);
  }
};

export const getFile = async (
  url: string,
  onSuccess: (data: File) => void,
  onFail: (err?: string) => void,
  fileNameToSet?: string
) => {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    console.log("blob", blob);
    const file = new File([blob], fileNameToSet || "file");
    onSuccess(file);
  } catch (err: any) {
    onFail(err.message);
  }
};
