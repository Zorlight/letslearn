//this function is not completed, but still works, check it again before using
const getFile = async (fileUrls: string[]) => {
  const res = await Promise.all(
    fileUrls.map((url) => fetch(url).then((res) => res.blob()))
  );
  const files = res.map((blob, i) => {
    console.log("blob", blob);
    const file = new File([blob], `file-${i}`, { type: blob.type });
    return file;
  });
  console.log("files", files);
  return files;
};

const getPublicIdFromCloudinaryUrl = (url: string) => {
  //E.g: url = http://res.cloudinary.com/dggtc5ucv/image/upload/v1720082993/jlqkd6dqyx4mrbsqhe31.jpg
  // -> public_id = jlqkd6dqyx4mrbsqhe31
  const parts = url.split("/");
  const publicId = parts[parts.length - 1].split(".")[0];
  return publicId;
};

const convertCloudinaryUrlToDownloadUrl = (url: string) => {
  //E.g: url = http://res.cloudinary.com/dggtc5ucv/image/upload/v1720082993/jlqkd6dqyx4mrbsqhe31.jpg
  // -> downloadUrl = http://res.cloudinary.com/dggtc5ucv/image/upload/fl_attachment/v1720082993/jlqkd6dqyx4mrbsqhe31.jpg
  //Add /fl_attachment/ after /upload/ in the url
  const parts = url.split("/upload/");
  return `${parts[0]}/upload/fl_attachment/${parts[1]}`;
};

export {
  getFile,
  getPublicIdFromCloudinaryUrl,
  convertCloudinaryUrlToDownloadUrl,
};
