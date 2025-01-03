import {
  AssignmentTopic,
  MeetingTopic,
  QuizTopic,
  Topic,
  TopicType,
} from "@/models/topic";
import { DateItem, TopicItem } from "./static-data";
import { isInDate } from "@/lib/utils";

const handleGetDateItems = (dateRange: Date[], topics: Topic[]): DateItem[] => {
  const dateList: DateItem[] = [];
  dateRange.forEach((date) => {
    const items = handleGetDateItem(date, topics);
    console.log("items", items);
    dateList.push(items);
  });
  return dateList;
};

const handleGetDateItem = (date: Date, topics: Topic[]): DateItem => {
  const dateItems: DateItem = {
    date: date,
    topicItems: [],
  };
  topics.forEach((topic) => {
    if (canGetThisTopic(date, topic))
      dateItems.topicItems.push(handleGetThisTopic(date, topic));
  });
  return dateItems;
};

const canGetThisTopic = (date: Date, topic: Topic) => {
  const { type } = topic;
  if (type === TopicType.MEETING)
    return canGetThisMeetingTopic(date, topic as MeetingTopic);
  else if (type === TopicType.ASSIGNMENT)
    return canGetThisAssignmentTopic(date, topic as AssignmentTopic);
  else if (type === TopicType.QUIZ)
    return canGetThisQuizTopic(date, topic as QuizTopic);
  return false;
};

const handleGetThisTopic = (date: Date, topic: Topic): TopicItem => {
  const { type } = topic;
  if (type === TopicType.MEETING)
    return handleGetThisMeetingTopic(date, topic as MeetingTopic);
  else if (type === TopicType.ASSIGNMENT)
    return handleGetThisAssignmentTopic(date, topic as AssignmentTopic);
  return handleGetThisQuizTopic(date, topic as QuizTopic);
};

const canGetThisMeetingTopic = (date: Date, topic: MeetingTopic) => {
  const openDate = new Date(topic.data.open);
  return isInDate(date, openDate);
};

const handleGetThisMeetingTopic = (
  date: Date,
  topic: MeetingTopic
): TopicItem => {
  const openDate = new Date(topic.data.open);
  return {
    startTime: openDate,
    endTime: null,
    topic: topic,
    course: topic.course,
  };
};

const canGetThisAssignmentTopic = (date: Date, topic: AssignmentTopic) => {
  const openStr = topic.data.open;
  const closeStr = topic.data.close;
  const openDate = openStr ? new Date(openStr) : null;
  const closeDate = closeStr ? new Date(closeStr) : null;
  console.log("openDate", openDate);
  console.log("closeDate", closeDate);
  console.log("date", date);
  if (openDate && isInDate(date, openDate)) return true;
  if (closeDate && isInDate(date, closeDate)) return true;
  console.log("return false");
  return false;
};

const handleGetThisAssignmentTopic = (
  date: Date,
  topic: AssignmentTopic
): TopicItem => {
  const openDate = topic.data.open ? new Date(topic.data.open) : null;
  const closeDate = topic.data.close ? new Date(topic.data.close) : null;
  return {
    startTime: openDate,
    endTime: closeDate,
    topic: topic,
    course: topic.course,
  };
};

const canGetThisQuizTopic = (date: Date, topic: QuizTopic) => {
  const openStr = topic.data.open;
  const closeStr = topic.data.close;
  const openDate = openStr ? new Date(openStr) : null;
  const closeDate = closeStr ? new Date(closeStr) : null;
  if (openDate && isInDate(date, openDate)) return true;
  if (closeDate && isInDate(date, closeDate)) return true;
  return false;
};

const handleGetThisQuizTopic = (date: Date, topic: QuizTopic): TopicItem => {
  const openDate = topic.data.open ? new Date(topic.data.open) : null;
  const closeDate = topic.data.close ? new Date(topic.data.close) : null;
  return {
    startTime: openDate,
    endTime: closeDate,
    topic: topic,
    course: topic.course,
  };
};

export {
  handleGetDateItems,
  handleGetDateItem,
  canGetThisTopic,
  handleGetThisTopic,
  canGetThisMeetingTopic,
  handleGetThisMeetingTopic,
  canGetThisAssignmentTopic,
  handleGetThisAssignmentTopic,
  canGetThisQuizTopic,
  handleGetThisQuizTopic,
};
