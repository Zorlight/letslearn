import { AssignmentTopic, QuizTopic, Topic, TopicType } from "@/models/topic";

// overdue -> has due date -> not submitted and due date is passed
const isOverDueQuiz = (quiz: QuizTopic) => {
  const { close } = quiz.data;
  if (!close) return false;

  return new Date() > new Date(close);
};

// working -> has open and due date -> not submitted and behind the open due date is not passed
//         -> no open and has due date -> not submitted and due date is not passed
//         -> has open and no due date -> not submitted and behind the open date
const isWorkingInProgressQuiz = (quiz: QuizTopic) => {
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

// overdue -> has due date -> not submitted and due date is passed
const isOverDueAssignment = (assignment: AssignmentTopic) => {
  const { close } = assignment.data;
  if (!close) return false;

  return new Date() > new Date(close);
};

// working -> has open and due date -> not submitted and behind the open due date is not passed
//         -> no open and has due date -> not submitted and due date is not passed
//         -> has open and no due date -> not submitted and behind the open date
const isWorkingInProgressAssignment = (assignment: AssignmentTopic) => {
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

export const isOverDueTopic = (topic: Topic) => {
  const { type } = topic;
  if (type === TopicType.QUIZ) return isOverDueQuiz(topic);
  else if (type === TopicType.ASSIGNMENT) isOverDueAssignment(topic);
  return false;
};

export const isWorkingInProgressTopic = (topic: Topic) => {
  const { type } = topic;
  if (type === TopicType.QUIZ) return isWorkingInProgressQuiz(topic);
  else if (type === TopicType.ASSIGNMENT)
    return isWorkingInProgressAssignment(topic);
  return false;
};
