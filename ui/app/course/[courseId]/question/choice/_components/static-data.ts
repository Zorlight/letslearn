import { ChoiceQuestionGeneralForm } from "./general";
import { ChoiceQuestionAnswerForm } from "./answers";
import { nanoid } from "@reduxjs/toolkit";
import { QuestionChoice, QuestionStatus } from "@/models/question";

export const defaultGeneralSetting: ChoiceQuestionGeneralForm = {
  questionName: "",
  questionText: "",
  questionStatus: QuestionStatus.READY,
  defaultMark: 1,
  multipleChoice: true,
};

export const defaultChoice: QuestionChoice = {
  id: nanoid(4),
  questionId: nanoid(4),
  text: "",
  gradePercent: 0,
  feedback: "",
};

export const defaultAnswerSetting: ChoiceQuestionAnswerForm = {
  choices: [
    {
      id: nanoid(4),
      text: "Choice 1",
      gradePercent: 100,
      feedback: "",
      questionId: nanoid(4),
    },
    {
      id: nanoid(4),
      text: "Choice 2",
      gradePercent: 100,
      feedback: "",
      questionId: nanoid(4),
    },
    {
      id: nanoid(4),
      text: "Choice 3",
      gradePercent: 100,
      feedback: "",
      questionId: nanoid(4),
    },
  ],
};
