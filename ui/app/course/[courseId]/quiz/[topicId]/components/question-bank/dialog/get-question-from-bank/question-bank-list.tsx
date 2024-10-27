"use client";
import { Question } from "@/models/question";
import React, { useMemo } from "react";
import QuestionBankRow from "./question-bank-row";

interface Props {
  questions: Question[];
  selectedQuestions: Question[];
  onQuestionCheck?: (question: Question) => void;
}
const QuestionBankList = ({
  questions,
  selectedQuestions,
  onQuestionCheck,
}: Props) => {
  return (
    <div className="w-full">
      {questions.map((question, index) => (
        <QuestionBankRow
          key={index}
          checked={selectedQuestions.some((q) => q.id === question.id)}
          question={question}
          onQuestionCheck={() => onQuestionCheck && onQuestionCheck(question)}
        />
      ))}
    </div>
  );
};

export default QuestionBankList;
