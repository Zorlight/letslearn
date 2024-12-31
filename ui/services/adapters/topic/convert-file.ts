import { FileTopic } from "@/models/topic";
import { convertCloudinaryFileToRequestData } from "../cloudinary-file/cloudinary-file";

export const convertFileToRequestData = (file: FileTopic) => {
  console.log("File", file);
  const { id, data } = file;
  const cloudinaryFileToReq =
    data && data.file ? convertCloudinaryFileToRequestData(data.file) : null;
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
  const parsedData = file.data ? JSON.parse(file.data) : null;

  return {
    ...file,
    data: parsedData,
  };
};
