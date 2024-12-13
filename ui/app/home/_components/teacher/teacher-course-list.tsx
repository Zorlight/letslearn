import { cn } from "@/lib/utils";
import { Course } from "@/models/course";
import React from "react";
import TeacherCourseCard from "./teacher-course-card";

interface Props {
  courses: Course[];
  className?: string;
}
export default function TeacherCourseList({ courses, className }: Props) {
  return (
    <div className={cn("w-full h-fit grid grid-cols-3 gap-5 m-5", className)}>
      {courses.map((course) => (
        <TeacherCourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
