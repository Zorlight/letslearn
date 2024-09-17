"use client";
import { ShortAnswerQuestion } from "@/models/question";
import React, { useEffect, useState } from "react";
import ShortAnswer from "./short-answer";

interface Props {
  question: ShortAnswerQuestion;
  onShowingMark?: (mark: number) => void;
  showCorrectAnswer?: boolean;
}
const ShortAnswerDisplay = ({
  question,
  showCorrectAnswer,
  onShowingMark,
}: Props) => {
  const { choices, defaultMark } = question;
  const correctAnswers = question.choices.map((choice) => choice.text);
  const [answer, setAnswer] = useState<string>("");
  const handleAnswerChange = (value: string) => {
    setAnswer(value);
  };
  useEffect(() => {
    if (showCorrectAnswer && onShowingMark) {
      //mark is equal to the defaultMark * gradePercent of the answer that matches the input value
      const correctAnswers = choices
        .filter((choice) => choice.text === answer)
        .sort((a, b) => b.gradePercent - a.gradePercent);
      const mark =
        correctAnswers.length > 0
          ? Math.round((defaultMark * correctAnswers[0].gradePercent) / 100)
          : 0;
      onShowingMark(mark);
    }
  }, [showCorrectAnswer, choices, onShowingMark, answer, defaultMark]);
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
