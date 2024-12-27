import { useTab } from "@/hooks/useTab";
import React from "react";
import { Tab } from "../static/tabs";
import CourseTab from "./course-tab";
import { Course } from "@/models/course";
import ActivitiesTab from "./activities-tab";
import SettingsTab from "./settings-tab";
import PeopleTab from "./people-tab";
import DashboardTab from "./dashboard-tab";

interface Props {
  course: Course;
  onCourseChange?: (course: Course) => void;
}
export default function TabContent({ course, onCourseChange }: Props) {
  const tabContext = useTab<Tab>();
  const { selectedTab } = tabContext;

  switch (selectedTab) {
    case Tab.COURSE:
      return (
        <div className="p-5">
          <CourseTab course={course} onCourseChange={onCourseChange} />
        </div>
      );
    case Tab.ACTIVITIES:
      return (
        <div className="p-5">
          <ActivitiesTab />
        </div>
      );
    case Tab.PEOPLE:
      return (
        <div className="p-5">
          <PeopleTab course={course} />
        </div>
      );
    case Tab.DASHBOARD:
      return <DashboardTab course={course} />;
    case Tab.SETTINGS:
      return (
        <div className="p-5">
          <SettingsTab course={course} onCourseChange={onCourseChange} />
        </div>
      );
    default:
      return <div>Overview</div>;
  }
}
