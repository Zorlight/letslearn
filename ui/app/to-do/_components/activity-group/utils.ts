import { AssignmentTopic, QuizTopic, Topic, TopicType } from "@/models/topic";

const hasAttemptQuiz = (quiz: QuizTopic) => {
  const { response } = quiz;
  return response && response.length > 0;
};

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
  return !!response;
};

// overdue -> has due date -> not submitted and due date is passed
const isOverDueAssignment = (assignment: AssignmentTopic) => {
  const { close } = assignment.data;
  if (!close) return false;

  const { response } = assignment;
  if (response) return false;

  return new Date() > new Date(close);
};

// working -> has open and due date -> not submitted and behind the open due date is not passed
//         -> no open and has due date -> not submitted and due date is not passed
//         -> has open and no due date -> not submitted and behind the open date
const isWorkingInProgressAssignment = (assignment: AssignmentTopic) => {
  const { response } = assignment;
  if (response) return false;
  const { close, open } = assignment.data;
  if (open && close) {
    return new Date(open) < new Date() && new Date() < new Date(close);
  } else if (!open && close) {
    return new Date() < new Date(close);
  } else if (open && !close) {
    return new Date(open) < new Date();
  }

  return true;
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
  if (hasAttemptQuiz(quiz)) return false;

  const { close } = quiz.data;
  return !close;
};

// done -> has due date -> has response and submitted date is earlier than due date
//      -> no due date -> has response
const isDoneQuiz = (quiz: QuizTopic) => {
  return hasAttemptQuiz(quiz);
};

// overdue -> has due date -> not submitted and due date is passed
const isOverDueQuiz = (quiz: QuizTopic) => {
  const { close } = quiz.data;
  if (!close) return false;

  if (hasAttemptQuiz(quiz)) return false;

  return new Date() > new Date(close);
};

// working -> has open and due date -> not submitted and behind the open due date is not passed
//         -> no open and has due date -> not submitted and due date is not passed
//         -> has open and no due date -> not submitted and behind the open date
const isWorkingInProgressQuiz = (quiz: QuizTopic) => {
  if (hasAttemptQuiz(quiz)) return false;

  const { close, open } = quiz.data;
  if (open && close) {
    return new Date(open) < new Date() && new Date() < new Date(close);
  } else if (!open && close) {
    return new Date() < new Date(close);
  } else if (open && !close) {
    return new Date(open) < new Date();
  }

  return true;
};

const isDoneTopic = (topic: Topic) => {
  const { type } = topic;
  if (type === TopicType.QUIZ) return isDoneQuiz(topic);
  else if (type === TopicType.ASSIGNMENT) return isDoneAssignment(topic);
  return false;
};

const isOverDueTopic = (topic: Topic) => {
  const { type } = topic;
  if (type === TopicType.QUIZ) return isOverDueQuiz(topic);
  else if (type === TopicType.ASSIGNMENT) return isOverDueAssignment(topic);
  return false;
};

const isWorkingInProgressTopic = (topic: Topic) => {
  const { type } = topic;
  if (type === TopicType.QUIZ) return isWorkingInProgressQuiz(topic);
  else if (type === TopicType.ASSIGNMENT)
    return isWorkingInProgressAssignment(topic);
  return false;
};

export {
  isDoneTopic,
  isNoDueDateTopic,
  isOverDueTopic,
  isWorkingInProgressTopic,
};
