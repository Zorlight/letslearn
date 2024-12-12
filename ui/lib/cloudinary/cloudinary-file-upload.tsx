import useProgress from "@/hooks/useProgress";
import { Button } from "@/lib/shadcn/button";
import { cn, getMultipleFileInput } from "@/lib/utils";
import { CloudinaryFile } from "@/models/cloudinary-file";
import { ClassValue } from "clsx";
import { Paperclip } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { UploadFiles } from "./cloudinary-handler";
import defaultConfig, { FileUploadConfig } from "./file-upload-config";
import FileUploadProgress from "./file-upload-progress";
import { CloudUploadIcon } from "./icons";
import { convertCloudinaryUrlToDownloadUrl } from "./utils";
import { nanoid } from "@reduxjs/toolkit";

interface Props {
  onUploaded?: (files: CloudinaryFile[]) => void;
  className?: ClassValue;
  config?: FileUploadConfig;
  description?: string;
}

export default function FileUpload({
  onUploaded,
  className,
  config = defaultConfig,
  description,
}: Props) {
  const { progress, start, finish, isloading, error } = useProgress();
  const [backendFilesToStore, setBackendFilesToStore] = useState<
    CloudinaryFile[]
  >([]);
  const [cloudinaryFilesToUpload, setCloudinaryFilesToUpload] = useState<
    File[]
  >([]);
  const [cloudinaryUploadedFiles, setCloudinaryUploadedFiles] = useState<
    CloudinaryFile[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = () => {
    const newFiles = getMultipleFileInput(inputRef);
    if (!newFiles || newFiles.length == 0) return;

    const allowedFiles = newFiles.filter((file) =>
      config.allowedTypes.includes(file.type)
    );
    // set files to upload to cloudinary (type: File)
    setCloudinaryFilesToUpload(allowedFiles);

    const newAttachedFiles: CloudinaryFile[] = allowedFiles.map((file) => ({
      id: nanoid(4),
      name: file.name,
      displayUrl: "",
      downloadUrl: "",
    }));
    // set files to upload to store in backend (type: CloudinaryFile)
    setBackendFilesToStore((prev) => [...prev, ...newAttachedFiles]);
  };

  const handleUploadSuccess = (res: any) => {
    toast.success(res.message);

    //update url in backendFilesToStore
    const uploadedFiles = [...backendFilesToStore];
    uploadedFiles.map((file, index) => {
      file.displayUrl = res.data[index].url;
      file.downloadUrl = convertCloudinaryUrlToDownloadUrl(res.data[index].url);
    });

    setCloudinaryUploadedFiles(uploadedFiles);
  };

  const handleUploadFail = (err: any) => {
    toast.error(err);
  };

  const handleUpload = async () => {
    //create form data
    start(cloudinaryFilesToUpload.length);
    const formData = new FormData();
    cloudinaryFilesToUpload.map((file) => formData.append("file", file));
    //upload images
    const res = await UploadFiles(formData);

    //handle response
    if (res.errors) await error().then(() => handleUploadFail(res.errors[0]));
    else await finish().then(() => handleUploadSuccess(res));
  };

  useEffect(() => {
    if (!isloading && cloudinaryUploadedFiles.length > 0 && onUploaded) {
      setTimeout(() => {
        onUploaded(cloudinaryUploadedFiles);
      }, 1000);
    }
  }, [isloading, cloudinaryUploadedFiles]);

  return (
    <div
      className={cn(
        "w-full h-fit rounded-md overflow-hidden border flex flex-col items-center justify-center gap-4",
        className
      )}
    >
      {cloudinaryFilesToUpload.length > 0 ? (
        <div className="w-full bg-white flex flex-col items-center justify-center gap-4 p-4">
          <FileUploadProgress
            progress={progress}
            files={cloudinaryFilesToUpload.map((file) => file)}
            className="w-full"
          />
          <Button variant="default" size="sm" onClick={handleUpload}>
            {`Upload ${cloudinaryFilesToUpload.length} ${
              cloudinaryFilesToUpload.length > 1 ? "files" : "file"
            }`}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 py-4">
          <input
            ref={inputRef}
            type="file"
            multiple={config.multiple}
            className="hidden"
            onChange={handleFileChange}
          />
          <CloudUploadIcon size={40} />
          <div className="flex flex-col items-center">
            <p
              className="text-indigo-700 hover:text-indigo-600 cursor-pointer font-bold"
              onClick={() => inputRef.current?.click()}
            >
              Choose files or drag and drop
            </p>

            <p className="text-slate-500 text-sm">
              {description || "Texts, images, videos, audios and pdfs"}
            </p>
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={() => inputRef.current?.click()}
            className="space-x-1"
          >
            <Paperclip size={14} />
            <span>Attach</span>
          </Button>
        </div>
      )}
    </div>
  );
}
