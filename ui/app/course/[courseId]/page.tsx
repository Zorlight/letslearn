"use client";
import { BreadcrumbItem } from "@/components/ui/simple/breadcrumb";
import PageLayoutWithTab from "@/components/ui/util-layout/page-layout-with-tab";
import { fakeCourses } from "@/fake-data/course";
import { fakeSections } from "@/fake-data/section";
import { useAppDispatch } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/slices/breadcrumb";
import { useEffect, useState } from "react";
import CourseBackground from "./components/course-background";
import SectionList from "./components/section/section-list";
import { Section } from "@/models/course";

export default function CoursePage() {
  const [sections, setSections] = useState(fakeSections);

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: "Home",
      href: "/home",
    },
    //Change the label base on course name
    { label: "Introduct to Astronomy", href: "/course/1" },
  ];
  const dispatch = useAppDispatch();
  const TABS = ["Course", "Activities", "People"];
  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumbItems));
  }, []);

  const handleAddNewSection = () => {
    const newSection: Section = {
      id: `${sections.length + 1}`,
      courseId: "1",
      title: `Section ${sections.length + 1}`,
      desc: "This is a new section",
      topics: [],
    };
    setSections((prev) => [...prev, newSection]);
  };

  return (
    <PageLayoutWithTab tabs={TABS}>
      <CourseBackground course={fakeCourses[0]} />
      <SectionList sections={sections} onAddNewSection={handleAddNewSection} />
    </PageLayoutWithTab>
  );
}
