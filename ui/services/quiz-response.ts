import { GET, POST } from "@/lib/http-handle/http-handle";
import { StudentResponse } from "@/models/student-response";
import {
  convertQuizResponseFromResponseData,
  convertQuizResponseToRequestData,
} from "./adapters/student-response/quiz-response";

export const createQuizResponse = (
  topicId: string,
  quizResponse: StudentResponse,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  const reqData = convertQuizResponseToRequestData(quizResponse);
  const handleSuccess = (data: any) => {
    onSuccess(convertQuizResponseFromResponseData(data));
  };
  POST(`/topic/${topicId}/quiz-response`, reqData, handleSuccess, onFail);
};

export const getAllQuizResponsesOfTopic = (
  topicId: string,
  onSuccess: (data: StudentResponse[]) => void,
  onFail: (err?: any) => void
) => {
  const handleSuccess = (data: any) => {
    const quizResponses = data.map(convertQuizResponseFromResponseData);
    onSuccess(quizResponses);
  };
  GET(`/topic/${topicId}/quiz-response`, handleSuccess, onFail);
};

export const getAllQuizResponsesOfUser = (
  userId: string,
  onSuccess: (data: StudentResponse[]) => void,
  onFail: (err?: any) => void
) => {
  const handleSuccess = (data: any) => {
    const quizResponses = data.map(convertQuizResponseFromResponseData);
    onSuccess(quizResponses);
  };
  GET(`/user/${userId}/quiz-responses`, handleSuccess, onFail);
};

export const getQuizResponse = (
  topicId: string,
  quizResponseId: string,
  onSuccess: (data: StudentResponse) => void,
  onFail: (err?: any) => void
) => {
  const handleSuccess = (data: any) => {
    const quizResponse = convertQuizResponseFromResponseData(data);
    onSuccess(quizResponse);
  };
  GET(
    `/topic/${topicId}/quiz-response/${quizResponseId}`,
    handleSuccess,
    onFail
  );
};
