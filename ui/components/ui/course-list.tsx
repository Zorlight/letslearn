import { Category, Course } from "@/models/course";
import React from "react";
import CourseCard from "./course-card";

export type CourseWithProgress = Course & {
  progress: number | null;
};

interface Props {
  items: CourseWithProgress[];
}
const CourseList = ({ items }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.length === 0 && (
          <div className="text-sm text-slate-600 mx-auto">No courses found</div>
        )}
        {items.map((item, index) => (
          <CourseCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
