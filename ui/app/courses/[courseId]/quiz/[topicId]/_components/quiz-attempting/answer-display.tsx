import { Separator } from "@/lib/shadcn/separator";
import React from "react";
import { answerKeys } from "../static-data";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const answerVariants = cva(
  "flex flex-row items-center gap-4 py-2 px-6 rounded-md cursor-pointer transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-slate-100 hover:bg-slate-50 text-slate-600",
        selected: "bg-cyan-600 text-white",
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
  children: React.ReactNode;
  variant?: "default" | "selected" | "correct" | "incorrect";
}
const AnswerDisplay = ({
  answerIndex,
  children,
  variant = "default",
}: Props) => {
  return (
    <div
      className={cn(
        answerVariants({ variant }),
        variant === "selected" && "shadow-md"
      )}
    >
      <div className="px-2 py-1 rounded-md bg-white">
        <span
          className={cn(
            "font-semibold",
            variant === "selected" && "text-cyan-500",
            variant === "correct" && " text-green-600",
            variant === "incorrect" && "text-red-600"
          )}
        >
          {answerKeys[answerIndex]}
        </span>
      </div>
      <p className="font-semibold">{children}</p>
    </div>
  );
};

export default AnswerDisplay;
