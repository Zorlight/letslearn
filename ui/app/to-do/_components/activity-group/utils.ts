import {
  AssignmentResponseData,
  QuizResponseData,
} from "@/models/student-response";
import { Topic, TopicType } from "@/models/topic";

// no due date -> not submitted and no due date
const isNoDueDateTopic = (topic: Topic) => {
  const { type } = topic;
  if (type === TopicType.QUIZ) {
    const { response } = topic;
    if (response) return false;

    const { close } = topic.data;
    return !close;
  } else if (type === TopicType.ASSIGNMENT) {
    const { response } = topic;
    if (response) return false;

    const { close } = topic.data;
    return !close;
  }
  return false;
};

// done -> has due date -> has response and submitted date is earlier than due date
//      -> no due date -> has response
const isDoneTopic = (topic: Topic) => {
  const { type } = topic;
  if (type === TopicType.QUIZ) {
    const { response } = topic;
    if (!response) return false;

    const { close } = topic.data;
    if (!close) return true;

    const { completedAt } = response.data as QuizResponseData;
    return completedAt && new Date(completedAt) <= new Date(close);
  } else if (type === TopicType.ASSIGNMENT) {
    const { response } = topic;
    if (!response) return false;

    const { close } = topic.data;
    if (!close) return true;

    const { submittedAt } = response.data as AssignmentResponseData;
    return submittedAt && new Date(submittedAt) <= new Date(close);
  }
  return false;
};

// overdue -> has due date -> not submitted and due date is passed
const isOverDueTopic = (topic: Topic) => {
  const { type } = topic;
  if (type === TopicType.QUIZ) {
    const { close } = topic.data;
    if (!close) return false;

    const { response } = topic;
    if (response) return false;

    return new Date() > new Date(close);
  } else if (type === TopicType.ASSIGNMENT) {
    const { close } = topic.data;
    if (!close) return false;

    const { response } = topic;
    if (response) return false;

    return new Date() > new Date(close);
  }
  return false;
};

// working -> has due date -> not submitted and due date is not passed
const isWorkingInProgressTopic = (topic: Topic) => {
  const { type } = topic;
  if (type === TopicType.QUIZ) {
    const { close } = topic.data;
    if (!close) return false;

    const { response } = topic;
    if (response) return false;

    return new Date() < new Date(close);
  } else if (type === TopicType.ASSIGNMENT) {
    const { close } = topic.data;
    if (!close) return false;

    const { response } = topic;
    if (response) return false;

    return new Date() < new Date(close);
  }
  return false;
};

export {
  isWorkingInProgressTopic,
  isOverDueTopic,
  isDoneTopic,
  isNoDueDateTopic,
};
