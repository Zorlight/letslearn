import { Separator } from "@/lib/shadcn/separator";
import React from "react";
import { QuestionType } from "../static-data";

interface Props {
  questionOrder: number;
  totalQuestions: number;
  questionType: QuestionType;
  description?: string;
  children: React.ReactNode;
}
const QuestionDisplay = ({
  questionOrder,
  totalQuestions,
  questionType,
  description,
  children,
}: Props) => {
  return (
    <div className="flex flex-row items-center gap-4 py-2 px-6 border rounded-md">
      <div className="flex flex-col items-center text-gray-400 text-sm font-semibold">
        <span className="text-indigo-950">{questionOrder}</span>
        <Separator />
        <span>{totalQuestions}</span>
      </div>
      <p className="text-gray-500 font-semibold">{children}</p>
    </div>
  );
};

export default QuestionDisplay;
