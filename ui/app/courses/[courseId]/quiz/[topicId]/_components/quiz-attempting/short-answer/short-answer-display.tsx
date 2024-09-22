"use client";
import { ShortAnswerQuestion } from "@/models/question";
import React, { useEffect, useState } from "react";
import ShortAnswer from "./short-answer";
import { QuizAnswer } from "@/models/student-response";

interface Props {
  question: ShortAnswerQuestion;
  showCorrectAnswer?: boolean;
  studentAnswer?: string;
  onQuizAnswerChange?: (quizAnswer: QuizAnswer) => void;
}
const ShortAnswerDisplay = ({
  question,
  showCorrectAnswer,
  studentAnswer,
  onQuizAnswerChange,
}: Props) => {
  const { choices, defaultMark } = question;
  const correctAnswers = question.choices.map((choice) => choice.text);
  const [answer, setAnswer] = useState<string>(studentAnswer || "");
  const handleAnswerChange = (value: string) => {
    setAnswer(value);

    // Calculate mark
    const mark = calculateMark(value);
    const quizAnswer: QuizAnswer = { answer: value, mark, question };
    if (onQuizAnswerChange) onQuizAnswerChange(quizAnswer);
  };

  const calculateMark = (answer: string) => {
    const correctAnswers = choices
      .filter((choice) => choice.text === answer)
      .sort((a, b) => b.gradePercent - a.gradePercent);
    const mark =
      correctAnswers.length > 0
        ? Math.round((defaultMark * correctAnswers[0].gradePercent) / 100)
        : 0;
    return mark;
  };

  return (
    <ShortAnswer
      correctAnswers={correctAnswers}
      showCorrectAnswer={showCorrectAnswer}
      defaultValue={answer}
      onChange={handleAnswerChange}
    />
  );
};

export default ShortAnswerDisplay;
