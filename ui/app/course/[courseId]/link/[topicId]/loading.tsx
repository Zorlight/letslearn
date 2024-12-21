import React from "react";
import { TopicType } from "@/models/topic";
import { Tab } from "./_components/static-data";
import LinkSkeleton from "./_components/skeleton/link-skeleton";

export default function Loading() {
  const tabs = Object.values(Tab);
  return <LinkSkeleton type={TopicType.ASSIGNMENT} tabs={tabs} />;
}
