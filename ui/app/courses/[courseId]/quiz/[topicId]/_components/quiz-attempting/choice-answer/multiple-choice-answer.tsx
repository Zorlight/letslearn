"use client";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Circle, CircleCheckBig } from "lucide-react";
import React, { useEffect, useState } from "react";

const answerVariants = cva(
  "flex flex-row items-center gap-3 py-2 px-3 rounded-md cursor-pointer transition-all duration-200 border border-transparent",
  {
    variants: {
      variant: {
        default: "bg-slate-100 hover:bg-blue-100 text-slate-600", // when not select and not show correct answer
        selected: "bg-cyan-600 text-white shadow-md", // when select and not show correct answer
        correct: "bg-white text-slate-600 border-green-500", // when select and show correct answer and correct
        incorrect: "bg-white text-slate-600 border-red-500", // when select and show correct answer and incorrect
        missing: "bg-white text-slate-600 border-orange-500", // when not select and show correct answer and this is correct answer
        notSelected: "bg-white text-slate-600 border-slate-200", // when not select and show correct answer and this is incorrect answer
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
  correctAnswerIndexed: number[];
  showCorrectAnswer?: boolean;
  children: React.ReactNode;
  variant?: Variant;
  onSelect?: (index: number) => void;
}
const MultipleChoiceAnswer = ({
  answerIndex,
  selectedIndexes,
  correctAnswerIndexed,
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
  const isCorrect = correctAnswerIndexed.includes(answerIndex);
  const isMissing = correctAnswerIndexed.includes(answerIndex) && !isSelected;

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
      <div>
        {state === "default" && <Circle size={16} className="text-cyan-600" />}
        {state === "selected" && (
          <CircleCheckBig size={16} className="text-white" />
        )}
        {state === "correct" && (
          <CircleCheckBig size={16} className="text-cyan-600" />
        )}
        {state === "incorrect" && (
          <CircleCheckBig size={16} className="text-cyan-600" />
        )}
        {state === "missing" && <Circle size={16} className="text-cyan-600" />}
        {state === "notSelected" && (
          <Circle size={16} className="text-cyan-600" />
        )}
      </div>
      <p className="font-semibold">{children}</p>
      {state === "correct" && <span className="text-green-500">✓</span>}
      {state === "missing" && <span className="text-orange-500">✓</span>}
      {state === "incorrect" && <span className="text-red-500">✗</span>}
    </div>
  );
};

export default MultipleChoiceAnswer;
