"use client";
import React, { useEffect, useState } from "react";
import TabAssignmentLayout from "../util/tab-assignment-layout";
import SubmissionView from "./submission-view";
import { StudentResponse } from "@/models/student-response";
import { AssignmentTopic } from "@/models/topic";
import { User } from "@/models/user";
import { CloudinaryFile } from "@/models/cloudinary-file";
import { defaultAssignmentResponse } from "./static-data";
import { createAssignmentResponse } from "@/services/assignment-response";

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
    // fetch assignment response of the student by assignment id and user id
  }, []);
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
    // createAssignmentResponse(
    //   assignment.id,
    //   initAssignmentResponses,
    //   handleCreateAssignmentResponseSuccess,
    //   handleCreateAssignmentResponseFail
    // );
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
      />
    </TabAssignmentLayout>
  );
}
