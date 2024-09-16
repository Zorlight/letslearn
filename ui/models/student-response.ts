export enum ResponseType {
  QUIZ = "quiz",
  ASSIGNMENT = "assignment",
  CHOICE = "choice",
}

export interface BaseStudentResponse {
  studentId: string;
  studentName: string;
  type: ResponseType;
}

export interface QuizResponse extends BaseStudentResponse {
  type: ResponseType.QUIZ;
}

export interface AssignmentResponse extends BaseStudentResponse {
  type: ResponseType.ASSIGNMENT;
}

export interface ChoiceResponse extends BaseStudentResponse {
  type: ResponseType.CHOICE;
  data: ChoiceResponseData[];
}

export type ChoiceResponseData = {
  option: string;
  studentResponses: string[];
};

export type StudentResponse =
  | QuizResponse
  | AssignmentResponse
  | ChoiceResponse;
