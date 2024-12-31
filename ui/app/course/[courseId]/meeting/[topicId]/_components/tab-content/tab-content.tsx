import { useTab } from "@/hooks/useTab";
import { MeetingTopic } from "@/models/topic";
import { notFound } from "next/navigation";
import { Tab } from "../static-data";
import TabSetting from "./tab-setting";
import TabDetail from "./tab-detail";

interface Props {
  className?: string;
  courseId: string;
  meeting: MeetingTopic;
  onMeetingChange?: (meeting: MeetingTopic) => void;
}

const TabContent = ({
  courseId,
  className,
  meeting,
  onMeetingChange,
}: Props) => {
  const tabContext = useTab<string>();
  const { selectedTab } = tabContext;

  switch (selectedTab) {
    case Tab.DETAIL:
      return <TabDetail meeting={meeting} />;
    case Tab.SETTINGS:
      return (
        <TabSetting
          courseId={courseId}
          meeting={meeting}
          onMeetingChange={onMeetingChange}
        />
      );
    default:
      return notFound();
  }
};

export default TabContent;
