import {
  AssignmentTopic,
  MeetingTopic,
  QuizTopic,
  Topic,
  TopicType,
} from "@/models/topic";
import {
  convertTopicFromResponseData,
  convertTopicToRequestData,
} from "./adapters/topic/topic";
import { GET, PUT } from "@/lib/http-handle/http-handle";
import { convertAssignmentResponseFromResponseData } from "./adapters/student-response/assignment-response";
import { getAllUserWork, getUserWork } from "./user";
import { convertQuizFromResponseData } from "./adapters/topic/convert-quiz";
import { convertMeetingFromResponseData } from "./adapters/topic/convert-meeting";
import { getCourseWork } from "./course";
import { convertAssignmentFromResponseData } from "./adapters/topic/convert-assignment";

export const getTopic = (
  courseId: string,
  id: string,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  const handleSuccess = (data: any) => {
    console.log("data in get", data);
    const res = convertTopicFromResponseData(data);
    onSuccess(res);
  };
  GET(`/course/${courseId}/topic/${id}`, handleSuccess, onFail);
};

export const updateTopic = (
  courseId: string,
  data: Topic,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  const { id } = data;
  let reqData = convertTopicToRequestData(data);
  const handleSuccess = (data: any) => {
    const res = convertTopicFromResponseData(data);
    onSuccess(res);
  };
  PUT(`/course/${courseId}/topic/${id}`, reqData, handleSuccess, onFail);
};

export const getAllAssignmentOfUser = (
  onSuccess: (data: AssignmentTopic[]) => void,
  onFail: (err?: any) => void
) => {
  const handleSuccess = (data: any[]) => {
    const assignments = data.map(convertAssignmentFromResponseData);
    onSuccess(assignments);
  };
  getUserWork("assignment", handleSuccess, onFail);
};

export const getAllQuizOfUser = (
  onSuccess: (data: QuizTopic[]) => void,
  onFail: (err?: any) => void
) => {
  const handleSuccess = (data: any[]) => {
    const quizzes = data.map(convertQuizFromResponseData);
    onSuccess(quizzes);
  };
  getUserWork("quiz", handleSuccess, onFail);
};

export const getAllMeetingOfUser = (
  onSuccess: (data: MeetingTopic[]) => void,
  onFail: (err?: any) => void
) => {
  const handleSuccess = (data: any[]) => {
    const meetings = data.map(convertMeetingFromResponseData);
    onSuccess(meetings);
  };
  getUserWork("meeting", handleSuccess, onFail);
};

export const getAllWorkOfUser = (
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void,
  start?: string,
  end?: string
) => {
  const handleSuccess = (data: any[]) => {
    const converted = data.map((item) => {
      if (item.type === TopicType.ASSIGNMENT)
        return convertAssignmentFromResponseData(item);
      if (item.type === TopicType.QUIZ)
        return convertQuizFromResponseData(item);
      if (item.type === TopicType.MEETING)
        return convertMeetingFromResponseData(item);
      return item;
    });
    onSuccess(converted);
  };
  getAllUserWork(handleSuccess, onFail, start, end);
};

export const getAllAssignmentOfCourse = (
  courseId: string,
  onSuccess: (data: AssignmentTopic[]) => void,
  onFail: (err?: any) => void
) => {
  const handleSuccess = (data: any) => {
    const assignment = data.map(convertAssignmentFromResponseData);
    onSuccess(assignment);
  };
  getCourseWork(courseId, "assignment", handleSuccess, onFail);
};

export const getAllQuizOfCourse = (
  courseId: string,
  onSuccess: (data: QuizTopic[]) => void,
  onFail: (err?: any) => void
) => {
  const handleSuccess = (data: any) => {
    const quiz = data.map(convertQuizFromResponseData);
    onSuccess(quiz);
  };
  getCourseWork(courseId, "quiz", handleSuccess, onFail);
};

export const getAllMeetingOfCourse = (
  courseId: string,
  onSuccess: (data: MeetingTopic[]) => void,
  onFail: (err?: any) => void
) => {
  const handleSuccess = (data: any) => {
    const meeting = data.map(convertMeetingFromResponseData);
    onSuccess(meeting);
  };
  getCourseWork(courseId, "meeting", handleSuccess, onFail);
};

export const getAllWorkOfCourse = (
  courseId: string,
  onSuccess: (data: Topic[]) => void,
  onFail: (err?: any) => void
) => {
  const handleSuccess = (data: any[]) => {
    const converted = data.map((item) => {
      if (item.type === TopicType.ASSIGNMENT)
        return convertAssignmentFromResponseData(item);
      if (item.type === TopicType.QUIZ)
        return convertQuizFromResponseData(item);
      if (item.type === TopicType.MEETING)
        return convertMeetingFromResponseData(item);
      return item;
    });
    onSuccess(converted);
  };
  getCourseWork(courseId, null, handleSuccess, onFail);
};
