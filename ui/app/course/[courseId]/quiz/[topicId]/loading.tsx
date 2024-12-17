import React from "react";
import { Tab } from "./components/static-data";
import { TopicType } from "@/models/topic";
import TopicSkeleton from "../../components/skeletons/topic-skeleton";

export default function Loading() {
  const tabs = Object.values(Tab);
  return <TopicSkeleton type={TopicType.QUIZ} tabs={tabs} />;
}
