"use client";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { CircleCheckBig } from "lucide-react";
import { useEffect, useState } from "react";

const answerVariants = cva(
  "w-full flex items-center justify-center gap-2 py-2 px-6 rounded-md cursor-pointer transition-all duration-300 bg-slate-100 text-slate-600 border border-transparent",
  {
    variants: {
      variant: {
        default: "hover:bg-blue-100 hover:text-cyan-600 text-slate-600", // when not select and not show correct answer
        selected: "bg-cyan-600 text-white", //when select but not show correct answer
        correct: "bg-white text-slate-600 border-green-500", // when select and show correct answer and correct
        incorrect: "bg-white text-slate-600 border-red-500", // when select and show correct answer and incorrect
        notSelected: "bg-white text-slate-600 border-slate-200", // when not select and show correct answer and this is not correct answer
        missing: "bg-white text-slate-600 border-yellow-500", // when not select and show correct answer and this is correct answer
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
const FalseAnswer = ({
  correctAnswer,
  selected,
  showCorrectAnswer,
  onSelect,
  variant = "default",
}: Props) => {
  const [state, setState] = useState(variant);
  const value = false;
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
      <span>False</span>
      {state === "correct" && <span className="text-green-500">✓</span>}
      {state === "missing" && <span className="text-yellow-500">✓</span>}
      {state === "incorrect" && <span className="text-red-500">✗</span>}
    </div>
  );
};

export default FalseAnswer;
