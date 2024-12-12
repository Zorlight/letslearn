import FileUpload from "@/lib/cloudinary/cloudinary-file-upload";
import { CloudinaryFile } from "@/models/cloudinary-file";
import React from "react";

interface Props {
  onUploaded?: (files: CloudinaryFile[]) => void;
}
export default function FileSubmissionView({ onUploaded }: Props) {
  return (
    <div className="flex flex-row items-start gap-2">
      <label className="w-[180px] font-semibold text-gray-700">
        File submisisons
      </label>
      <div className="relative w-full flex flex-col">
        <FileUpload onUploaded={onUploaded} />
      </div>
    </div>
  );
}
