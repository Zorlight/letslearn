import { GET } from "@/lib/http-handle/http-handle";
import {
  AssignmentOverallReport,
  AssignmentReport,
  QuizOverallReport,
  QuizReport,
  StudentReport,
} from "@/models/report";

export const getQuizReport = (
  topicId: string,
  courseId: string,
  onSuccess: (data: QuizReport) => void,
  onFail: (err?: any) => void
) => {
  const url = `/course/${courseId}/topic/${topicId}/quiz-report`;
  GET(url, onSuccess, onFail);
};

export const getQuizOverallReport = (
  courseId: string,
  startTime: string,
  endTime: string,
  onSuccess: (data: QuizOverallReport) => void,
  onFail: (err?: any) => void
) => {
  const url = `/course/${courseId}/quiz-report?startTime=${startTime}&endTime=${endTime}`;
  GET(url, onSuccess, onFail);
};

export const getAssignmentReport = (
  topicId: string,
  courseId: string,
  onSuccess: (data: AssignmentReport) => void,
  onFail: (err?: any) => void
) => {
  const url = `/course/${courseId}/topic/${topicId}/assignment-report`;
  GET(url, onSuccess, onFail);
};

export const getAssignmentOverallReport = (
  courseId: string,
  startTime: string,
  endTime: string,
  onSuccess: (data: AssignmentOverallReport) => void,
  onFail: (err?: any) => void
) => {
  const url = `/course/${courseId}/assignment-report?startTime=${startTime}&endTime=${endTime}`;
  GET(url, onSuccess, onFail);
};

export const getStudentReport = (
  courseId: string,
  startTime: string,
  endTime: string,
  onSuccess: (data: StudentReport) => void,
  onFail: (err?: any) => void
) => {
  const url = `/user/me/report?courseId=${courseId}&start=${startTime}&end=${endTime}`;
  GET(url, onSuccess, onFail);
};
