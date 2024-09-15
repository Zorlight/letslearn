"use client";
import { fakeCourses } from "@/fake-data/course";
import CourseTable from "./_components/course-table";

const CoursePage = () => {
  return (
    <div className="p-6 flex flex-col gap-2">
      <CourseTable courses={fakeCourses} />
    </div>
  );
};

export default CoursePage;
