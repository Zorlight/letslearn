"use client";
import { BreadcrumbItem } from "@/components/ui/simple/breadcrumb";
import PageLayout from "@/components/ui/util-layout/page-layout";
import { Course } from "@/models/course";
import { Topic, TopicType } from "@/models/topic";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/slices/breadcrumb";
import { getTeacherCourses } from "@/services/course";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import ToReview from "./_components/to-review";

const breadcrumbItems: BreadcrumbItem[] = [
  {
    label: "To Review",
    href: "/to-review",
  },
];

const ToReviewPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.profile.value);
  const [courses, setCourses] = useState<Course[]>([]);

  const handleGetTopicFromCourse = (courses: Course[]) => {
    let topics: Topic[] = [];
    courses.forEach((course) => {
      topics.push(...handleGetQuizAndAssignmentFromCourse(course));
    });
    return topics;
  };
  const handleGetQuizAndAssignmentFromCourse = (course: Course) => {
    let topics: Topic[] = [];
    const tempCourse = { ...course };
    tempCourse.sections = [];
    course.sections.forEach((section) => {
      section.topics.forEach((topic) => {
        if (
          topic.type === TopicType.QUIZ ||
          topic.type === TopicType.ASSIGNMENT
        ) {
          topic.course = tempCourse;
          topics.push(topic);
        }
      });
    });
    return topics;
  };

  const handleGetTeacherCourseSuccess = (data: Course[]) => {
    setCourses(data);
  };
  const handleGetTeacherCourseFail = (error: any) => {
    toast.error(error || "Failed to get teacher courses");
  };

  useEffect(() => {
    if (!user) return;

    getTeacherCourses(
      user,
      handleGetTeacherCourseSuccess,
      handleGetTeacherCourseFail
    );
  }, [user]);
  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumbItems));
  }, []);

  const topics = useMemo(() => {
    return handleGetTopicFromCourse(courses);
  }, [courses]);

  return (
    <PageLayout className="w-full flex flex-col">
      <div className="w-full max-w-4xl mx-auto py-10">
        <ToReview topics={topics} />
      </div>
    </PageLayout>
  );
};

export default ToReviewPage;
