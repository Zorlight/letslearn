"use client";
import { BreadcrumbItem } from "@/components/ui/simple/breadcrumb";
import PageLayoutWithTab from "@/components/ui/util-layout/page-layout-with-tab";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/slices/breadcrumb";
import { useEffect, useState } from "react";
import { Tab } from "./_components/static-data";
import TabContent from "./_components/tab-content/tab-content";
import { AssignmentTopic, QuizTopic } from "@/models/topic";
import { toast } from "react-toastify";
import { getAllAssignmentOfUser, getAllQuizOfUser } from "@/services/topic";

const breadcrumbItems: BreadcrumbItem[] = [
  {
    label: "To Do",
    href: "/to-do",
  },
];

const ToDoPage = () => {
  const dispatch = useAppDispatch();
  const [initTab, setInitTab] = useState<string>(Tab.ASSIGNED);
  const [assignmentsOfUser, setAssignmentsOfUser] = useState<AssignmentTopic[]>(
    []
  );
  const [quizzesOfUser, setQuizzesOfUser] = useState<QuizTopic[]>([]);

  const handleTabSelected = (tab: string) => {
    localStorage.setItem("to-do", tab);
  };
  const handleGetAllAssignmentOfUserSuccess = (data: AssignmentTopic[]) => {
    console.log("assignment of user", data);
    setAssignmentsOfUser(data);
  };

  const handleGetAllQuizOfUserSuccess = (data: QuizTopic[]) => {
    console.log("quiz of user", data);
    setQuizzesOfUser(data);
  };

  const handleGetDataFail = (error: any) => {
    toast.error(error);
  };

  useEffect(() => {
    const storageTab = localStorage.getItem("to-do");
    if (storageTab) setInitTab(storageTab);

    dispatch(setBreadcrumb(breadcrumbItems));
  }, []);

  useEffect(() => {
    getAllAssignmentOfUser(
      handleGetAllAssignmentOfUserSuccess,
      handleGetDataFail
    );
    getAllQuizOfUser(handleGetAllQuizOfUserSuccess, handleGetDataFail);
  }, []);

  const tabs = Object.values(Tab);
  return (
    <PageLayoutWithTab
      tabs={tabs}
      initTab={initTab}
      onTabSelected={handleTabSelected}
    >
      <div className="max-w-4xl mx-auto">
        <TabContent topics={[...assignmentsOfUser, ...quizzesOfUser]} />
      </div>
    </PageLayoutWithTab>
  );
};

export default ToDoPage;
