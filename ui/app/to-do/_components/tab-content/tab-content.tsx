"use client";
import { useTab } from "@/hooks/useTab";
import { notFound } from "next/navigation";
import { Tab } from "../static-data";

interface Props {}

const TabContent = ({}: Props) => {
  const tabContext = useTab<string>();
  const { selectedTab } = tabContext;

  switch (selectedTab) {
    case Tab.ASSIGNED:
      return <div>Assigned</div>;
    case Tab.OVERDUE:
      return <div>Overdue</div>;
    case Tab.DONE:
      return <div>Done</div>;
    default:
      return notFound();
  }
};

export default TabContent;
