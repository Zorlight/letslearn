import {
  AssignmentResponseData,
  QuizResponseData,
} from "@/models/student-response";
import { AssignmentTopic, QuizTopic, Topic, TopicType } from "@/models/topic";

// no due date -> not submitted and no due date
const isNoDueDateAssignment = (assignment: AssignmentTopic) => {
  const { response } = assignment;
  if (response) return false;

  const { close } = assignment.data;
  return !close;
};

// done -> has due date -> has response and submitted date is earlier than due date
//      -> no due date -> has response
const isDoneAssignment = (assignment: AssignmentTopic) => {
  const { response } = assignment;
  if (!response) return false;

  const { close } = assignment.data;
  if (!close) return true;

  const { submittedAt } = response.data as AssignmentResponseData;
  return submittedAt && new Date(submittedAt) <= new Date(close);
};

// overdue -> has due date -> not submitted and due date is passed
const isOverDueAssignment = (assignment: AssignmentTopic) => {
  const { close } = assignment.data;
  if (!close) return false;

  const { response } = assignment;
  if (response) return false;

  return new Date() > new Date(close);
};

// working -> has due date -> not submitted and due date is not passed
const isWorkingInProgressAssignment = (assignment: AssignmentTopic) => {
  const { close } = assignment.data;
  if (!close) return false;

  const { response } = assignment;
  if (response) return false;

  return new Date() < new Date(close);
};

// no due date -> not submitted and no due date
const isNoDueDateTopic = (topic: Topic) => {
  const { type } = topic;
  if (type === TopicType.QUIZ) return isNoDueDateQuiz(topic);
  else if (type === TopicType.ASSIGNMENT) isNoDueDateAssignment(topic);
  return false;
};

// no due date -> not submitted and no due date
const isNoDueDateQuiz = (quiz: QuizTopic) => {
  const { response } = quiz;
  if (response) return false;

  const { close } = quiz.data;
  return !close;
};

// done -> has due date -> has response and submitted date is earlier than due date
//      -> no due date -> has response
const isDoneQuiz = (quiz: QuizTopic) => {
  const { type } = quiz;
  const { response } = quiz;
  if (!response) return false;

  const { close } = quiz.data;
  if (!close) return true;

  const { completedAt } = response.data as QuizResponseData;
  return completedAt && new Date(completedAt) <= new Date(close);
};

// overdue -> has due date -> not submitted and due date is passed
const isOverDueQuiz = (quiz: QuizTopic) => {
  const { close } = quiz.data;
  if (!close) return false;

  const { response } = quiz;
  if (response) return false;

  return new Date() > new Date(close);
};

// working -> has due date -> not submitted and due date is not passed
const isWorkingInProgressQuiz = (quiz: QuizTopic) => {
  const { close } = quiz.data;
  if (!close) return false;

  const { response } = quiz;
  if (response) return false;

  return new Date() < new Date(close);
};

const isDoneTopic = (topic: Topic) => {
  const { type } = topic;
  if (type === TopicType.QUIZ) return isDoneQuiz(topic);
  else if (type === TopicType.ASSIGNMENT) isDoneAssignment(topic);
  return false;
};

const isOverDueTopic = (topic: Topic) => {
  const { type } = topic;
  if (type === TopicType.QUIZ) return isOverDueQuiz(topic);
  else if (type === TopicType.ASSIGNMENT) isOverDueAssignment(topic);
  return false;
};

const isWorkingInProgressTopic = (topic: Topic) => {
  const { type } = topic;
  if (type === TopicType.QUIZ) return isWorkingInProgressQuiz(topic);
  else if (type === TopicType.ASSIGNMENT) isWorkingInProgressAssignment(topic);
  return false;
};

export {
  isDoneTopic,
  isNoDueDateTopic,
  isOverDueTopic,
  isWorkingInProgressTopic,
};
