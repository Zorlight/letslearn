import {
  QuestionStatus,
  QuestionType,
} from "@/app/courses/[courseId]/quiz/[topicId]/_components/static-data";

export type Question = {
  id: string;
  questionName: string;
  questionText: string;
  status: QuestionStatus;
  type: QuestionType;
  defaultMark: number;
  createdBy: string;
  createdAt: string;
  modifiedAt: string;
  modifiedBy: string;
  usage: number;
  data: TrueFalseQuestion | ChoiceQuestion | ShortAnswerQuestion;
};

export type TrueFalseQuestion = {
  correctAnswer: boolean;
  feedbackOfTrue: string;
  feedbackOfFalse: string;
};

export type QuestionChoice = {
  text: string;
  gradePercent: number;
  feedback: string;
};

export type ChoiceQuestion = {
  multiple: boolean;
  choices: QuestionChoice[];
};

export type ShortAnswerQuestion = {
  choices: QuestionChoice[];
};
