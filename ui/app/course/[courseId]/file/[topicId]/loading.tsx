import React from "react";
import { TopicType } from "@/models/topic";
import { Tab } from "./_components/static-data";
import FileSkeleton from "./_components/skeleton/file-skeleton";

export default function Loading() {
  const tabs = Object.values(Tab);
  return <FileSkeleton type={TopicType.FILE} tabs={tabs} />;
}
