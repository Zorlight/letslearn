import { useEffect, useState } from "react";
import FalseAnswer from "./false-answer";
import TrueAnswer from "./true-answer";
import { TrueFalseQuestion } from "@/models/question";

interface Props {
  question: TrueFalseQuestion;
  showCorrectAnswer?: boolean;
  onMarkChange?: (mark: number) => void;
  onAnswerSelected?: (hasAnswered: boolean) => void;
}
const TrueFalseChoiceDisplay = ({
  question,
  showCorrectAnswer,
  onMarkChange,
  onAnswerSelected,
}: Props) => {
  const { correctAnswer, defaultMark } = question;
  const [selected, setSelected] = useState<boolean>();
  const handleSelectAnswer = (answer: boolean) => {
    setSelected(answer);

    // Calculate mark
    const mark = calculateMark(answer);
    if (onMarkChange) onMarkChange(mark);
    if (onAnswerSelected) onAnswerSelected(true);
  };

  const calculateMark = (selected: boolean) => {
    if (selected === correctAnswer) return defaultMark;
    return 0;
  };

  return (
    <div className="w-full flex flex-row gap-2">
      <FalseAnswer
        correctAnswer={correctAnswer}
        selected={selected}
        showCorrectAnswer={showCorrectAnswer}
        onSelect={() => handleSelectAnswer(false)}
      />
      <TrueAnswer
        correctAnswer={correctAnswer}
        selected={selected}
        showCorrectAnswer={showCorrectAnswer}
        onSelect={() => handleSelectAnswer(true)}
      />
    </div>
  );
};

export default TrueFalseChoiceDisplay;
