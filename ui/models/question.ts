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
  updatedAt: string;
  modifiedBy: string;
  usage: number;
}

interface TrueFalseQuestion extends BaseQuestion {
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

interface MultipleChoiceQuestion extends BaseQuestion {
  type: QuestionType.CHOICE;
  multiple: boolean;
  choices: QuestionChoice[];
}

interface ShortAnswerQuestion extends BaseQuestion {
  type: QuestionType.SHORT_ANSWER;
  choices: QuestionChoice[];
}

export type Question =
  | TrueFalseQuestion
  | MultipleChoiceQuestion
  | ShortAnswerQuestion;
