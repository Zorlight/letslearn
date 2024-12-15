import {
  AssignmentResponseData,
  StudentResponse,
} from "@/models/student-response";
import { convertCloudinaryFilesToRequestData } from "../cloudinary-file/cloudinary-file";

export const convertAssignmentResponseToRequestData = (
  assignmentResponse: StudentResponse
) => {
  const { id, data, topicId } = assignmentResponse;
  const { submittedAt, files, mark, note } = data as AssignmentResponseData;
  return {
    id: id.length === 4 ? null : id,
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
