"use client";
import CourseList from "@/components/ui/course-list";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import CategoryList from "./_components/category-list";
import { Course } from "@/models/course";
import { fakeCategories } from "@/fake-data/category";
import { fakeCourses } from "@/fake-data/course";

const BrowsePage = () => {
  const [courses, setCourses] = useState<Course>();
  const searchParam = useSearchParams();
  const search = searchParam.get("search");

  return (
    <div className="w-full p-6 space-y-8">
      <span className="text-red-500">
        TODO: logic for filtering by categoryId
      </span>
      <CategoryList categories={fakeCategories} />
      <CourseList courses={fakeCourses} />
    </div>
  );
};

export default BrowsePage;
