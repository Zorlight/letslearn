"use client";
import { Button } from "@/lib/shadcn/button";
import { CloudinaryFile } from "@/models/cloudinary-file";
import { useState } from "react";
import FileSubmissionView from "./file-submisison-view";
import SubmissionStatusTable from "./submission-status-table";
import { StudentResponse } from "@/models/student-response";
import { AssignmentTopic } from "@/models/topic";
import CustomDialog from "@/components/ui/custom-dialog";

interface Props {
  assignment: AssignmentTopic;
  assignmentResponse: StudentResponse | undefined;
  onUploaded?: (files: CloudinaryFile[]) => void;
  onRemove?: () => void;
}
export default function SubmissionView({
  assignment,
  assignmentResponse,
  onUploaded,
  onRemove,
}: Props) {
  const { close, open } = assignment.data;
  const [isAddingSubmisison, setIsAddingSubmission] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState<{
    title: string;
    content: string;
    variant: string;
  }>({
    title: "Delete submission",
    content:
      "Deleting this submission will permanently remove your work. This action cannot be undone. Are you sure you want to delete this submission?",
    variant: "warning",
  });
  const toggleAddingSubmission = () =>
    setIsAddingSubmission(!isAddingSubmisison);

  const handleUploadedFile = (files: CloudinaryFile[]) => {
    toggleAddingSubmission();
    if (onUploaded) onUploaded(files);
  };
  const handleRemoveSubmission = () => {
    setOpenConfirmDialog(true);
  };
  const handleConfirmDelete = () => {
    if (onRemove) onRemove();
    setOpenConfirmDialog(false);
  };
  const handleCancelConfirm = () => {
    setOpenConfirmDialog(false);
  };
  const isOpen = open ? new Date(open) < new Date() : true;
  const isClose = close ? new Date(close) < new Date() : false;

  const canEditSubmit = isOpen && !isClose;

  return (
    <div className="space-y-4">
      {canEditSubmit && (
        <div className="flex flex-row gap-2 items-center ">
          {!assignmentResponse && (
            <Button
              variant="cyan"
              className="w-fit rounded-lg font-bold"
              onClick={toggleAddingSubmission}
            >
              Add submission
            </Button>
          )}
          {assignmentResponse && (
            <Button
              variant="cyan"
              className="w-fit rounded-lg font-bold"
              onClick={handleRemoveSubmission}
            >
              Remove submission
            </Button>
          )}
        </div>
      )}

      {isClose && (
        <p className="font-bold text-assignment">
          This assignment is closed. You can no longer submit your assignment.
        </p>
      )}

      {!isOpen && (
        <p className="font-bold text-assignment">
          This assignment is not open yet.
        </p>
      )}

      {isOpen && (
        <>
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
        </>
      )}
      <CustomDialog
        control={{ open: openConfirmDialog, setOpen: setOpenConfirmDialog }}
        variant="warning"
        title={dialogInfo.title}
        content={<span>{dialogInfo.content}</span>}
        onYes={handleConfirmDelete}
        onCancel={handleCancelConfirm}
      />
    </div>
  );
}
