"use client";
import { useTab } from "@/hooks/useTab";
import { Course } from "@/models/course";
import { Topic } from "@/models/topic";
import { notFound } from "next/navigation";
import { Tab } from "../static-data";
import AssignedTab from "./assigned-tab";
import DoneTab from "./done-tab";
import OverdueTab from "./overdue-tab";

interface Props {
  topics: Topic[];
}

const TabContent = ({ topics }: Props) => {
  const tabContext = useTab<string>();
  const { selectedTab } = tabContext;

  switch (selectedTab) {
    case Tab.ASSIGNED:
      return <AssignedTab topics={topics} />;
    case Tab.OVERDUE:
      return <OverdueTab topics={topics} />;
    case Tab.DONE:
      return <DoneTab topics={topics} />;
    default:
      return notFound();
  }
};

export default TabContent;
