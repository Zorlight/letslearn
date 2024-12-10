import { AssignmentTopic, QuizTopic, Topic, TopicType } from "@/models/topic";
import {
  convertAssignmentFromResponseData,
  convertAssignmentToRequestData,
} from "./convert-assignment";
import {
  convertQuizFromResponseData,
  convertQuizToRequestData,
} from "./convert-quiz";

export const convertTopicToRequestData = (topic: Topic) => {
  const { type } = topic;
  let reqData;
  if (type === TopicType.QUIZ) {
    reqData = convertQuizToRequestData(topic as QuizTopic);
  } else if (type === TopicType.ASSIGNMENT) {
    reqData = convertAssignmentToRequestData(topic as AssignmentTopic);
  }
  return reqData;
};

export const convertTopicFromResponseData = (topic: any) => {
  const { type } = topic;
  let res;
  if (type === TopicType.QUIZ) {
    res = convertQuizFromResponseData(topic);
  } else if (type === TopicType.ASSIGNMENT) {
    res = convertAssignmentFromResponseData(topic);
  }
  return res;
};
