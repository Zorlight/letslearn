import {
  AssignmentResponseData,
  StudentResponse,
} from "@/models/student-response";
import { convertCloudinaryFilesToRequestData } from "../cloudinary-file/cloudinary-file";

export const convertAssignmentResponseToRequestData = (
  assignmentResponse: StudentResponse
) => {
  const { id, data, topicId, student } = assignmentResponse;
  const { submittedAt, files, mark, note } = data as AssignmentResponseData;
  let req: any = {
    id: id.length === 4 ? null : id,
    topicId,
    submittedAt,
    cloudinaryFiles: convertCloudinaryFilesToRequestData(files),
    mark,
    note,
  };
  // if id is 4 characters, it means it is a new response
  if (id.length !== 4) req["student"] = student;
  return req;
};

export const convertAssignmentResponseFromResponseData = (
  data: any
): StudentResponse => {
  const { id, topicId, student, submittedAt, cloudinaryFiles, mark, note } =
    data;
  const res: StudentResponse = {
    id,
    topicId,
    student,
    data: {
      submittedAt,
      files: cloudinaryFiles,
      mark,
      note,
    },
  };
  return res;
};
