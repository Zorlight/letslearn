import { useState } from "react";
import FalseAnswer from "./false-answer";
import TrueAnswer from "./true-answer";

interface Props {
  correctAnswer: boolean;
  onSelectAnswer?: (answer: boolean) => void;
}
const TrueFalseChoiceDisplay = ({ correctAnswer, onSelectAnswer }: Props) => {
  const [selected, setSelected] = useState<boolean>();
  const handleSelectAnswer = (answer: boolean) => {
    setSelected(answer);
    if (onSelectAnswer) onSelectAnswer(answer);
  };

  return (
    <div className="w-full flex flex-row gap-2">
      <FalseAnswer
        correctAnswer={correctAnswer}
        selected={selected}
        onSelect={() => handleSelectAnswer(false)}
      />
      <TrueAnswer
        correctAnswer={correctAnswer}
        selected={selected}
        onSelect={() => handleSelectAnswer(true)}
      />
    </div>
  );
};

export default TrueFalseChoiceDisplay;
