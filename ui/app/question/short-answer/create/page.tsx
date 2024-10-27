"use client";
import { Question } from "@/models/question";
import { useState } from "react";
import ShortAnswerQuestionUI from "../../_components/short-answer-question/short-answer-question-ui";

export default function ShortAnswerQuestionCreatePage() {
  const [question, setQuestion] = useState<Question | undefined>();
  return (
    <div className="w-full h-screen default-scrollbar p-5">
      <ShortAnswerQuestionUI question={question} />
    </div>
  );
}
