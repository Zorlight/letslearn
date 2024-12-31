"use client";
import React, { useEffect, useState } from "react";
import TabAssignmentLayout from "../util/tab-assignment-layout";
import SubmissionView from "./submission-view";
import {
  AssignmentResponseData,
  StudentResponse,
} from "@/models/student-response";
import { AssignmentTopic } from "@/models/topic";
import { User } from "@/models/user";
import { CloudinaryFile } from "@/models/cloudinary-file";
import { defaultAssignmentResponse } from "./static-data";
import {
  createAssignmentResponse,
  deleteAssignmentResponse,
} from "@/services/assignment-response";
import { toast } from "react-toastify";
import { deleteFiles } from "@/services/cloudinary";

interface Props {
  user: User;
  assignment: AssignmentTopic;
  className?: string;
}
export default function TabStudentAssignment({
  user,
  assignment,
  className,
}: Props) {
  const [assignmentResponse, setAssignmentResponse] =
    useState<StudentResponse>();
  useEffect(() => {
    if (assignment.response) setAssignmentResponse(assignment.response);
  }, [assignment.response]);

  const handleCreateAssignmentResponseSuccess = (data: StudentResponse) => {
    setAssignmentResponse(data);
    toast.success("Assignment submitted successfully");
  };
  const handleCreateAssignmentResponseFail = (err: any) => {
    toast.error(err);
  };
  const handleUploaded = (files: CloudinaryFile[]) => {
    let initAssignmentResponses = defaultAssignmentResponse;
    initAssignmentResponses = {
      ...initAssignmentResponses,
      topicId: assignment.id,
      data: {
        ...initAssignmentResponses.data,
        files: files,
        submittedAt: new Date().toISOString(),
      },
    };
    createAssignmentResponse(
      assignment.id,
      initAssignmentResponses,
      handleCreateAssignmentResponseSuccess,
      handleCreateAssignmentResponseFail
    );
  };

  const handleRemoveUploadedSuccess = (data: any) => {};
  const handleRemoveUploadedFail = (err: any) => {
    toast.error(err);
  };
  const handleRemoveUploaded = (files: CloudinaryFile[]) => {
    const publicUrlList = files.map((file) => file.displayUrl);
    deleteFiles(
      publicUrlList,
      handleRemoveUploadedSuccess,
      handleRemoveUploadedFail
    );
  };

  const handleRemoveAssignmentResponseSuccess = () => {
    setAssignmentResponse(undefined);
    toast.success("Assignment removed successfully");
  };
  const handleRemoveAssignmentResponseFail = (err: any) => {
    toast.error(err);
  };
  const handleRemoveSubmission = () => {
    if (!assignmentResponse) return;
    const { files } = assignmentResponse.data as AssignmentResponseData;
    handleRemoveUploaded(files);
    deleteAssignmentResponse(
      assignment.id,
      assignmentResponse.id,
      handleRemoveAssignmentResponseSuccess,
      handleRemoveAssignmentResponseFail
    );
  };
  return (
    <TabAssignmentLayout
      assignment={assignment}
      user={user}
      className={className}
    >
      <SubmissionView
        assignment={assignment}
        assignmentResponse={assignmentResponse}
        onUploaded={handleUploaded}
        onRemove={handleRemoveSubmission}
      />
    </TabAssignmentLayout>
  );
}
