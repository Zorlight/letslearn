import { GET, POST } from "@/lib/http-handle/http-handle";
import { StudentResponse } from "@/models/student-response";
import {
  convertAssignmentResponseFromResponseData,
  convertAssignmentResponseToRequestData,
} from "./adapters/student-response/assignment-response";

export const createAssignmentResponse = (
  topicId: string,
  assignmentResponse: StudentResponse,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  const reqData = convertAssignmentResponseToRequestData(assignmentResponse);
  const handleSuccess = (data: any) => {
    onSuccess(convertAssignmentResponseFromResponseData(data));
  };
  POST(`/topic/${topicId}/assignment-response`, reqData, handleSuccess, onFail);
};

export const getAssignmentResponses = (
  topicId: string,
  onSuccess: (data: StudentResponse[]) => void,
  onFail: (err?: any) => void
) => {
  const handleSuccess = (data: any) => {
    const assignmentResponses = data.map(
      convertAssignmentResponseFromResponseData
    );
    onSuccess(assignmentResponses);
  };
  GET(`/topic/${topicId}/assignment-response`, handleSuccess, onFail);
};

export const getAssignmentResponse = (
  topicId: string,
  assignmentResponseId: string,
  onSuccess: (data: StudentResponse) => void,
  onFail: (err?: any) => void
) => {
  const handleSuccess = (data: any) => {
    const assignmentResponse = convertAssignmentResponseFromResponseData(data);
    onSuccess(assignmentResponse);
  };
  GET(
    `/topic/${topicId}/assignment-response/${assignmentResponseId}`,
    handleSuccess,
    onFail
  );
};
