"use client";
import CourseCard from "@/components/ui/complex/course-card";
import { BreadcrumbItem } from "@/components/ui/simple/breadcrumb";
import PageLayout from "@/components/ui/util-layout/page-layout";
import { useAppDispatch } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/slices/breadcrumb";
import React, { useEffect } from "react";

const breadcrumbItems: BreadcrumbItem[] = [
  {
    label: "Home",
    href: "/home",
  },
];

const HomePage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumbItems));
  }, []);
  return (
    <PageLayout>
      <div className="w-full h-fit grid grid-cols-3 gap-5 m-5">
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </PageLayout>
  );
};

export default HomePage;
