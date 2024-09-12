import React from "react";
import CourseSidebar from "./_components/course-sidebar";
import { course } from "./_components/fake-data";
import CourseNavbar from "./_components/course-navbar";
import CourseSidebarToggle from "./_components/course-sidebar-toggle";

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
        <CourseNavbar course={course} />
      </div>
      <CourseSidebarToggle course={course} />
      <main className="pt-[80px] w-full h-full">{children}</main>
    </div>
  );
};

export default CourseLayout;
