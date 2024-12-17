import {
  AssignmentTopic,
  MeetingTopic,
  QuizTopic,
  Topic,
} from "@/models/topic";
import {
  convertTopicFromResponseData,
  convertTopicToRequestData,
} from "./adapters/topic/topic";
import { GET, PUT } from "@/lib/http-handle/http-handle";
import { convertAssignmentResponseFromResponseData } from "./adapters/student-response/assignment-response";
import { getUserWork } from "./user";
import { convertQuizFromResponseData } from "./adapters/topic/convert-quiz";
import { convertMeetingFromResponseData } from "./adapters/topic/convert-meeting";
import { getCourseWork } from "./course";
import { convertAssignmentFromResponseData } from "./adapters/topic/convert-assignment";

export const getTopic = (
  id: string,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  const handleSuccess = (data: any) => {
    console.log("data in get", data);
    const res = convertTopicFromResponseData(data);
    onSuccess(res);
  };
  GET(`/topic/${id}`, handleSuccess, onFail);
};

export const updateTopic = (
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
  PUT(`/topic/${id}`, reqData, handleSuccess, onFail);
};

export const getAllAssignmentOfUser = (
  onSuccess: (data: AssignmentTopic[]) => void,
  onFail: (err?: any) => void
) => {
  const handleSuccess = (data: any) => {
    const assignmentsJSONArray = data[0].data;
    const assignments = assignmentsJSONArray
      .map(JSON.parse)
      .map(convertAssignmentFromResponseData);
    console.log("assignments after convert", assignments);
    // const assignment = data.map(convertAssignmentResponseFromResponseData);
    // onSuccess(assignment);
  };
  getUserWork("assignment", handleSuccess, onFail);
};

export const getAllQuizOfUser = (
  onSuccess: (data: QuizTopic[]) => void,
  onFail: (err?: any) => void
) => {
  const handleSuccess = (data: any) => {
    console.log("data in get quizzes", data);
    const quiz = data.map(convertQuizFromResponseData);
    onSuccess(quiz);
  };
  getUserWork("quiz", handleSuccess, onFail);
};

export const getAllMeetingOfUser = (
  onSuccess: (data: MeetingTopic[]) => void,
  onFail: (err?: any) => void
) => {
  const handleSuccess = (data: any) => {
    const meeting = data.map(convertMeetingFromResponseData);
    onSuccess(meeting);
  };
  getUserWork("meeting", handleSuccess, onFail);
};

export const getAllAssignmentOfCourse = (
  courseId: string,
  onSuccess: (data: AssignmentTopic[]) => void,
  onFail: (err?: any) => void
) => {
  const handleSuccess = (data: any) => {
    const assignment = data.map(convertAssignmentResponseFromResponseData);
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
