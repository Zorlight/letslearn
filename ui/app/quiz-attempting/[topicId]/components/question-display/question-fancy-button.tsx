"use client";
import useBubbleAnimation from "@/hooks/useBubbleAnimation/useBubbleAnimation";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  onClick?: () => void;
}
const QuestionFancyButton = ({ children, className, onClick }: Props) => {
  const { handleMouseEnter, handleMouseOut, bubbleClassName } =
    useBubbleAnimation();

  return (
    <div
      className={cn(
        "px-4 py-2 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-sm transition-all duration-200",
        bubbleClassName,
        className
      )}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseOut={handleMouseOut}
    >
      <div className="flex flex-row items-center gap-1 text-white font-semibold pointer-events-none">
        {children}
      </div>
    </div>
  );
};

export default QuestionFancyButton;
