import NavRoutes from "@/app/(dashboard)/_components/nav-routes";
import { Course } from "@/models/course";
import React from "react";
import CourseMobileSidebar from "./course-mobile-sidebar";

interface Props {
  course: Course;
}
const CourseNavbar = ({ course }: Props) => {
  const {} = course;
  return (
    <div className="border-b w-full h-full flex flex-row items-center p-6 shadow-sm">
      <CourseMobileSidebar course={course} />
      <NavRoutes />
    </div>
  );
};

export default CourseNavbar;
