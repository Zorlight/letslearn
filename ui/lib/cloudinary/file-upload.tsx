import { getMultipleFileInput } from "@/app/(dashboard)/(route)/teacher/courses/[courseId]/_lib/utils";
import useProgress from "@/hooks/useProgress";
import { Button } from "@/lib/shadcn/button";
import { cn } from "@/lib/utils";
import { AttachedFile } from "@/models/course";
import { ClassValue } from "clsx";
import { Paperclip } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { UploadFiles } from "./cloudinary-handler";
import defaultConfig, { FileUploadConfig } from "./file-upload-config";
import FileUploadProgress from "./file-upload-progress";
import { CloudUploadIcon } from "./icons";

interface Props {
  onUploaded?: (files: AttachedFile[]) => void;
  className?: ClassValue;
  config?: FileUploadConfig;
  description?: string;
}

const FileUpload = ({
  onUploaded,
  className,
  config = defaultConfig,
  description,
}: Props) => {
  const { progress, start, finish, isloading, error } = useProgress();
  const [files, setFiles] = useState<AttachedFile[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<AttachedFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = () => {
    const newFiles = getMultipleFileInput(inputRef);

    if (newFiles) {
      const allowedFiles = newFiles.filter((file) =>
        config.allowedTypes.includes(file.type)
      );
      const newAttachedFiles = allowedFiles.map((file) => ({
        data: file,
        cloudUrl: "",
      }));
      setFiles((prev) => [...prev, ...newAttachedFiles]);
    }
  };

  const handleUpload = async () => {
    //create form data
    start(files.length);
    const formData = new FormData();
    files.map((file) => formData.append("file", file.data));
    //upload images
    const res = await UploadFiles(formData);

    //handle response
    if (res.errors) {
      await error().then(() => toast.error(res.errors[0]));
    } else {
      await finish().then(() => {
        toast.success(res.message);

        //update cloudUrl
        const uploadedFiles = [...files];
        uploadedFiles.map((file, index) => {
          file.cloudUrl = res.data[index].url;
        });

        setUploadedFiles(uploadedFiles);
      });
    }
  };

  useEffect(() => {
    if (!isloading && uploadedFiles.length > 0 && onUploaded) {
      setTimeout(() => {
        onUploaded(uploadedFiles);
      }, 1000);
    }
  }, [isloading, uploadedFiles]);

  return (
    <div
      className={cn(
        "w-full h-fit rounded-md overflow-hidden border flex flex-col items-center justify-center gap-4",
        className
      )}
    >
      {files.length > 0 ? (
        <div className="w-full bg-white flex flex-col items-center justify-center gap-4 p-4">
          <FileUploadProgress
            progress={progress}
            files={files.map((file) => file.data)}
            className="w-full"
          />
          <Button variant="default" size="sm" onClick={handleUpload}>
            {`Upload ${files.length} ${files.length > 1 ? "files" : "file"}`}
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
};

export default FileUpload;
