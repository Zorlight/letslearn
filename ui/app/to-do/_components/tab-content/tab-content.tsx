"use client";
import { useTab } from "@/hooks/useTab";
import { notFound } from "next/navigation";
import { Tab } from "../static-data";
import AssignedTab from "./assigned-tab";
import { Course } from "@/models/course";
import OverdueTab from "./overdue-tab";
import DoneTab from "./done-tab";
import { useState } from "react";
import { AssignmentTopic, QuizTopic } from "@/models/topic";

interface Props {
  courses: Course[];
  assignmentsOfUser: AssignmentTopic[];
  quizzesOfUser: QuizTopic[];
}

const TabContent = ({ courses, assignmentsOfUser, quizzesOfUser }: Props) => {
  const tabContext = useTab<string>();
  const { selectedTab } = tabContext;

  switch (selectedTab) {
    case Tab.ASSIGNED:
      return (
        <AssignedTab
          courses={courses}
          assignmentsOfUser={assignmentsOfUser}
          quizzesOfUser={quizzesOfUser}
        />
      );

    case Tab.OVERDUE:
      return <OverdueTab courses={courses} />;
    case Tab.DONE:
      return <DoneTab courses={courses} />;
    default:
      return notFound();
  }
};

export default TabContent;
