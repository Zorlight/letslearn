"use client";
import { cn } from "@/lib/utils";
import {
  AssignmentTopic,
  colorMap,
  iconMap,
  QuizTopic,
  Topic,
  TopicType,
} from "@/models/topic";
import React from "react";
import ActivityStatus from "./activity-status";
import { QuizData } from "@/models/quiz";
import {
  AssignmentResponseData,
  QuizResponseData,
} from "@/models/student-response";
import { useRouter } from "next/navigation";

interface Props {
  topic: Topic;
}
export default function ActivityItem({ topic }: Props) {
  const router = useRouter();
  const { title, type } = topic;
  const Icon = iconMap[type];
  const color = colorMap[type];
  let due = null;
  let submittedAt = undefined;
  if (type === TopicType.QUIZ) {
    const quizTopic = topic as QuizTopic;
    const { response } = quizTopic;
    due = quizTopic.data.close;
    if (response) {
      const { completedAt } = response.data as QuizResponseData;
      submittedAt = completedAt;
    }
  } else if (type === TopicType.ASSIGNMENT) {
    const assignmentTopic = topic as AssignmentTopic;
    const { response } = assignmentTopic;
    due = assignmentTopic.data.close;
    if (response) {
      const { submittedAt: assignmentSubmittedAt } =
        response.data as AssignmentResponseData;
      submittedAt = assignmentSubmittedAt;
    }
  }

  const handleClick = () => {
    if (!topic.course) return;
    router.push(`course/${topic.course.id}/${topic.type}/${topic.id}`);
  };

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
      {due && <ActivityStatus due={due} submittedAt={submittedAt} />}
    </div>
  );
}
