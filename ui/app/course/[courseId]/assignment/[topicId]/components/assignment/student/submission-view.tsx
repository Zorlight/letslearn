"use client";
import { Button } from "@/lib/shadcn/button";
import { CloudinaryFile } from "@/models/cloudinary-file";
import { useState } from "react";
import FileSubmissionView from "./file-submisison-view";
import SubmissionStatusTable from "./submission-status-table";
import { StudentResponse } from "@/models/student-response";
import { AssignmentTopic } from "@/models/topic";

interface Props {
  assignment: AssignmentTopic;
  assignmentResponse: StudentResponse | undefined;
  onUploaded?: (files: CloudinaryFile[]) => void;
}
export default function SubmissionView({
  assignment,
  assignmentResponse,
  onUploaded,
}: Props) {
  const [isAddingSubmisison, setIsAddingSubmission] = useState(false);
  const toggleAddingSubmission = () =>
    setIsAddingSubmission(!isAddingSubmisison);

  const handleUploadedFile = (files: CloudinaryFile[]) => {
    toggleAddingSubmission();
    if (onUploaded) onUploaded(files);
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
      </div>

      <div className="font-bold text-orange-500">Submission status</div>
      {!isAddingSubmisison && (
        <SubmissionStatusTable
          assignment={assignment}
          assignmentResponse={assignmentResponse}
        />
      )}
      {isAddingSubmisison && (
        <FileSubmissionView onUploaded={handleUploadedFile} />
      )}
    </div>
  );
}
