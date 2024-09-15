export enum ResponseType {
  QUIZ = "quiz",
  ASSIGNMENT = "assignment",
  CHOICE = "choice",
}

export interface StudentResponse {
  studentId: string;
  studentName: string;
  type: ResponseType;
}

export interface QuizResponse extends StudentResponse {
  type: ResponseType.QUIZ;
}

export interface AssignmentResponse extends StudentResponse {
  type: ResponseType.ASSIGNMENT;
}

export type ChoiceResponseData = {
  option: string;
  studentResponses: string[];
};
export interface ChoiceResponse extends StudentResponse {
  type: ResponseType.CHOICE;
  data: ChoiceResponseData[];
}
