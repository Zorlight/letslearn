"use client";
import { BreadcrumbItem } from "@/components/ui/simple/breadcrumb";
import PageLayoutWithTab from "@/components/ui/util-layout/page-layout-with-tab";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/slices/breadcrumb";
import { useEffect, useState } from "react";
import { Tab } from "./_components/static-data";
import TabContent from "./_components/tab-content/tab-content";

const breadcrumbItems: BreadcrumbItem[] = [
  {
    label: "To Do",
    href: "/to-do",
  },
];

const ToDoPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.profile.value);
  const courses = useAppSelector((state) => state.courses.value);
  const [initTab, setInitTab] = useState<string>(Tab.ASSIGNED);

  const handleTabSelected = (tab: string) => {
    localStorage.setItem("to-do", tab);
  };

  useEffect(() => {
    const storageTab = localStorage.getItem("to-do");
    if (storageTab) setInitTab(storageTab);

    dispatch(setBreadcrumb(breadcrumbItems));
  }, []);

  useEffect(() => {}, []);

  const tabs = Object.values(Tab);
  return (
    <PageLayoutWithTab
      tabs={tabs}
      initTab={initTab}
      onTabSelected={handleTabSelected}
    >
      <div className="max-w-4xl mx-auto">
        <TabContent courses={courses} />
      </div>
    </PageLayoutWithTab>
  );
};

export default ToDoPage;
