import {
  AssignmentResponseData,
  StudentResponse,
} from "@/models/student-response";
import { User } from "@/models/user";
import { convertCloudinaryFilesToRequestData } from "../cloudinary-file/cloudinary-file";

export const convertAssignmentResponseToRequestData = (
  assignmentResponse: StudentResponse
) => {
  const { topicId, data } = assignmentResponse;
  const { submittedAt, files, mark, note } = data as AssignmentResponseData;
  return {
    id: null,
    topicId,
    submittedAt,
    cloudinaryFiles: convertCloudinaryFilesToRequestData(files),
    mark,
    note,
  };
};

export const convertAssignmentResponseFromResponseData = (
  data: any
): StudentResponse => {
  const { id, topicId, user, submittedAt, cloudinaryFiles, mark, note } = data;
  const res: StudentResponse = {
    id,
    topicId,
    student: user as User,
    data: {
      submittedAt,
      files: cloudinaryFiles,
      mark,
      note,
    },
  };
  return res;
};
