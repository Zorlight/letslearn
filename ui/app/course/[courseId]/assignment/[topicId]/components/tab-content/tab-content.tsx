"use client";
import { useTab } from "@/hooks/useTab";
import { AssignmentTopic } from "@/models/topic";
import { Role, User } from "@/models/user";
import { notFound } from "next/navigation";
import { Tab } from "../static-data";
import TabAssignment from "./tab-assignment";
import TabDashboard from "./tab-dashboard";
import TabSetting from "./tab-setting";
import { TabSubmission } from "./tab-submission";

interface Props {
  assignment: AssignmentTopic;
  user: User;
  courseId: string;
  onAssignmentChange?: (assignment: AssignmentTopic) => void;
}

const TabContent = ({
  user,
  assignment,
  courseId,
  onAssignmentChange,
}: Props) => {
  const tabContext = useTab<string>();
  const { selectedTab } = tabContext;

  switch (selectedTab) {
    case Tab.ASSIGNMENT:
      return (
        <TabAssignment user={user} assignment={assignment} className="h-full" />
      );
    case Tab.SETTINGS:
      if (user.role !== Role.TEACHER) return notFound();
      return (
        <TabSetting
          assignment={assignment}
          onAssignmentChange={onAssignmentChange}
        />
      );
    case Tab.SUBMISSIONS:
      if (user.role !== Role.TEACHER) return notFound();
      return <TabSubmission assignment={assignment} className="h-full" />;
    case Tab.DASHBOARD:
      return <TabDashboard assignment={assignment} courseId={courseId} />;
    default:
      return notFound();
  }
};

export default TabContent;
