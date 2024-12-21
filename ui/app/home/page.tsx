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
import { cn } from "@/lib/utils";

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
  const isSidebarOpen = useAppSelector((state) => state.sidebar.isOpen);

  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumbItems));
  }, []);

  if (!user) return <CourseListSkeleton />;
  return (
    <PageLayout>
      {user.role === Role.TEACHER && (
        <TeacherCourseList
          courses={courses}
          className={cn(
            "max-xl:grid-cols-2 max-sm:grid-cols-1",
            !isSidebarOpen &&
              "grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1"
          )}
        />
      )}
      {user.role === Role.STUDENT && (
        <StudentCourseList
          courses={courses}
          className={cn(
            "max-xl:grid-cols-2 max-sm:grid-cols-1",
            !isSidebarOpen &&
              "grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1"
          )}
        />
      )}
    </PageLayout>
  );
};

export default HomePage;
