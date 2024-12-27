import { cn } from "@/lib/utils";
import { TopicType } from "@/models/topic";
import DashboardTabItem from "./tab";

interface Props {
  tabs: TopicType[];
  selectedTab: string;
  onSelect?: (tab: TopicType) => void;
}
export default function DashboardTabList({
  selectedTab,
  tabs,
  onSelect,
}: Props) {
  return (
    <div
      className={cn(
        "w-fit flex flex-row gap-2 items-center px-4 py-1 rounded-md bg-white border-[1px] transition-all duration-200",
        selectedTab === TopicType.QUIZ && "border-quiz",
        selectedTab === TopicType.ASSIGNMENT && "border-assignment"
      )}
    >
      {tabs.map((tab) => (
        <DashboardTabItem
          key={tab}
          tab={tab}
          isSelected={selectedTab === tab}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
