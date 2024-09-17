import { useEffect, useState } from "react";
import FalseAnswer from "./false-answer";
import TrueAnswer from "./true-answer";
import { TrueFalseQuestion } from "@/models/question";

interface Props {
  question: TrueFalseQuestion;
  onShowingMark?: (mark: number) => void;
  showCorrectAnswer?: boolean;
}
const TrueFalseChoiceDisplay = ({
  question,
  onShowingMark,
  showCorrectAnswer,
}: Props) => {
  const { correctAnswer, defaultMark } = question;
  const [selected, setSelected] = useState<boolean>();
  const handleSelectAnswer = (answer: boolean) => {
    setSelected(answer);
  };

  useEffect(() => {
    if (showCorrectAnswer) {
      if (onShowingMark) {
        const mark = selected === correctAnswer ? defaultMark : 0;
        onShowingMark(mark);
      }
    }
  }, [showCorrectAnswer, selected, correctAnswer, onShowingMark, defaultMark]);

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
