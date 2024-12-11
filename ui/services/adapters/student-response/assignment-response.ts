import {
  AssignmentResponseData,
  QuizResponseData,
  StudentResponse,
} from "@/models/student-response";
import {
  convertQuizResponseAnswerFromResponseData,
  convertQuizResponseAnswerToRequestData,
} from "./quiz-response-answer";
import { User } from "@/models/user";

export const convertAssignmentResponseToRequestData = (
  assignmentResponse: StudentResponse
) => {
  const { topicId, data } = assignmentResponse;
  const { submittedAt, files, mark, note } = data as AssignmentResponseData;
  return {
    id: null,
    topicId,
    submittedAt,
    files,
    mark,
    note,
  };
};

export const convertAssignmentResponseFromResponseData = (
  data: any
): StudentResponse => {
  const { id, topicId, user, submittedAt, files, mark, note } = data;
  const res: StudentResponse = {
    id,
    topicId,
    student: user as User,
    data: {
      submittedAt,
      files,
      mark,
      note,
    },
  };
  return res;
};
