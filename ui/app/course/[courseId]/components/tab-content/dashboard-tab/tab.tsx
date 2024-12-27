import { cn } from "@/lib/utils";
import { TopicType } from "@/models/topic";
import React from "react";

interface Props {
  tab: TopicType;
  isSelected?: boolean;
  onSelect?: (tab: TopicType) => void;
}
export default function DashboardTabItem({
  tab,
  isSelected = false,
  onSelect,
}: Props) {
  const handleSelect = () => {
    if (onSelect) onSelect(tab);
  };
  return (
    <div
      onClick={handleSelect}
      className={cn(
        "px-2 py-1 rounded-md cursor-pointer transition-all duration-200 capitalize text-sm font-semibold",
        tab === TopicType.QUIZ && isSelected && "bg-quiz text-white",
        tab === TopicType.QUIZ &&
          !isSelected &&
          "bg-white text-quiz hover:bg-pink-100",
        tab === TopicType.ASSIGNMENT &&
          isSelected &&
          "bg-assignment text-white",
        tab === TopicType.ASSIGNMENT &&
          !isSelected &&
          "bg-white text-assignment hover:bg-purple-100"
      )}
    >
      {tab}
    </div>
  );
}
