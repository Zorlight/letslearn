import { cn } from "@/lib/utils";
import { ChoiceQuestion, Question } from "@/models/question";
import { QuizAnswer } from "@/models/student-response";
import { useMemo, useState } from "react";
import MultipleChoiceAnswer from "./multiple-choice-answer";
import SingleChoiceAnswer from "./single-choice-answer";

interface Props {
  question: Question;
  showCorrectAnswer?: boolean;
  studentAnswer?: string;
  onQuizAnswerChange?: (quizAnswer: QuizAnswer) => void;
}
const ChoicesDisplay = ({
  question,
  showCorrectAnswer,
  studentAnswer,
  onQuizAnswerChange,
}: Props) => {
  //e.g: answer = "1010" -> muliple choice and A and C are selected -> [0, 2]
  //e.g: answer = "1" -> single choice and B is selected (0 -> A, 1 -> B, 2 -> C, 3 -> D) -> [1]
  const handleGetMultipleChoiceAnswer = (answer: string | undefined) => {
    if (!answer) return [];
    const answerArray = answer.split("");
    return answerArray.reduce((acc, value, index) => {
      if (value === "1") acc.push(index);
      return acc;
    }, [] as number[]);
  };

  const handleGetSingleChoiceAnswer = (answer: string | undefined) => {
    return answer ? [parseInt(answer)] : [];
  };

  const { defaultMark, data } = question;
  const { choices, multiple } = data as ChoiceQuestion;
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>(
    multiple
      ? handleGetMultipleChoiceAnswer(studentAnswer)
      : handleGetSingleChoiceAnswer(studentAnswer)
  );
  const correctAnswerIndexes = useMemo(() => {
    return choices
      .filter((choice) => choice.gradePercent > 0)
      .map((choice) => choices.indexOf(choice));
  }, [choices]);

  const calculateMultipleChoiceMark = (selectedIndexes: number[]) => {
    let mark = 0;
    //if all the correct answers are selected -> full mark

    const totalCorrectPercentage = selectedIndexes.reduce(
      (acc, index) => acc + choices[index].gradePercent,
      0
    );
    const isAllCorrectAnswersSelected = totalCorrectPercentage === 100;
    if (isAllCorrectAnswersSelected || totalCorrectPercentage >= 100)
      mark = defaultMark;
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
    //Let the navigation know that the user has answered the question or not
    const answer = answerIndex.toString();
    const updatedQuizAnswer: QuizAnswer = {
      answer,
      mark,
      question,
    };
    if (onQuizAnswerChange) onQuizAnswerChange(updatedQuizAnswer);
  };

  const handleSelectMultipleAnswer = (answerIndex: number) => {
    const newSelectedIndexes = [...selectedIndexes];

    if (selectedIndexes.includes(answerIndex))
      newSelectedIndexes.splice(selectedIndexes.indexOf(answerIndex), 1);
    else newSelectedIndexes.push(answerIndex);

    setSelectedIndexes(newSelectedIndexes);

    let mark = calculateMultipleChoiceMark(newSelectedIndexes);

    //Let the navigation know that the user has answered the question or not
    //the answer is A , B and C -> "1110"
    //the answer is A and C -> "1010"
    //the answer is B and D -> "0101"
    //the answer is A -> "1000"
    let answer = "";
    if (newSelectedIndexes.length !== 0) {
      choices.forEach((_, index) => {
        if (newSelectedIndexes.includes(index)) answer += "1";
        else answer += "0";
      });
    }
    const updatedQuizAnswer: QuizAnswer = {
      answer,
      mark,
      question,
    };
    if (onQuizAnswerChange) onQuizAnswerChange(updatedQuizAnswer);
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
