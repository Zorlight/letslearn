"use client";
import { Progress } from "@/lib/shadcn/progress";
import { ClassValue } from "clsx";
import { cn, getFileSize } from "../utils";
import { UploadIcon } from "./icons";

interface Props {
  progress?: number;
  files: File[];
  className?: ClassValue;
}
const FileUploadProgress = ({ progress, files, className }: Props) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="mb-2 flex flex-col item-center gap-2">
        {files.map((file, index) => (
          <div key={index} className="flex items-center gap-x-3">
            <span className="size-8 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg">
              <UploadIcon />
            </span>
            <div>
              <p className="text-sm font-medium text-gray-800">{file.name}</p>
              <p className="text-xs text-gray-500">{getFileSize(file.size)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* <!-- Progress Bar --> */}
      {progress ? (
        <div className="flex flex-row items-center gap-2">
          <Progress value={progress} className="w-full" />
          <span
            className={cn(
              "text-sm text-slate-600",
              progress < 0 && "text-red-500",
              progress >= 100 && "text-green-500"
            )}
          >
            {progress < 0 ? "Error" : `${Math.floor(progress)}%`}
          </span>
        </div>
      ) : (
        <div className="h-5" />
      )}
      {/* <!-- End Progress Bar --> */}
    </div>
  );
};

export default FileUploadProgress;
