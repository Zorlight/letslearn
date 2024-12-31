"use client";
import { useTab } from "@/hooks/useTab";
import { FileTopic, LinkTopic } from "@/models/topic";
import { User } from "@/models/user";
import { notFound } from "next/navigation";
import { Tab } from "../static-data";
import TabFile from "./tab-link";
import TabSetting from "./tab-setting";

interface Props {
  courseId: string;
  topic: LinkTopic;
  user: User;
  onTopicChange?: (topic: LinkTopic) => void;
}

const TabContent = ({ courseId, user, topic, onTopicChange }: Props) => {
  const tabContext = useTab<string>();
  const { selectedTab } = tabContext;

  switch (selectedTab) {
    case Tab.LINK:
      return <TabFile topic={topic} className="h-full" />;
    case Tab.SETTINGS:
      return (
        <TabSetting
          courseId={courseId}
          topic={topic}
          onTopicChange={onTopicChange}
        />
      );

    default:
      return notFound();
  }
};

export default TabContent;
