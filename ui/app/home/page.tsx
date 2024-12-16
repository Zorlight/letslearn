"use client";
import { BreadcrumbItem } from "@/components/ui/simple/breadcrumb";
import PageLayout from "@/components/ui/util-layout/page-layout";
import { Role } from "@/models/user";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/slices/breadcrumb";
import { useEffect } from "react";
import StudentCourseList from "./_components/student/student-course-list";
import TeacherCourseList from "./_components/teacher/teacher-course-list";
import CourseListSkeleton from "./_components/skeleton/course-list-skeleton";

const breadcrumbItems: BreadcrumbItem[] = [
  {
    label: "Home",
    href: "/home",
  },
];

const HomePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.profile.value);
  const courses = useAppSelector((state) => state.courses.value);

  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumbItems));
  }, []);

  if (!user) return <CourseListSkeleton />;
  return (
    <PageLayout>
      {user.role === Role.TEACHER && <TeacherCourseList courses={courses} />}
      {user.role === Role.STUDENT && <StudentCourseList courses={courses} />}
    </PageLayout>
  );
};

export default HomePage;
