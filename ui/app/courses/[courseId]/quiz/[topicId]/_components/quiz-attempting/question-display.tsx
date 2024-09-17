"use client";
import { Separator } from "@/lib/shadcn/separator";
import { cn } from "@/lib/utils";
import { Question } from "@/models/question";
import { useEffect, useState } from "react";
import { QuestionType } from "../static-data";
import { FlagIcon } from "../tab-content/_components/icons";
import ChoicesDisplay from "./choice-answer/choices-display";
import ShortAnswerDisplay from "./short-answer/short-answer-display";
import { questionDescription } from "./static-data";
import TrueFalseChoiceDisplay from "./true-false-answer/true-fale-choice-display";

enum Result {
  NOT_SHOW = "Not Show",
  FULL_MARK = "Full mark",
  PARTIAL_MARK = "Partial mark",
  ZERO_MARK = "Zero mark",
}

interface Props {
  questionIndex: number;
  totalQuestions: number;
  question: Question;
  description?: string;
  showCorrectAnswer?: boolean;
  isFlagged?: boolean;
  onFlagChange?: () => void;
}
const QuestionDisplay = ({
  questionIndex,
  totalQuestions,
  question,
  description,
  showCorrectAnswer,
  isFlagged,
  onFlagChange,
}: Props) => {
  const { type, defaultMark } = question;
  const [result, setResult] = useState<Result>(Result.NOT_SHOW);
  const handleShowingMark = (mark: number) => {
    if (mark === defaultMark) setResult(Result.FULL_MARK);
    else if (mark === 0) setResult(Result.ZERO_MARK);
    else setResult(Result.PARTIAL_MARK);
  };

  useEffect(() => {
    if (!showCorrectAnswer) setResult(Result.NOT_SHOW);
  }, [showCorrectAnswer]);

  let desc;
  if (description) desc = description;
  else if (type === QuestionType.CHOICE) {
    if (question.multiple) desc = questionDescription.MultipleChoice;
    else desc = questionDescription.SingleChoice;
  } else desc = questionDescription[type];
  const questionId = `question-${questionIndex + 1}`;
  console.log("question id ", questionId);
  return (
    <div id={questionId} className="flex flex-col gap-2">
      {/* Question here */}
      <div
        className={cn(
          "flex flex-row items-center gap-4 py-2 pl-6 pr-4 border border-slate-200 text-slate-600 rounded-md bg-white",
          result !== Result.NOT_SHOW ? "border-transparent" : "",
          result === Result.FULL_MARK ? "bg-green-50 text-green-500" : "",
          result === Result.ZERO_MARK ? "bg-red-50 text-red-500" : "",
          result === Result.PARTIAL_MARK ? "bg-orange-50 text-orange-500" : ""
        )}
      >
        <div className="flex flex-col items-center text-gray-400 text-sm font-semibold">
          <span className="text-cyan-600">{questionIndex + 1}</span>
          <Separator className="bg-indigo-950" />
          <span className="text-orange-600">{totalQuestions}</span>
        </div>
        <p className="font-semibold">{question.questionText}</p>
        <div className="ml-auto cursor-pointer" onClick={onFlagChange}>
          <FlagIcon variant={isFlagged ? "active" : "default"} />
        </div>
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
          onShowingMark={handleShowingMark}
        />
      )}
      {question.type === QuestionType.SHORT_ANSWER && (
        <ShortAnswerDisplay
          question={question}
          showCorrectAnswer={showCorrectAnswer}
          onShowingMark={handleShowingMark}
        />
      )}
    </div>
  );
};

export default QuestionDisplay;
