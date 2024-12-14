"use client";
import { BreadcrumbItem } from "@/components/ui/simple/breadcrumb";
import PageLayoutWithTab from "@/components/ui/util-layout/page-layout-with-tab";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/slices/breadcrumb";
import { useEffect } from "react";
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

export default ToDoPage;
