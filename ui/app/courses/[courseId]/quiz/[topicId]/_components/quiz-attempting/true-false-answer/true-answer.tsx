"use client";
import React, { useEffect, useState } from "react";
import { answerKeys } from "../../static-data";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { CircleCheckBig } from "lucide-react";

const answerVariants = cva(
  "w-full flex items-center justify-center gap-2 py-2 px-6 rounded-md cursor-pointer transition-all duration-200 bg-green-800 border",
  {
    variants: {
      variant: {
        default: "hover:bg-green-600 text-white/50", // when not select and not show correct answer
        selected: "bg-gradient-to-br from-green-600 to-green-400 text-white", //when select but not show correct answer
        correct: "bg-white text-slate-600 border-green-500", // when select and show correct answer and correct
        incorrect: "bg-white text-slate-600 border-red-500", // when select and show correct answer and incorrect
        notSelected: "bg-white text-slate-600", // when not select and show correct answer and this is not correct answer
        missing: "bg-white text-slate-600 border-orange-500", // when not select and show correct answer and this is correct answer
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface Props extends VariantProps<typeof answerVariants> {
  correctAnswer: boolean;
  selected?: boolean;
  showCorrectAnswer?: boolean;
  onSelect?: () => void;
  variant?:
    | "default"
    | "selected"
    | "correct"
    | "incorrect"
    | "notSelected"
    | "missing";
}
const TrueAnswer = ({
  correctAnswer,
  selected,
  showCorrectAnswer,
  onSelect,
  variant = "default",
}: Props) => {
  const [state, setState] = useState(variant);
  const value = true;
  const isSelected = selected === value;
  const isCorrect = correctAnswer === value;

  const handleSelectAnswer = () => {
    if (showCorrectAnswer) return;
    setState("selected");
    if (onSelect) onSelect();
  };

  useEffect(() => {
    if (showCorrectAnswer) {
      if (isSelected) {
        setState(isCorrect ? "correct" : "incorrect");
      } else {
        setState(isCorrect ? "missing" : "notSelected");
      }
    }
  }, [isCorrect, isSelected, showCorrectAnswer]);

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
      {state === "selected" && (
        <CircleCheckBig size={16} className="text-white" />
      )}
      {state === "correct" && (
        <CircleCheckBig size={16} className="text-cyan-600" />
      )}
      {state === "incorrect" && (
        <CircleCheckBig size={16} className="text-cyan-600" />
      )}
      <span>True</span>
      {state === "correct" && <span className="text-green-500">✓</span>}
      {state === "missing" && <span className="text-orange-500">✓</span>}
      {state === "incorrect" && <span className="text-red-500">✗</span>}
    </div>
  );
};

export default TrueAnswer;
