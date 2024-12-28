import { AssignmentTopic, FileTopic } from "@/models/topic";
import { convertAssignmentResponseFromResponseData } from "../student-response/assignment-response";
import { convertCloudinaryFileToRequestData } from "../cloudinary-file/cloudinary-file";

export const convertFileToRequestData = (file: FileTopic) => {
  const { id, data } = file;
  const cloudinaryFileToReq = data.file
    ? convertCloudinaryFileToRequestData(data.file)
    : null;
  const dataToReq = {
    ...data,
    file: cloudinaryFileToReq,
  };
  return {
    ...file,
    id: id.length === 4 ? null : id,
    data: data ? JSON.stringify(dataToReq) : null,
  };
};

export const convertFileFromResponseData = (file: any): FileTopic => {
  const parsedData = JSON.parse(file.data);

  return {
    ...file,
    data: parsedData,
  };
};
