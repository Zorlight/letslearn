import { useTab } from "@/hooks/useTab";
import { AssignmentData, Test } from "@/models/test";
import { notFound } from "next/navigation";
import { Tab } from "../static-data";
import TabAssignment from "./tab-assignment";
import TabSetting from "./tab-setting";

interface Props {
  className?: string;
  assignment: Test;
  onAssignmentChange?: (quiz: Test) => void;
}

const TabContent = ({ className, assignment, onAssignmentChange }: Props) => {
  const tabContext = useTab<string>();
  const { selectedTab } = tabContext;
  const { data } = assignment;
  const {} = data as AssignmentData;

  switch (selectedTab) {
    case Tab.ASSIGNMENT:
      return <TabAssignment assignment={assignment} />;
    case Tab.SETTINGS:
      return <TabSetting assignment={assignment} />;
    case Tab.SUBMISSIONS:
      return <div>Submissions</div>;
    default:
      return notFound();
  }
};

export default TabContent;
