import { Question } from "./question";

export type Quiz = {
  id: string;
  name: string;
  description: string;
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
  gradeToPass: number;
  gradingMethod: string;
  attemptAllowed: string;
  questions: Question[];
};
