"use client";
import { useTab } from "@/hooks/useTab";
import { AssignmentTopic } from "@/models/topic";
import { notFound } from "next/navigation";
import { Tab } from "../static-data";
import TabAssignment from "./tab-assignment";
import TabSetting from "./tab-setting";
import { TabSubmission } from "./tab-submission";
import { useEffect, useState } from "react";
import { StudentResponse } from "@/models/student-response";
import { Role } from "@/models/user";

interface Props {
  assignment: AssignmentTopic;
  role: Role;
  onAssignmentChange?: (quiz: AssignmentTopic) => void;
}

const TabContent = ({ role, assignment, onAssignmentChange }: Props) => {
  const tabContext = useTab<string>();
  const { selectedTab } = tabContext;

  const [assignmentResponses, setAssignmentResponses] = useState<
    StudentResponse[]
  >([]);

  useEffect(() => {}, []);

  switch (selectedTab) {
    case Tab.ASSIGNMENT:
      return (
        <TabAssignment role={role} assignment={assignment} className="h-full" />
      );
    case Tab.SETTINGS:
      return (
        <TabSetting
          assignment={assignment}
          onAssignmentChange={onAssignmentChange}
        />
      );
    case Tab.SUBMISSIONS:
      return (
        <TabSubmission
          assignment={assignment}
          assignmentResponses={assignmentResponses}
          className="h-full"
        />
      );
    default:
      return notFound();
  }
};

export default TabContent;
