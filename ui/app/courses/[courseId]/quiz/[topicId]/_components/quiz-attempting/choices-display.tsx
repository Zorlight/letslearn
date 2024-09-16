import { cn } from "@/lib/utils";
import { QuestionChoice } from "@/models/question";
import { useMemo, useState } from "react";
import ChoiceAnswer from "./choice-answer";

interface Props {
  choices: QuestionChoice[];
  onSelectAnswer?: (answerIndex: number) => void;
  onSelectMultipleAnswers?: (answerIndexes: number[]) => void;
  multiple?: boolean;
}
const ChoicesDisplay = ({
  choices,
  onSelectAnswer,
  onSelectMultipleAnswers,
  multiple,
}: Props) => {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const correctAnswerIndexes = useMemo(() => {
    return choices.filter((choice) => choice.gradePercent > 0);
  }, [choices]);
  const maxLength = choices
    .map((choice) => choice.text.length)
    .reduce((a, b) => Math.max(a, b), 0);

  const handleSelectAnswer = (answerIndex: number) => {
    // If single answer is allowed, update selected index
    if (!multiple) {
      if (onSelectAnswer) onSelectAnswer(answerIndex);
      setSelectedIndexes([answerIndex]);
    }
    // If multiple answers are allowed, update selected indexes
    else {
      const newSelectedIndexes = [...selectedIndexes];

      if (selectedIndexes.includes(answerIndex))
        newSelectedIndexes.splice(selectedIndexes.indexOf(answerIndex), 1);
      else newSelectedIndexes.push(answerIndex);

      if (onSelectMultipleAnswers) onSelectMultipleAnswers(newSelectedIndexes);
      setSelectedIndexes(newSelectedIndexes);
    }
  };

  const grid2 = "grid grid-cols-2";
  const grid4 = "grid grid-cols-4";
  const rowLayout = "flex flex-col";

  return (
    <div
      className={cn(
        (maxLength > 30 || choices.length % 2 != 0) && rowLayout,
        maxLength > 10 && maxLength <= 30 && grid2,
        maxLength <= 10 && grid4,
        "gap-2"
      )}
    >
      {choices.map((choice, index) => (
        <ChoiceAnswer
          key={index}
          answerIndex={index}
          selectedIndexes={selectedIndexes}
          isCorrect={correctAnswerIndexes.includes(choice)}
          showCorrectAnswer={false}
          onSelect={handleSelectAnswer}
        >
          {choice.text}
        </ChoiceAnswer>
      ))}
    </div>
  );
};

export default ChoicesDisplay;
