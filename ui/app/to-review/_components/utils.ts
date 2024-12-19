import { AssignmentTopic, QuizTopic, Topic, TopicType } from "@/models/topic";

// no due date -> do not have due date
const isNoDueDateAssignment = (assignment: AssignmentTopic) => {
  const { close } = assignment.data;
  return !close;
};

// closed -> has due date -> has due date and today is after due date
const isClosedAssignment = (assignment: AssignmentTopic) => {
  const { close } = assignment.data;
  if (!close) return false;
  return new Date() > new Date(close);
};

// working -> has due date -> has due date and today is before due date and after open date
const isWorkingInProgressAssignment = (assignment: AssignmentTopic) => {
  const { close, open } = assignment.data;
  if (!close) return false;
  const current = new Date();
  if (open) return current < new Date(close) && current > new Date(open);
  return current < new Date(close);
};

// no due date -> do not have due date
const isNoDueDateQuiz = (quiz: QuizTopic) => {
  const { close } = quiz.data;
  return !close;
};

// closed -> has due date -> has due date and today is after due date
const isClosedQuiz = (quiz: QuizTopic) => {
  const { close } = quiz.data;
  if (!close) return false;
  return new Date() > new Date(close);
};

// working -> has due date -> has due date and today is before due date and after open date
const isWorkingInProgressQuiz = (quiz: QuizTopic) => {
  const { close, open } = quiz.data;
  if (!close) return false;
  const current = new Date();
  if (open) return current < new Date(close) && current > new Date(open);
  return current < new Date(close);
};

const isNoDueDateTopic = (topic: Topic) => {
  const { type } = topic;
  if (type === TopicType.QUIZ) return isNoDueDateQuiz(topic);
  else if (type === TopicType.ASSIGNMENT) return isNoDueDateAssignment(topic);
  return false;
};

const isClosedTopic = (topic: Topic) => {
  const { type } = topic;
  if (type === TopicType.QUIZ) return isClosedQuiz(topic);
  else if (type === TopicType.ASSIGNMENT) return isClosedAssignment(topic);
  return false;
};

const isWorkingInProgressTopic = (topic: Topic) => {
  const { type } = topic;
  if (type === TopicType.QUIZ) return isWorkingInProgressQuiz(topic);
  else if (type === TopicType.ASSIGNMENT)
    return isWorkingInProgressAssignment(topic);
  return false;
};

export { isClosedTopic, isNoDueDateTopic, isWorkingInProgressTopic };
