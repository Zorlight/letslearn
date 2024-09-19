"use client";
import { ShortAnswerQuestion } from "@/models/question";
import React, { useEffect, useState } from "react";
import ShortAnswer from "./short-answer";

interface Props {
  question: ShortAnswerQuestion;
  showCorrectAnswer?: boolean;
  onMarkChange?: (mark: number) => void;
  onAnswerSelected?: (hasAnswered: boolean) => void;
}
const ShortAnswerDisplay = ({
  question,
  showCorrectAnswer,
  onMarkChange,
  onAnswerSelected,
}: Props) => {
  const { choices, defaultMark } = question;
  const correctAnswers = question.choices.map((choice) => choice.text);
  const [answer, setAnswer] = useState<string>("");
  const handleAnswerChange = (value: string) => {
    setAnswer(value);

    // Calculate mark
    const mark = calculateMark(value);
    if (onMarkChange) onMarkChange(mark);
    if (onAnswerSelected) onAnswerSelected(value.length > 0);
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
