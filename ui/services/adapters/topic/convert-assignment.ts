import { AssignmentTopic } from "@/models/topic";
import { convertAssignmentResponseFromResponseData } from "../student-response/assignment-response";

export const convertAssignmentToRequestData = (assignment: AssignmentTopic) => {
  const { id, data } = assignment;
  return {
    ...assignment,
    id: id.length === 4 ? null : id,
    data: data ? JSON.stringify(data) : null,
  };
};

export const convertAssignmentFromResponseData = (
  assignment: any
): AssignmentTopic => {
  const parsedData = JSON.parse(assignment.data);
  const parsedResponse = JSON.parse(assignment.response);

  return {
    ...assignment,
    data: parsedData,
    response: parsedResponse
      ? convertAssignmentResponseFromResponseData(parsedResponse)
      : undefined,
  };
};
