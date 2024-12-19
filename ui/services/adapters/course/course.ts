import { convertTopicFromResponseData } from "../topic/topic";

export const convertCourseFromResponseData = (data: any) => {
  const sectionData = Array.isArray(data.sections) ? data.sections : [];
  const res = {
    ...data,
    sections: sectionData.map((section: any) =>
      convertSectionFromResponseData(section)
    ),
  };
  return res;
};

export const convertSectionFromResponseData = (data: any) => {
  const topicData = Array.isArray(data.topics) ? data.topics : [];
  const res = {
    ...data,
    topics: topicData.map((topic: any) => convertTopicFromResponseData(topic)),
  };
  return res;
};
