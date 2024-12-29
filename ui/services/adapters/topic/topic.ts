import {
  AssignmentTopic,
  FileTopic,
  LinkTopic,
  MeetingTopic,
  PageTopic,
  QuizTopic,
  Topic,
  TopicType,
} from "@/models/topic";
import {
  convertAssignmentFromResponseData,
  convertAssignmentToRequestData,
} from "./convert-assignment";
import {
  convertQuizFromResponseData,
  convertQuizToRequestData,
} from "./convert-quiz";
import {
  convertMeetingFromResponseData,
  convertMeetingToRequestData,
} from "./convert-meeting";
import {
  convertFileFromResponseData,
  convertFileToRequestData,
} from "./convert-file";
import {
  convertLinkFromResponseData,
  convertLinkToRequestData,
} from "./convert-link";
import {
  convertPageFromResponseData,
  convertPageToRequestData,
} from "./convert-page";

export const convertTopicToRequestData = (topic: Topic) => {
  const { type } = topic;
  let reqData;
  if (type === TopicType.QUIZ) {
    reqData = convertQuizToRequestData(topic as QuizTopic);
  } else if (type === TopicType.ASSIGNMENT) {
    reqData = convertAssignmentToRequestData(topic as AssignmentTopic);
  } else if (type === TopicType.MEETING) {
    reqData = convertMeetingToRequestData(topic as MeetingTopic);
  } else if (type === TopicType.FILE) {
    reqData = convertFileToRequestData(topic as FileTopic);
  } else if (type === TopicType.LINK) {
    reqData = convertLinkToRequestData(topic as LinkTopic);
  } else if (type === TopicType.PAGE) {
    reqData = convertPageToRequestData(topic as PageTopic);
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
  } else if (type === TopicType.MEETING) {
    res = convertMeetingFromResponseData(topic);
  } else if (type === TopicType.FILE) {
    res = convertFileFromResponseData(topic);
  } else if (type === TopicType.LINK) {
    res = convertLinkFromResponseData(topic);
  } else if (type === TopicType.PAGE) {
    res = convertPageFromResponseData(topic);
  }
  return res;
};
