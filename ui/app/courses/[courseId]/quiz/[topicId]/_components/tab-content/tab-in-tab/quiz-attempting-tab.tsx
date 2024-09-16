"use client";
import { fakeQuestions } from "@/fake-data/question";
import MultipleChoiceAnswer from "../../quiz-attempting/choice-answer";
import QuestionDisplay from "../../quiz-attempting/question-display";
import { Separator } from "@/lib/shadcn/separator";
import { useState } from "react";
import { Button } from "@/lib/shadcn/button";

const QuizAttemptingTab = () => {
  const totalQuestions = fakeQuestions.length;
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      {fakeQuestions.map((question, index) => (
        <QuestionDisplay
          key={index}
          questionOrder={index + 1}
          totalQuestions={totalQuestions}
          question={question}
          showCorrectAnswer={showCorrectAnswer}
        />
      ))}
      <Button
        variant="default"
        onClick={() => setShowCorrectAnswer(!showCorrectAnswer)}
      >
        {showCorrectAnswer ? "Hide" : "Show"} correct answer
      </Button>
    </div>
  );
};

export default QuizAttemptingTab;
