"use client";
import { Question } from "@/models/question";
import { useState } from "react";
import TrueFalseQuestionUI from "../../_components/true-false-question/true-false-question-ui";

export default function TrueFalseQuestionCreatePage() {
  const [question, setQuestion] = useState<Question | undefined>();
  return (
    <div className="w-full h-screen default-scrollbar p-5">
      <TrueFalseQuestionUI question={question} />
    </div>
  );
}
