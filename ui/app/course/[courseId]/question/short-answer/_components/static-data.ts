import { ShortAnswerQuestionGeneralForm } from "./general";
import { ShortAnswerQuestionAnswerForm } from "./answers";
import { nanoid } from "@reduxjs/toolkit";
import { QuestionChoice, QuestionStatus } from "@/models/question";

export const dafaultGeneralSetting: ShortAnswerQuestionGeneralForm = {
  questionName: "",
  questionText: "",
  questionStatus: QuestionStatus.READY,
  defaultMark: 1,
};

export const defaultChoice: QuestionChoice = {
  id: nanoid(4),
  questionId: nanoid(4),
  text: "",
  gradePercent: 0,
  feedback: "",
};

export const defaultAnswerSetting: ShortAnswerQuestionAnswerForm = {
  answers: [
    {
      id: nanoid(4),
      text: "Answer",
      gradePercent: 100,
      feedback: "",
      questionId: nanoid(4),
    },
    {
      id: nanoid(4),
      text: "answer",
      gradePercent: 100,
      feedback: "",
      questionId: nanoid(4),
    },
    {
      id: nanoid(4),
      text: "ANSWER",
      gradePercent: 100,
      feedback: "",
      questionId: nanoid(4),
    },
  ],
};
