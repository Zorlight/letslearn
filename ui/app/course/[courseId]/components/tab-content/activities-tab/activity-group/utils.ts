import {
  AssignmentTopic,
  MeetingTopic,
  QuizTopic,
  Topic,
  TopicType,
} from "@/models/topic";

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

// working -> has open -> open due date is not passed
const isWillHappenQuiz = (quiz: QuizTopic) => {
  const { open } = quiz.data;
  if (!open) return false;
  return new Date() < new Date(open);
};

// working -> has open -> open due date is passed
const isWorkingInProgressMeeting = (meeting: MeetingTopic) => {
  const { open } = meeting.data;
  return new Date() > new Date(open);
};

const isWillHappenMeeting = (meeting: MeetingTopic) => {
  const { open } = meeting.data;
  return new Date() < new Date(open);
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

// working -> has open -> open due date is not passed
const isWillHappenAssignment = (assignment: AssignmentTopic) => {
  const { open } = assignment.data;
  if (!open) return false;
  return new Date() < new Date(open);
};

export const isOverDueTopic = (topic: Topic) => {
  const { type } = topic;
  if (type === TopicType.QUIZ) return isOverDueQuiz(topic);
  else if (type === TopicType.ASSIGNMENT) return isOverDueAssignment(topic);
  return false;
};

export const isWorkingInProgressTopic = (topic: Topic) => {
  const { type } = topic;
  if (type === TopicType.QUIZ) return isWorkingInProgressQuiz(topic);
  else if (type === TopicType.ASSIGNMENT)
    return isWorkingInProgressAssignment(topic);
  else if (type === TopicType.MEETING) return isWorkingInProgressMeeting(topic);
  return false;
};

export const isWillHappenTopic = (topic: Topic) => {
  const { type } = topic;
  if (type === TopicType.QUIZ) return isWillHappenQuiz(topic);
  else if (type === TopicType.ASSIGNMENT) return isWillHappenAssignment(topic);
  else if (type === TopicType.MEETING) return isWillHappenMeeting(topic);
  return false;
};
