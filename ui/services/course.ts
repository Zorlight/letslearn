import { GET, PATCH, POST, PUT } from "@/lib/http-handle/http-handle";
import { Course } from "@/models/course";
import { Role, User } from "@/models/user";
import { convertCourseFromResponseData } from "./adapters/course/course";

export const createCourse = (
  data: any,
  onSuccess: (data: Course) => void,
  onFail: () => void
) => {
  let reqData = {
    title: data.title,
    description: "",
    imageUrl: "",
    price: data.price > 0 ? data.price : null,
    category: data.category,
    level: data.level,
    isPublished: data.isPublished,
  };

  const handleSuccess = (data: any) => {
    console.log("not convert course", data);
    const res = convertCourseFromResponseData(data);
    onSuccess(res);
  };

  POST("/course", reqData, handleSuccess, onFail);
};

export const getPublicCourses = (
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  const url = `/course`;
  GET(url, onSuccess, onFail);
};

export const getTeacherCourses = (
  user: User,
  onSuccess: (data: Course[]) => void,
  onFail: (err?: any) => void
) => {
  if (user.role !== Role.TEACHER) return;

  const handleSuccess = (data: any[]) => {
    const res = data.map(convertCourseFromResponseData);
    onSuccess(res);
  };

  const url = `/course?userId=${user.id}`;
  GET(url, handleSuccess, onFail);
};

export const getCourse = (
  id: string,
  onSuccess: (data: Course) => void,
  onFail: (err?: any) => void
) => {
  const handleSuccess = (data: any) => {
    const res = convertCourseFromResponseData(data);
    onSuccess(res);
  };
  GET(`/course/${id}`, handleSuccess, onFail);
};

export const updateCourse = (
  data: Course,
  onSuccess: (data: Course) => void,
  onFail: (err?: any) => void
) => {
  const { id, title, price, category, level, isPublished, imageUrl } = data;
  let reqData = {
    title,
    price,
    category,
    level,
    isPublished,
    imageUrl,
  };

  const handleSuccess = (data: any) => {
    const res = convertCourseFromResponseData(data);
    onSuccess(res);
  };
  PUT(`/course/${id}`, reqData, handleSuccess, onFail);
};

export const joinCourse = (
  courseId: string,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  PATCH(`/course/${courseId}/join`, null, onSuccess, onFail);
};

export const getCourseWork = (
  courseId: string,
  type: "quiz" | "assignment" | "meeting" | null,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  const url = type
    ? `/course/${courseId}/work?type=${type}`
    : `/course/${courseId}/work`;
  GET(url, onSuccess, onFail);
};
