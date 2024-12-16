"use client";
import { StudentResponse } from "@/models/student-response";
import { AssignmentTopic } from "@/models/topic";
import { User } from "@/models/user";
import TabAssignmentLayout from "../util/tab-assignment-layout";
import GradingView from "./grading-view";
import { useEffect, useState } from "react";
import { getAllAssignmentResponsesOfTopic } from "@/services/assignment-response";
import { toast } from "react-toastify";

interface Props {
  user: User;
  assignment: AssignmentTopic;
  className?: string;
}
export default function TabTeacherAssignment({
  user,
  assignment,
  className,
}: Props) {
  const [assignmentResponses, setAssignmentResponses] = useState<
    StudentResponse[]
  >([]);
  const handleGetAssignmentResponsesSuccess = (data: StudentResponse[]) => {
    setAssignmentResponses(data);
  };
  const handleGetAssignmentResponsesFail = (error: any) => {
    toast.error(error);
  };
  useEffect(() => {
    // fetch assignment responses
    getAllAssignmentResponsesOfTopic(
      assignment.id,
      handleGetAssignmentResponsesSuccess,
      handleGetAssignmentResponsesFail
    );
  }, [assignment.id]);
  return (
    <TabAssignmentLayout
      assignment={assignment}
      user={user}
      className={className}
    >
      <GradingView
        assignment={assignment}
        assignmentResponses={assignmentResponses}
      />
    </TabAssignmentLayout>
  );
}
