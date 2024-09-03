import React from "react";
import CourseSidebar from "./_components/course-sidebar";
import { course } from "./_components/fake-data";
import CourseNavbar from "./_components/course-navbar";

interface Props {
  children: React.ReactNode;
  params: {
    courseId: string;
  };
}

const CourseLayout = async ({ children, params: { courseId } }: Props) => {
  return (
    <div className="h-screen w-full flex flex-row">
      <div className="h-[80px] md:pl-80 fixed w-full z-50 bg-white">
        <CourseNavbar course={course} />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed z-50 bg-white">
        <CourseSidebar course={course} />
      </div>
      <main className="md:pl-80 pt-[80px] w-full h-full">{children}</main>
    </div>
  );
};

export default CourseLayout;
