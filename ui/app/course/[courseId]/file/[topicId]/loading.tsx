import React from "react";
import TopicSkeleton from "../../components/skeletons/topic-skeleton";
import { TopicType } from "@/models/topic";
import { Tab } from "./_components/static-data";

export default function Loading() {
  const tabs = Object.values(Tab);
  return <TopicSkeleton type={TopicType.ASSIGNMENT} tabs={tabs} />;
}
