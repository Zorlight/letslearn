"use client";
import { StudentResponse } from "@/models/student-response";
import { AssignmentTopic } from "@/models/topic";
import { User } from "@/models/user";
import TabAssignmentLayout from "../util/tab-assignment-layout";
import GradingView from "./grading-view";
import { useEffect, useState } from "react";

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
  useEffect(() => {
    // fetch assignment responses
  }, []);
  return (
    <TabAssignmentLayout
      assignment={assignment}
      user={user}
      className={className}
    >
      <GradingView assignmentResponses={assignmentResponses} />
    </TabAssignmentLayout>
  );
}
