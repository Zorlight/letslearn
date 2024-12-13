import { QuizResponseData, StudentResponse } from "@/models/student-response";
import {
  convertQuizResponseAnswerFromResponseData,
  convertQuizResponseAnswerToRequestData,
} from "./quiz-response-answer";
import { User } from "@/models/user";

export const convertQuizResponseToRequestData = (
  quizResponse: StudentResponse
) => {
  const { topicId, data } = quizResponse;
  const { answers, status, completedAt, startedAt } = data as QuizResponseData;
  return {
    id: null,
    topicId,
    status,
    startedAt,
    completedAt,
    answers: answers.map(convertQuizResponseAnswerToRequestData),
  };
};

export const convertQuizResponseFromResponseData = (
  data: any
): StudentResponse => {
  const { id, topicId, student, status, startedAt, completedAt, answers } =
    data;
  const res: StudentResponse = {
    id,
    topicId,
    student,
    data: {
      status,
      startedAt,
      completedAt,
      answers: answers.map(convertQuizResponseAnswerFromResponseData),
    },
  };
  return res;
};
