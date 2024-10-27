"use client";
import { QuestionType } from "@/app/course/[courseId]/quiz/[topicId]/components/static-data";
import ChoiceQuestionUI from "@/app/question/_components/choice-question/choice-question-ui";
import ShortAnswerQuestionUI from "@/app/question/_components/short-answer-question/short-answer-question-ui";
import { fakeQuestions } from "@/fake-data/question";
import { notFound } from "next/navigation";
import React, { useMemo } from "react";

interface Props {
  params: {
    questionId: string;
  };
}
export default function ShortAnswerQuestionEditPage({ params }: Props) {
  const { questionId } = params;
  const [questions, setQuestions] = React.useState(fakeQuestions);
  const question = useMemo(() => {
    return questions.find(
      (q) => q.id === questionId && q.type === QuestionType.SHORT_ANSWER
    );
  }, [questions, questionId]);
  if (!question) return notFound();
  return (
    <div className="w-full h-screen default-scrollbar p-5">
      <ShortAnswerQuestionUI question={question} />
    </div>
  );
}
