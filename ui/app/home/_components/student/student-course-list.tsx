import { cn } from "@/lib/utils";
import { Course } from "@/models/course";
import React from "react";
import StudentCourseCard from "./student-course.card";
import CourseJoiningCode from "../course-joining-code";

interface Props {
  courses: Course[];
  className?: string;
  onSubmitCode?: (code: string) => void;
}
export default function StudentCourseList({
  courses,
  className,
  onSubmitCode,
}: Props) {
  return (
    <div className={cn("w-full h-fit grid grid-cols-3 gap-5 m-5", className)}>
      {courses.map((course) => (
        <StudentCourseCard key={course.id} course={course} />
      ))}
      <CourseJoiningCode onSubmitCode={onSubmitCode} />
    </div>
  );
}
