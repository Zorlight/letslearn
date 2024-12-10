import { GET, POST, PUT } from "@/lib/http-handle/http-handle";
import { Section } from "@/models/course";
import { convertTopicToRequestData } from "./adapters/topic/topic";

export const createSection = (
  data: any,
  onSuccess: (data: Section) => void,
  onFail: (err?: any) => void
) => {
  const { position, title, description, courseId } = data;
  let reqData = {
    position,
    title,
    description,
    courseId,
  };

  POST("/section", reqData, onSuccess, onFail);
};

export const updateSection = (
  data: Section,
  onSuccess: (data: Section) => void,
  onFail: (err?: any) => void
) => {
  const { id, position, title, description, courseId, topics } = data;

  let reqData = {
    id,
    position,
    title,
    description,
    courseId,
    topics: topics.map((topic) => convertTopicToRequestData(topic)),
  };

  PUT(`/section/${id}`, reqData, onSuccess, onFail);
};

export const getSection = (
  id: string,
  onSuccess: (data: Section) => void,
  onFail: (err?: any) => void
) => {
  const handleSuccess = (data: any) => {
    console.log("section data", data);
    onSuccess(data);
  };
  GET(`/section/${id}`, handleSuccess, onFail);
};
