import { cn } from "@/lib/utils";
import { ChoiceQuestion } from "@/models/question";
import { useEffect, useMemo, useState } from "react";
import MultipleChoiceAnswer from "./multiple-choice-answer";
import SingleChoiceAnswer from "./single-choice-answer";

interface Props {
  question: ChoiceQuestion;
  showCorrectAnswer?: boolean;
  onMarkChange?: (mark: number) => void;
  onAnswerSelected?: (hasAnswered: boolean) => void;
}
const ChoicesDisplay = ({
  question,
  onMarkChange,
  showCorrectAnswer,
  onAnswerSelected,
}: Props) => {
  const { choices, multiple, defaultMark } = question;
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const correctAnswerIndexes = useMemo(() => {
    return choices
      .filter((choice) => choice.gradePercent > 0)
      .map((choice) => choices.indexOf(choice));
  }, [choices]);

  const calcullateMultipleChoiceMark = (selectedIndexes: number[]) => {
    let mark = 0;
    //if all the correct answers are selected -> full mark

    const totalCorrectPercentage = selectedIndexes.reduce(
      (acc, index) => acc + choices[index].gradePercent,
      0
    );
    const isAllCorrectAnswersSelected = totalCorrectPercentage === 100;
    if (isAllCorrectAnswersSelected) mark = defaultMark;
    else {
      //calculate total percentage of correct answers
      console.log("total percent", totalCorrectPercentage);
      //calculate the mark
      mark = Math.round((defaultMark * totalCorrectPercentage) / 100);
    }
    return mark;
  };

  const calculateSingleChoiceMark = (selectedIndexes: number[]) => {
    if (selectedIndexes.length > 0) {
      // Get the selected answer and calculate the mark
      const selectedAnswer = choices[selectedIndexes[0]];
      const mark = (defaultMark * selectedAnswer.gradePercent) / 100;
      return mark;
    }
    return 0;
  };

  const handleSelectSingleAnswer = (answerIndex: number) => {
    const newSelectedIndexes = [answerIndex];
    setSelectedIndexes(newSelectedIndexes);

    //Calculate the mark when the user answers the question
    let mark = calculateSingleChoiceMark(newSelectedIndexes);
    if (onMarkChange) onMarkChange(mark);

    //Let the navigation know that the user has answered the question or not
    if (onAnswerSelected) onAnswerSelected(true);
  };

  const handleSelectMultipleAnswer = (answerIndex: number) => {
    const newSelectedIndexes = [...selectedIndexes];

    if (selectedIndexes.includes(answerIndex))
      newSelectedIndexes.splice(selectedIndexes.indexOf(answerIndex), 1);
    else newSelectedIndexes.push(answerIndex);

    setSelectedIndexes(newSelectedIndexes);

    let mark = calcullateMultipleChoiceMark(newSelectedIndexes);
    if (onMarkChange) onMarkChange(mark);

    //Let the navigation know that the user has answered the question or not
    if (onAnswerSelected) onAnswerSelected(newSelectedIndexes.length > 0);
  };

  const grid2 = "grid grid-cols-2";
  const grid4 = "grid grid-cols-4";
  const rowLayout = "flex flex-col";
  const maxLength = choices
    .map((choice) => choice.text.length)
    .reduce((a, b) => Math.max(a, b), 0);

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
              onSelect={handleSelectMultipleAnswer}
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
            onSelect={handleSelectSingleAnswer}
          >
            {choice.text}
          </SingleChoiceAnswer>
        );
      })}
    </div>
  );
};

export default ChoicesDisplay;
