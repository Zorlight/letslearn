import React from "react";
import CourseNavbar from "./_components/course-navbar";
import CourseSidebarToggle from "./_components/course-sidebar-toggle";
import { fakeCourses } from "@/fake-data/course";
import { BreadCrumbProvider } from "@/provider/breadcrumb-provider";

interface Props {
  children: React.ReactNode;
  params: {
    courseId: string;
  };
}

const CourseLayout = async ({ children, params: { courseId } }: Props) => {
  return (
    <div className="h-screen w-full flex flex-row">
      <div className="h-[80px] fixed w-full z-50 bg-white">
        <CourseNavbar course={fakeCourses[0]} />
      </div>
      <CourseSidebarToggle course={fakeCourses[0]} />
      <main className="pt-[80px] w-full h-full">
        <BreadCrumbProvider initRoute={`/courses/${courseId}`}>
          {children}
        </BreadCrumbProvider>
      </main>
    </div>
  );
};

export default CourseLayout;
