"use client";
import { useTab } from "@/hooks/useTab";
import { notFound } from "next/navigation";
import { Tab } from "../static-data";
import ToReviewTab from "./to-review-tab";
import ReviewedTab from "./reviewed-tab";

interface Props {}

const TabContent = ({}: Props) => {
  const tabContext = useTab<string>();
  const { selectedTab } = tabContext;

  switch (selectedTab) {
    case Tab.TO_REVIEW:
      return <ToReviewTab />;
    case Tab.REVIEWED:
      return <ReviewedTab />;
    default:
      return notFound();
  }
};

export default TabContent;
