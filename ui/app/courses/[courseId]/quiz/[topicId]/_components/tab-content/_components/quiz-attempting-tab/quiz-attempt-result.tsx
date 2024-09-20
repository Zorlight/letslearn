import { cn, formatDate, getDurationBySecond } from "@/lib/utils";
import { QuizResponse } from "@/models/student-response";
import { format } from "date-fns";
import React from "react";

interface Props {
  responseIndex?: number;
  quizResponse: QuizResponse;
}
const QuizAttemptResult = ({ quizResponse, responseIndex }: Props) => {
  const { startedAt, completedAt, mark, totalMark, status } = quizResponse;

  const duration = getDurationBySecond(startedAt, completedAt) || 0;
  const formatDetailDate = (date: string) => {
    return format(new Date(date), "EEEE, dd MMMM yyyy, h:mm:ss a");
  };
  const isExcellentMark = mark >= totalMark * 0.8;
  const isGoodMark = mark >= totalMark * 0.4 && mark < totalMark * 0.8;
  const isBadMark = mark < totalMark * 0.4;

  return (
    <div className="flex flex-col border rounded-lg">
      {responseIndex !== undefined && (
        <h5 className="text-orange-500 px-4 py-2">{`Attempt ${
          responseIndex + 1
        }`}</h5>
      )}
      <ResultRow title="Status">{status}</ResultRow>
      <ResultRow title="Started">{formatDetailDate(startedAt)}</ResultRow>
      <ResultRow title="Completed">{formatDetailDate(completedAt)}</ResultRow>
      <ResultRow title="Duration">{`${duration}`}</ResultRow>
      <ResultRow title="Mark">
        <span
          className={cn(
            "font-bold",
            isExcellentMark && "text-green-500",
            isGoodMark && "text-yellow-500",
            isBadMark && "text-red-500"
          )}
        >{`${mark} / ${totalMark}`}</span>
      </ResultRow>
    </div>
  );
};
interface ResultRowProps {
  title: string;
  children: React.ReactNode;
}
const ResultRow = ({ title, children }: ResultRowProps) => {
  return (
    <div className="flex flex-row items-center gap-3 py-2 px-4 odd:bg-gray-100 hover:bg-gray-50">
      <span className="font-semibold max-w-[150px] w-1/2">{title}</span>
      <p className="text-slate-600 text-sm">{children}</p>
    </div>
  );
};

export default QuizAttemptResult;
