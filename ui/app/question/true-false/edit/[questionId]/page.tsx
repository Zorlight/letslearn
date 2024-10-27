"use client";
import { QuestionType } from "@/app/course/[courseId]/quiz/[topicId]/components/static-data";
import TrueFalseQuestionUI from "@/app/question/_components/true-false-question/true-false-question-ui";
import { fakeQuestions } from "@/fake-data/question";
import { notFound } from "next/navigation";
import React, { useMemo } from "react";

interface Props {
  params: {
    questionId: string;
  };
}
export default function TrueFalseQuestionEditPage({ params }: Props) {
  const { questionId } = params;
  const [questions, setQuestions] = React.useState(fakeQuestions);
  const question = useMemo(() => {
    return questions.find(
      (q) => q.id === questionId && q.type === QuestionType.TRUE_FALSE
    );
  }, [questions, questionId]);
  if (!question) return notFound();
  return (
    <div className="w-full h-screen default-scrollbar p-5">
      <TrueFalseQuestionUI question={question} />
    </div>
  );
}
