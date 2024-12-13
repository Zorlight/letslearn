"use client";
import { BreadcrumbItem } from "@/components/ui/simple/breadcrumb";
import PageLayout from "@/components/ui/util-layout/page-layout";
import { User } from "@/models/user";
import { useAppDispatch } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/slices/breadcrumb";
import { getTeacherCourses } from "@/services/course";
import { getMyInfo } from "@/services/user";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import StudentCourseList from "./_components/student/student-course-list";

const breadcrumbItems: BreadcrumbItem[] = [
  {
    label: "Home",
    href: "/home",
  },
];

const HomePage = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User>();
  const [courses, setCourses] = useState([]);

  const handleGetInfoSuccess = (data: any) => {
    setUser(data);
  };
  const handleGetInfoFail = (error: any) => {
    toast.error(error || "Failed to get user info");
  };

  const handleGetTeacherCourseSuccess = (data: any) => {
    setCourses(data);
  };
  const handleGetTeacherCourseFail = (error: any) => {
    toast.error(error || "Failed to get teacher courses");
  };

  const handleSubmitCode = (code: string) => {
    console.log(code);
  };

  useEffect(() => {
    if (!user) {
      getMyInfo(handleGetInfoSuccess, handleGetInfoFail);
      return;
    }

    getTeacherCourses(
      user,
      handleGetTeacherCourseSuccess,
      handleGetTeacherCourseFail
    );
  }, [user]);
  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumbItems));
  }, []);

  if (!user) return null;
  return (
    <PageLayout>
      {/* {user.role === Role.TEACHER && <TeacherCourseList courses={courses} />}
      {user.role === Role.STUDENT && (
        <StudentCourseList courses={courses} onSubmitCode={handleSubmitCode} />
      )} */}
      <StudentCourseList courses={courses} onSubmitCode={handleSubmitCode} />
    </PageLayout>
  );
};

export default HomePage;
