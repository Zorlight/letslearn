import { cn } from "@/lib/utils";
import { colorMap, iconMap, Topic } from "@/models/topic";
import React from "react";
import ReviewNumber from "./review-number";
import ReviewNumberList from "./review-number-list";

interface Props {
  topic: Topic;
}
export default function ReviewItem({ topic }: Props) {
  const { title, type } = topic;
  const Icon = iconMap[type];
  const color = colorMap[type];
  return (
    <div className="flex flex-row items-center justify-between px-4 border-t-[0.5px] border-gray-300 py-2 hover:bg-gray-50 transition-all duration-200 cursor-pointer group">
      <div className="flex flex-row items-center gap-4">
        <Icon className={cn("w-6 h-6 mr-2", color)} />
        <span className="text-cyan-500 font-bold group-hover:underline">
          {title}
        </span>
      </div>
      <ReviewNumberList attempted={73} assigned={40} graded={40} />
    </div>
  );
}
