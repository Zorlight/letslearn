import { User } from "./user";

export enum ResponseType {
  QUIZ = "quiz",
  ASSIGNMENT = "assignment",
  CHOICE = "choice",
}

export interface BaseStudentResponse {
  id: string;
  student: User;
}

export enum QuizStatus {
  FINISHED = "Finished",
  NOT_FINISHED = "Not finished",
  NOT_STARTED = "Not started",
}

export interface QuizResponse extends BaseStudentResponse {
  type: ResponseType.QUIZ;
  status: QuizStatus;
  startedAt: string;
  completedAt: string;
  mark: number;
  totalMark: number;
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
