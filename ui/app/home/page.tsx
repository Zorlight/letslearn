"use client";
import { BreadcrumbItem } from "@/components/ui/simple/breadcrumb";
import PageLayout from "@/components/ui/util-layout/page-layout";
import { Role } from "@/models/user";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/slices/breadcrumb";
import { getPublicCourses, getTeacherCourses } from "@/services/course";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import StudentCourseList from "./_components/student/student-course-list";
import TeacherCourseList from "./_components/teacher/teacher-course-list";
import { Course } from "@/models/course";

const breadcrumbItems: BreadcrumbItem[] = [
  {
    label: "Home",
    href: "/home",
  },
];

const HomePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.profile.value);
  const [courses, setCourses] = useState<Course[]>([]);

  const handleGetTeacherCourseSuccess = (data: any) => {
    setCourses(data);
  };
  const handleGetTeacherCourseFail = (error: any) => {
    toast.error(error || "Failed to get teacher courses");
  };

  const handleGetPublicCoursesSuccess =
    (userCourses: Course[]) => (data: Course[]) => {
      setCourses([...userCourses, ...data]);
    };
  const handleGetPublicCoursesFail = (error: any) => {
    toast.error(error);
  };

  useEffect(() => {
    if (!user) return;

    if (user.role === Role.STUDENT) {
      getPublicCourses(
        handleGetPublicCoursesSuccess(user.courses),
        handleGetPublicCoursesFail
      );
    } else {
      getTeacherCourses(
        user,
        handleGetTeacherCourseSuccess,
        handleGetTeacherCourseFail
      );
    }
  }, [user]);

  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumbItems));
  }, []);

  if (!user) return null;
  return (
    <PageLayout>
      {user.role === Role.TEACHER && <TeacherCourseList courses={courses} />}
      {user.role === Role.STUDENT && <StudentCourseList courses={courses} />}
    </PageLayout>
  );
};

export default HomePage;
