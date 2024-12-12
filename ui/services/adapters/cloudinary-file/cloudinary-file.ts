import { CloudinaryFile } from "@/models/cloudinary-file";

export const convertCloudinaryFileToRequestData = (file: CloudinaryFile) => {
  const { id, name, displayUrl, downloadUrl } = file;
  return {
    id: id.length === 4 ? null : id,
    name,
    displayUrl,
    downloadUrl,
  };
};

export const convertCloudinaryFilesToRequestData = (
  files: CloudinaryFile[]
) => {
  return files.map((file) => convertCloudinaryFileToRequestData(file));
};
