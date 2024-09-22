import { useEffect, useState } from "react";
import FalseAnswer from "./false-answer";
import TrueAnswer from "./true-answer";
import { Question, TrueFalseQuestion } from "@/models/question";
import { QuizAnswer } from "@/models/student-response";

interface Props {
  question: Question;
  showCorrectAnswer?: boolean;
  studentAnswer?: string;
  onQuizAnswerChange?: (quizAnswer: QuizAnswer) => void;
}
const TrueFalseChoiceDisplay = ({
  question,
  showCorrectAnswer,
  studentAnswer,
  onQuizAnswerChange,
}: Props) => {
  const { data, defaultMark } = question;
  const { correctAnswer } = data as TrueFalseQuestion;
  const [selected, setSelected] = useState<boolean | undefined>(
    studentAnswer ? studentAnswer === "1" : undefined
  );
  const handleSelectAnswer = (answer: boolean) => {
    setSelected(answer);

    // Calculate mark
    const mark = calculateMark(answer);
    const ans = answer ? "1" : "0";
    const quizAnswer: QuizAnswer = { answer: ans, mark, question };
    if (onQuizAnswerChange) onQuizAnswerChange(quizAnswer);
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
