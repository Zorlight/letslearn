import { TopicType } from "@/models/topic";
import AssignmentSkeleton from "./components/skeleton/assignment-skeleton";
import { Tab } from "./components/static-data";

export default function Loading() {
  const tabs = Object.values(Tab);
  return <AssignmentSkeleton type={TopicType.ASSIGNMENT} tabs={tabs} />;
}
