import React from "react";
import { TopicType } from "@/models/topic";
import TopicSkeleton from "../../components/skeletons/topic-skeleton";
import { Tab } from "./_components/static-data";

export default function Loading() {
  const tabs = Object.values(Tab);
  return <TopicSkeleton type={TopicType.MEETING} tabs={tabs} />;
}
