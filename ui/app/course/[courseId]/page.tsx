"use client";
import PageLayoutWithTab from "@/components/ui/util-layout/page-layout-with-tab";
import { Course } from "@/models/course";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/slices/breadcrumb";
import { getCourse } from "@/services/course";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Tab } from "./components/static/tabs";
import TabContent from "./components/tab-content/tab-content";
import { getCourseBreadcrumb } from "./components/utils";
import Loading from "./loading";
import { Role } from "@/models/user";

interface Props {
  params: {
    courseId: string;
  };
}
export default function CoursePage({ params }: Props) {
  const { courseId } = params;
  const dispatch = useAppDispatch();
  const [course, setCourse] = useState<Course>();
  const user = useAppSelector((state) => state.profile.value);

  const handleCourseChange = (course: Course) => {
    setCourse(course);
  };

  const handleGetCourseSuccess = (data: Course) => {
    setCourse(data);
    dispatch(setBreadcrumb(getCourseBreadcrumb(data)));
  };
  const handleGetCourseFail = (error: any) => {
    toast.error(error || "Failed to get course info");
  };
  useEffect(() => {
    getCourse(courseId, handleGetCourseSuccess, handleGetCourseFail);
  }, [courseId]);
  const teacherTabs = Object.values(Tab);
  let tabs = [Tab.COURSE, Tab.PEOPLE];
  if (user?.role === Role.TEACHER) tabs = teacherTabs;

  if (!course) return <Loading />;
  return (
    <PageLayoutWithTab tabs={tabs} tabContentClassName="p-0">
      {course && (
        <TabContent course={course} onCourseChange={handleCourseChange} />
      )}
    </PageLayoutWithTab>
  );
}
