"use client";
import { Button } from "@/lib/shadcn/button";
import { useState } from "react";
import SubmissionStatusTable from "./submission-status-table";
import FileSubmissionView from "./file-submisison-view";
import { CloudinaryFile } from "@/models/cloudinary-file";

export default function SubmissionView() {
  const [isAddingSubmisison, setIsAddingSubmission] = useState(false);
  const toggleAddingSubmission = () =>
    setIsAddingSubmission(!isAddingSubmisison);

  const handleUploadedFile = (files: CloudinaryFile[]) => {
    toggleAddingSubmission();
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-row gap-2 items-center ">
        <Button
          variant="cyan"
          className="w-fit rounded-lg font-bold"
          onClick={toggleAddingSubmission}
        >
          Add submission
        </Button>
        <Button
          variant="cyan"
          className="w-fit rounded-lg font-bold bg-cyan-50 text-cyan-500 hover:bg-cyan-100 hover:text-cyan-600"
        >
          Mark as completed
        </Button>
      </div>

      <div className="font-bold text-orange-500">Submission status</div>
      {!isAddingSubmisison && <SubmissionStatusTable />}
      {isAddingSubmisison && (
        <FileSubmissionView onUploaded={handleUploadedFile} />
      )}
    </div>
  );
}
