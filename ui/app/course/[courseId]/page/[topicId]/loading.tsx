import { TopicType } from "@/models/topic";

import PageSkeleton from "./components/skeleton/page-skeleton";
import { Tab } from "./components/static-data";

export default function Loading() {
  const tabs = Object.values(Tab);
  return <PageSkeleton type={TopicType.MEETING} tabs={tabs} />;
}
