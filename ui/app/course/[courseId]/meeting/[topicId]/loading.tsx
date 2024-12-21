import { TopicType } from "@/models/topic";
import MeetingSkeleton from "./_components/skeleton/meeting-skeleton";
import { Tab } from "./_components/static-data";

export default function Loading() {
  const tabs = Object.values(Tab);
  return <MeetingSkeleton type={TopicType.MEETING} tabs={tabs} />;
}
