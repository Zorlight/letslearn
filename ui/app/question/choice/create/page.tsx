"use client";
import React, { useState } from "react";
import ChoiceQuestionUI from "../../_components/choice-question/choice-question-ui";
import { Question } from "@/models/question";

export default function ChoiceQuestionCreatePage() {
  const [question, setQuestion] = useState<Question | undefined>();
  return (
    <div className="w-full h-screen default-scrollbar p-5">
      <ChoiceQuestionUI question={question} />
    </div>
  );
}
