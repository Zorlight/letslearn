"use client";
import { useTab } from "@/hooks/useTab";
import { notFound } from "next/navigation";
import { Tab } from "../static-data";
import AssignedTab from "./assigned-tab";
import { Course } from "@/models/course";
import OverdueTab from "./overdue-tab";
import DoneTab from "./done-tab";
import { useState } from "react";

interface Props {
  courses: Course[];
}

const TabContent = ({ courses }: Props) => {
  const tabContext = useTab<string>();
  const { selectedTab } = tabContext;

  const [selectedOption, setSelectedOption] = useState("All courses");

  switch (selectedTab) {
    case Tab.ASSIGNED:
      return <AssignedTab courses={courses} />;
    case Tab.OVERDUE:
      return <OverdueTab courses={courses} />;
    case Tab.DONE:
      return <DoneTab courses={courses} />;
    default:
      return notFound();
  }
};

export default TabContent;
