"use client";
import React, { useEffect, useState } from "react";
import { answerKeys } from "../static-data";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const answerVariants = cva(
  "flex flex-row items-center gap-4 py-2 px-6 rounded-md cursor-pointer transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-slate-100 hover:bg-slate-200 text-slate-600",
        selected: "bg-cyan-600 text-white shadow-md",
        correct: "bg-green-500 text-white",
        incorrect: "bg-red-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface Props extends VariantProps<typeof answerVariants> {
  answerIndex: number;
  selectedIndexes: number[];
  isCorrect: boolean;
  showCorrectAnswer?: boolean;
  children: React.ReactNode;
  variant?: "default" | "selected" | "correct" | "incorrect";
  onSelect?: (index: number) => void;
}
const ChoiceAnswer = ({
  answerIndex,
  selectedIndexes,
  isCorrect,
  showCorrectAnswer,
  children,
  variant = "default",
  onSelect,
}: Props) => {
  const [state, setState] = useState(variant);
  const handleSelectAnswer = () => {
    setState("selected");
    if (onSelect) onSelect(answerIndex);
  };

  useEffect(() => {
    if (showCorrectAnswer) {
      const newState = isCorrect ? "correct" : "incorrect";
      setState(newState);
    }
  }, [showCorrectAnswer, isCorrect]);

  useEffect(() => {
    if (showCorrectAnswer) return;
    if (selectedIndexes.includes(answerIndex)) setState("selected");
    else setState("default");
  }, [selectedIndexes, answerIndex, showCorrectAnswer]);

  return (
    <div
      className={cn(answerVariants({ variant: state }))}
      onClick={handleSelectAnswer}
    >
      <div className="px-2 py-1 rounded-md bg-white">
        <span
          className={cn(
            "font-semibold text-slate-600 transition-all duration-200",
            state === "selected" && "text-cyan-500",
            state === "correct" && " text-green-600",
            state === "incorrect" && "text-red-600"
          )}
        >
          {answerKeys[answerIndex]}
        </span>
      </div>
      <p className="font-semibold">{children}</p>
    </div>
  );
};

export default ChoiceAnswer;
