import {
  AssignmentResponseData,
  StudentResponse,
} from "@/models/student-response";
import { User } from "@/models/user";
import { convertCloudinaryFilesToRequestData } from "../cloudinary-file/cloudinary-file";

export const convertAssignmentResponseToRequestData = (
  assignmentResponse: StudentResponse
) => {
  const { submittedAt, files, mark, note } =
    assignmentResponse.data as AssignmentResponseData;
  return {
    ...assignmentResponse,
    submittedAt,
    cloudinaryFiles: convertCloudinaryFilesToRequestData(files),
    mark,
    note,
  };
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
