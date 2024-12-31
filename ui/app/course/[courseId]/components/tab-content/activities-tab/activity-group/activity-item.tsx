"use strict";
import { cn } from "@/lib/utils";
import { colorMap, iconMap, Topic, TopicType } from "@/models/topic";
import React from "react";
import ActivityStatus from "./activity-status";
import { useRouter } from "next/navigation";
import { Course } from "@/models/course";

interface Props {
  topic: Topic;
  course: Course;
}
export default function ActivityItem({ topic, course }: Props) {
  const { title, type } = topic;
  const router = useRouter();
  const handleClick = () => {
    router.push(`/course/${course.id}/${topic.type}/${topic.id}`);
  };

  const Icon = iconMap[type];
  const color = colorMap[type];
  let due = null;
  if (type === TopicType.QUIZ) due = topic.data.close;
  else if (type === TopicType.ASSIGNMENT) due = topic.data.close;
  return (
    <div
      className="flex flex-row items-center justify-between px-4 border-t-[0.5px] border-gray-300 py-4 hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
      onClick={handleClick}
    >
      <div className="flex flex-row items-center gap-4">
        <Icon className={cn("w-6 h-6 mr-2", color)} />
        <span className="text-cyan-500 font-bold group-hover:underline">
          {title}
        </span>
      </div>
      {due && <ActivityStatus due={due} />}
    </div>
  );
}
