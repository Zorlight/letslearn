"use client";
import { Separator } from "@/lib/shadcn/separator";
import React, { useState } from "react";
import { QuestionType } from "../static-data";
import { Question } from "@/models/question";
import ChoicesDisplay from "./choice-answer/choices-display";
import TrueFalseChoiceDisplay from "./true-false-answer/true-fale-choice-display";
import { questionDescription } from "./static-data";
import ShortAnswerDisplay from "./short-answer/short-answer-display";

interface Props {
  questionOrder: number;
  totalQuestions: number;
  question: Question;
  description?: string;
  showCorrectAnswer?: boolean;
}
const QuestionDisplay = ({
  questionOrder,
  totalQuestions,
  question,
  description,
  showCorrectAnswer,
}: Props) => {
  const { type } = question;
  const [mark, setMark] = useState<number>(0);
  const handleShowingMark = (mark: number) => {
    setMark(mark);
  };

  let desc;
  if (description) desc = description;
  else if (type === QuestionType.CHOICE) {
    if (question.multiple) desc = questionDescription.MultipleChoice;
    else desc = questionDescription.SingleChoice;
  } else desc = questionDescription[type];
  return (
    <div className="flex flex-col gap-2 p-4 bg-indigo-50 rounded-md">
      {/* Question here */}
      <div className="flex flex-row items-center gap-4 py-2 px-6 border rounded-md bg-white">
        <div className="flex flex-col items-center text-gray-400 text-sm font-semibold">
          <span className="text-indigo-950">{questionOrder}</span>
          <Separator />
          <span>{totalQuestions}</span>
        </div>
        <p className="text-gray-500 font-semibold">{question.questionText}</p>
      </div>
      {/* Description here */}
      <p className="text-slate-600 text-sm">{desc}</p>
      {/* Answer here */}
      {question.type === QuestionType.CHOICE && (
        <ChoicesDisplay
          question={question}
          showCorrectAnswer={showCorrectAnswer}
          onShowingMark={handleShowingMark}
        />
      )}
      {question.type === QuestionType.TRUE_FALSE && (
        <TrueFalseChoiceDisplay
          question={question}
          showCorrectAnswer={showCorrectAnswer}
        />
      )}
      {question.type === QuestionType.SHORT_ANSWER && (
        <ShortAnswerDisplay
          question={question}
          showCorrectAnswer={showCorrectAnswer}
        />
      )}
    </div>
  );
};

export default QuestionDisplay;
