import { cn } from "@/lib/utils";
import { ChoiceQuestion } from "@/models/question";
import { useEffect, useMemo, useState } from "react";
import MultipleChoiceAnswer from "./multiple-choice-answer";
import SingleChoiceAnswer from "./single-choice-answer";

interface Props {
  question: ChoiceQuestion;
  onShowingMark?: (mark: number) => void;
  showCorrectAnswer?: boolean;
}
const ChoicesDisplay = ({
  question,
  onShowingMark,
  showCorrectAnswer,
}: Props) => {
  const { choices, multiple, defaultMark } = question;
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const correctAnswerIndexes = useMemo(() => {
    return choices
      .filter((choice) => choice.gradePercent > 0)
      .map((choice) => choices.indexOf(choice));
  }, [choices]);

  const maxLength = choices
    .map((choice) => choice.text.length)
    .reduce((a, b) => Math.max(a, b), 0);

  const handleSelectAnswer = (answerIndex: number) => {
    // If single answer is allowed, update selected index
    if (!multiple) {
      setSelectedIndexes([answerIndex]);
    }
    // If multiple answers are allowed, update selected indexes
    else {
      const newSelectedIndexes = [...selectedIndexes];

      if (selectedIndexes.includes(answerIndex))
        newSelectedIndexes.splice(selectedIndexes.indexOf(answerIndex), 1);
      else newSelectedIndexes.push(answerIndex);

      setSelectedIndexes(newSelectedIndexes);
    }
  };

  // Calculate the mark when the correct answer is shown
  useEffect(() => {
    if (showCorrectAnswer && onShowingMark) {
      // Calculate the mark based on the selected indexes
      let mark = 0;
      if (multiple) {
        //if all the correct answers are selected -> full mark
        const isAllCorrectAnswersSelected = correctAnswerIndexes.every(
          (index) => selectedIndexes.includes(index)
        );
        if (isAllCorrectAnswersSelected) mark = defaultMark;
        else {
          //calculate total percentage of correct answers
          const totalCorrectPercentage = selectedIndexes.reduce(
            (acc, index) => acc + choices[index].gradePercent,
            0
          );
          //calculate the mark
          mark = Math.round(
            (totalCorrectPercentage / correctAnswerIndexes.length) * defaultMark
          );
        }
      } else {
        if (selectedIndexes.length > 0) {
          // Get the selected answer and calculate the mark
          const selectedAnswer = choices[selectedIndexes[0]];
          mark = defaultMark * selectedAnswer.gradePercent;
        }
      }
      onShowingMark(mark);
    }
  }, [
    showCorrectAnswer,
    selectedIndexes,
    choices,
    onShowingMark,
    defaultMark,
    correctAnswerIndexes,
    multiple,
  ]);

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
      {choices.map((choice, index) => {
        if (multiple) {
          return (
            <MultipleChoiceAnswer
              key={index}
              answerIndex={index}
              selectedIndexes={selectedIndexes}
              correctAnswerIndexed={correctAnswerIndexes}
              showCorrectAnswer={showCorrectAnswer}
              onSelect={handleSelectAnswer}
            >
              {choice.text}
            </MultipleChoiceAnswer>
          );
        }
        return (
          <SingleChoiceAnswer
            key={index}
            answerIndex={index}
            selectedIndexes={selectedIndexes}
            correctAnswerIndexes={correctAnswerIndexes}
            showCorrectAnswer={showCorrectAnswer}
            onSelect={handleSelectAnswer}
          >
            {choice.text}
          </SingleChoiceAnswer>
        );
      })}
    </div>
  );
};

export default ChoicesDisplay;
