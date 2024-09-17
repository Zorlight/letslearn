import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  questionIndex: number;
  isFlagged?: boolean;
  onClick?: () => void;
}
const QuestionBlock = ({ questionIndex, isFlagged, onClick }: Props) => {
  return (
    <div
      className="relative w-8 h-8 rounded-md overflow-hidden flex items-center justify-center bg-slate-100 text-slate-400 hover:bg-slate-200 transition-all duration-200 cursor-pointer"
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
