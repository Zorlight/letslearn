import { QuestionResult } from "@/app/course/[courseId]/quiz/[topicId]/components/static-data";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  questionIndex: number;
  isFlagged?: boolean;
  hasAnswered?: boolean;
  questionResult?: QuestionResult;
  onClick?: () => void;
}
const QuestionBlock = ({
  questionIndex,
  isFlagged,
  hasAnswered,
  questionResult,
  onClick,
}: Props) => {
  return (
    <div
      className={cn(
        "relative w-8 h-8 rounded-md overflow-hidden flex items-center justify-center bg-slate-100 text-slate-400 hover:bg-slate-200 transition-all duration-200 cursor-pointer",
        questionResult === QuestionResult.NOT_SHOW &&
          hasAnswered &&
          "bg-cyan-500 text-white hover:bg-cyan-600",
        questionResult === QuestionResult.FULL_MARK &&
          "bg-green-500 text-white hover:bg-green-600",
        questionResult === QuestionResult.ZERO_MARK &&
          "bg-red-500 text-white hover:bg-red-600",
        questionResult === QuestionResult.PARTIAL_MARK &&
          "bg-yellow-500 text-white hover:bg-yellow-600"
      )}
      onClick={onClick}
    >
      {questionIndex + 1}
      <div
        className={cn(
          "absolute -top-1/4 -right-1/4 w-4 h-4 rotate-45 bg-red-600 transition-all duration-200 opacity-0 pointer-events-none",
          isFlagged && "opacity-100"
        )}
      />
    </div>
  );
};

export default QuestionBlock;
