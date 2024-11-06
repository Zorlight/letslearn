import { cn, getFileTypeColor, isDocumentExtension } from "@/lib/utils";
import { CloudinaryFile } from "@/models/cloudinary-file";
import { FileText } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  file: CloudinaryFile;
}
export default function SubmittedFile({ file }: Props) {
  const { name, downloadUrl } = file;
  const nameParts = name.split(".");
  const extension = nameParts[nameParts.length - 1];
  const fileName = nameParts[0];
  const color = getFileTypeColor(extension);
  return (
    <Link
      href={downloadUrl}
      download={name}
      className="flex flex-row items-center gap-3 text-cyan-500 font-bold"
    >
      <FileText />
      <div className="flex flex-row items-center gap-1">
        <span className="">{fileName}</span>
        <span className={cn(color)}>{`(.${extension})`}</span>
      </div>
    </Link>
  );
}
