import { Question } from "./question";

export enum TestType {
  QUIZ = "quiz",
  ASSIGNMENT = "assignment",
  CHOICE = "choice",
}

export interface Test {
  id: string;
  name: string;
  description: string;
  type: TestType;
  open: {
    enabled: boolean;
    value: string;
  };
  close: {
    enabled: boolean;
    value: string;
  };
  timeLimit: {
    enabled: boolean;
    value: number;
    unit: string;
  };
  data: QuizData | AssignmentData;
}

export type QuizData = {
  gradeToPass: number;
  gradingMethod: string;
  attemptAllowed: string;
  questions: Question[];
};

export type AssignmentData = {};
