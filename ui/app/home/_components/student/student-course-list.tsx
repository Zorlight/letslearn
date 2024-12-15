"use client";
import { cn } from "@/lib/utils";
import { Course } from "@/models/course";
import React, { useEffect, useState } from "react";
import StudentCourseCard from "./student-course.card";
import CourseJoiningCode from "../course-joining-code";
import { toast } from "react-toastify";
import { joinCourse } from "@/services/course";
import { useRouter } from "next/navigation";

interface Props {
  courses: Course[];
  className?: string;
  onCoursesChange?: (courses: Course[]) => void;
}
export default function StudentCourseList({
  courses,
  className,
  onCoursesChange,
}: Props) {
  const router = useRouter();

  const handleJoinCourseSuccess = (code: string) => (data: any) => {
    toast.success("Joined course successfully");
    router.push(`/course/${code}`);
  };
  const handleJoinCourseFail = (error: any) => {
    toast.error(error);
  };

  const handleSubmitCode = (code: string) => {
    joinCourse(code, handleJoinCourseSuccess(code), handleJoinCourseFail);
  };

  return (
    <div className={cn("w-full h-fit grid grid-cols-3 gap-5 m-5", className)}>
      <CourseJoiningCode onSubmitCode={handleSubmitCode} />

      {courses.map((course) => (
        <StudentCourseCard key={course.id} course={course} />
      ))}
      {courses.map((course) => (
        <StudentCourseCard key={course.id} course={course} />
      ))}
      {courses.map((course) => (
        <StudentCourseCard key={course.id} course={course} />
      ))}
      {courses.map((course) => (
        <StudentCourseCard key={course.id} course={course} />
      ))}
      {courses.map((course) => (
        <StudentCourseCard key={course.id} course={course} />
      ))}
      {courses.map((course) => (
        <StudentCourseCard key={course.id} course={course} />
      ))}
      {courses.map((course) => (
        <StudentCourseCard key={course.id} course={course} />
      ))}
      {courses.map((course) => (
        <StudentCourseCard key={course.id} course={course} />
      ))}
      {courses.map((course) => (
        <StudentCourseCard key={course.id} course={course} />
      ))}
      {courses.map((course) => (
        <StudentCourseCard key={course.id} course={course} />
      ))}
      {courses.map((course) => (
        <StudentCourseCard key={course.id} course={course} />
      ))}
      {courses.map((course) => (
        <StudentCourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
