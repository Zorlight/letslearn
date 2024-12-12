"use client";
import { BreadcrumbItem } from "@/components/ui/simple/breadcrumb";
import PageLayoutWithTab from "@/components/ui/util-layout/page-layout-with-tab";
import { useAppDispatch } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/slices/breadcrumb";
import { getTeacherCourses } from "@/services/course";
import { getMyInfo } from "@/services/user";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Tab } from "./_components/static-data";
import TabContent from "./_components/tab-content/tab-content";

const breadcrumbItems: BreadcrumbItem[] = [
  {
    label: "To Review",
    href: "/to-review",
  },
];

const ToReviewPage = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState();
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

  useEffect(() => {
    if (!user) {
      console.log("get user");
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

  const tabs = Object.values(Tab);
  return (
    <PageLayoutWithTab tabs={tabs}>
      <div className="max-w-4xl mx-auto">
        <TabContent />
      </div>
    </PageLayoutWithTab>
  );
};

export default ToReviewPage;
