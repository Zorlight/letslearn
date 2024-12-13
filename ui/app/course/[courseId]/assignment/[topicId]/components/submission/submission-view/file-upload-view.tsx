"use client";
import { cn } from "@/lib/utils";
import {
  AssignmentResponseData,
  StudentResponse,
} from "@/models/student-response";
import Part from "../part";
import SubmittedFile from "./submitted-file";
interface Props {
  className?: string;
  studentResponse: StudentResponse;
}
export default function SubmissionFileUploadView({
  studentResponse,
  className,
}: Props) {
  const { files } = studentResponse.data as AssignmentResponseData;

  const title = files.length > 1 ? "Files uploaded" : "File uploaded";
  return (
    <Part title={title} className={cn("gap-0", className)}>
      <div className="flex flex-col gap-2 py-3">
        {files.map((file, i) => (
          <SubmittedFile key={i} file={file} />
        ))}
      </div>
    </Part>
  );
}
