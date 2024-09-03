"use client";
import React, { useEffect, useState } from "react";
import CategoryList from "./_components/category-list";
import { categoryList, courseWithProgress } from "./_components/fakedata";
import CourseList, { CourseWithProgress } from "@/components/ui/course-list";
import { useSearchParams } from "next/navigation";

const BrowsePage = () => {
  const [courses, setCourses] = useState<CourseWithProgress>();
  const searchParam = useSearchParams();
  const search = searchParam.get("search");

  return (
    <div className="w-full p-6 space-y-8">
      <span className="text-red-500">
        TODO: logic for filtering by categoryId
      </span>
      <CategoryList categories={categoryList} />
      <CourseList items={courseWithProgress} />
    </div>
  );
};

export default BrowsePage;
