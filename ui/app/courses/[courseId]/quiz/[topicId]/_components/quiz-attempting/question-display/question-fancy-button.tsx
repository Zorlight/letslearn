import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}
const QuestionFancyButton = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center gap-1 px-4 py-2 text-white font-semibold rounded-md bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
};

export default QuestionFancyButton;
