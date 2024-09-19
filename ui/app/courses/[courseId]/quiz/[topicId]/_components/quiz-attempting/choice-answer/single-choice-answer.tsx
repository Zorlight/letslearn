"use client";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { useEffect, useState } from "react";
import { answerKeys } from "../../static-data";

const answerVariants = cva(
  "flex flex-row items-center gap-3 py-2 px-3 rounded-md cursor-pointer transition-all duration-200 border border-transparent",
  {
    variants: {
      variant: {
        default:
          "bg-slate-100 hover:bg-blue-100 hover:text-cyan-600 text-slate-600",
        selected: "bg-cyan-600 text-white shadow-md",
        correct: "bg-white text-slate-600 border-green-500",
        incorrect: "bg-white text-slate-600 border-red-500",
        missing: "bg-white text-slate-600 border-yellow-500",
        notSelected: "bg-white text-slate-600 border-slate-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type Variant =
  | "default"
  | "selected"
  | "correct"
  | "incorrect"
  | "missing"
  | "notSelected";

interface Props extends VariantProps<typeof answerVariants> {
  answerIndex: number;
  selectedIndexes: number[];
  correctAnswerIndexes: number[];
  showCorrectAnswer?: boolean;
  children: React.ReactNode;
  variant?: Variant;
  onSelect?: (index: number) => void;
}
const SingleChoiceAnswer = ({
  answerIndex,
  selectedIndexes,
  correctAnswerIndexes,
  showCorrectAnswer,
  children,
  variant = "default",
  onSelect,
}: Props) => {
  const [state, setState] = useState(variant);
  const handleSelectAnswer = () => {
    if (showCorrectAnswer) return;
    if (onSelect) onSelect(answerIndex);
  };
  const isSelected = selectedIndexes.includes(answerIndex);
  const isCorrect = correctAnswerIndexes.includes(answerIndex);
  const isMissing = correctAnswerIndexes.includes(answerIndex) && !isSelected;

  useEffect(() => {
    if (showCorrectAnswer) {
      if (isSelected) {
        setState(isCorrect ? "correct" : "incorrect");
      } else {
        setState(isMissing ? "missing" : "notSelected");
      }
    }
  }, [showCorrectAnswer, isSelected, isCorrect, isMissing]);

  useEffect(() => {
    if (showCorrectAnswer) return;
    setState(isSelected ? "selected" : "default");
  }, [isSelected, showCorrectAnswer]);

  return (
    <div
      className={cn(
        answerVariants({ variant: state }),
        showCorrectAnswer && "pointer-events-none"
      )}
      onClick={handleSelectAnswer}
    >
      <div
        className={cn(
          "px-2 py-1 rounded-md bg-white font-semibold text-slate-600 transition-all duration-200",
          state === "selected" && "text-cyan-500",
          state === "correct" && " text-white bg-cyan-600",
          state === "incorrect" && "text-white bg-cyan-600",
          state === "missing" && "text-slate-600"
        )}
      >
        {answerKeys[answerIndex]}
      </div>

      <p className="font-semibold">{children}</p>
      {state === "correct" && <span className="text-green-500">✓</span>}
      {state === "missing" && <span className="text-yellow-500">✓</span>}
      {state === "incorrect" && <span className="text-red-500">✗</span>}
    </div>
  );
};

export default SingleChoiceAnswer;
