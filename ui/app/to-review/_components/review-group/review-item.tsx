"use client";
import { cn } from "@/lib/utils";
import { colorMap, iconMap, Topic, TopicType } from "@/models/topic";
import { useRouter } from "next/navigation";
import QuizReviewNumber from "./review-number/quiz-review-number";
import AssignmentReviewNumber from "./review-number/assignment-review-number";
import { useEffect, useState } from "react";
import { getAllQuizResponsesOfTopic } from "@/services/quiz-response";
import { StudentResponse } from "@/models/student-response";
import { toast } from "react-toastify";
import { getAllAssignmentResponsesOfTopic } from "@/services/assignment-response";

interface Props {
  topic: Topic;
}
export default function ReviewItem({ topic }: Props) {
  const router = useRouter();
  const { title, type, course } = topic;

  const [studentResponses, setStudentResponses] = useState<StudentResponse[]>(
    []
  );
  const handleClick = () => {
    if (!topic.course) return;
    router.push(`/course/${topic.course.id}/${topic.type}/${topic.id}`);
  };
  const handleGetStudentResponsesSuccess = (data: StudentResponse[]) => {
    setStudentResponses(data);
  };
  const handleGetStudentResponsesFail = (error: any) => {
    toast.error(error);
  };
  useEffect(() => {
    if (type === TopicType.QUIZ)
      getAllQuizResponsesOfTopic(
        topic.id,
        handleGetStudentResponsesSuccess,
        handleGetStudentResponsesFail
      );
    else if (type === TopicType.ASSIGNMENT)
      getAllAssignmentResponsesOfTopic(
        topic.id,
        handleGetStudentResponsesSuccess,
        handleGetStudentResponsesFail
      );
  }, [topic]);

  const Icon = iconMap[type];
  const color = colorMap[type];
  const assigned = course ? course.students.length : 0;
  return (
    <div
      className="flex flex-row items-center justify-between px-4 border-t-[0.5px] border-gray-300 py-2 hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
      onClick={handleClick}
    >
      <div className="flex flex-row items-center gap-4">
        <Icon className={cn("w-6 h-6 mr-2", color)} />
        <span className="text-cyan-500 font-bold group-hover:underline">
          {title}
        </span>
      </div>
      {type === TopicType.QUIZ && (
        <QuizReviewNumber
          assigned={assigned}
          studentResponse={studentResponses}
        />
      )}
      {type === TopicType.ASSIGNMENT && (
        <AssignmentReviewNumber
          assigned={assigned}
          studentResponse={studentResponses}
        />
      )}
    </div>
  );
}
