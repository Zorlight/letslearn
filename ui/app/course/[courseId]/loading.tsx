import React from "react";
import CoursePageSkeleton from "./components/skeletons/course-page";
import PageLayoutWithTab from "@/components/ui/util-layout/page-layout-with-tab";
import { Tab } from "./components/static/tabs";

export default function Loading() {
  let tabs = [Tab.COURSE, Tab.PEOPLE, Tab.DASHBOARD];
  return (
    <PageLayoutWithTab tabs={tabs}>
      <CoursePageSkeleton />
    </PageLayoutWithTab>
  );
}
