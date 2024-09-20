import {
  QuestionStatus,
  QuestionType,
} from "@/app/courses/[courseId]/quiz/[topicId]/_components/static-data";

interface BaseQuestion {
  id: string;
  questionName: string;
  questionText: string;
  status: QuestionStatus;
  defaultMark: number;
  createdBy: string;
  createdAt: string;
  modifiedAt: string;
  modifiedBy: string;
  usage: number;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: QuestionType.TRUE_FALSE;
  correctAnswer: boolean;
  feedbackOfTrue: string;
  feedbackOfFalse: string;
}

export type QuestionChoice = {
  text: string;
  gradePercent: number;
  feedback: string;
};

export interface ChoiceQuestion extends BaseQuestion {
  type: QuestionType.CHOICE;
  multiple: boolean;
  choices: QuestionChoice[];
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: QuestionType.SHORT_ANSWER;
  choices: QuestionChoice[];
}

export type Question = TrueFalseQuestion | ChoiceQuestion | ShortAnswerQuestion;
