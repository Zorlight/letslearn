import { GET, PATCH, PUT } from "@/lib/http-handle/http-handle";
import { User } from "@/models/user";

export const getMyInfo = (
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  GET("/user/me", onSuccess, onFail);
};

export const getUserWork = (
  type: "quiz" | "assignment" | "meeting",
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  GET(`/user/work?type=${type}`, onSuccess, onFail);
};

export const getAllUserWork = (
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void,
  start?: string,
  end?: string
) => {
  const url =
    start && end ? `/user/work?start=${start}&end=${end}` : "/user/work";
  GET(url, onSuccess, onFail);
};

export const updateProfile = (
  userName: string,
  avatar: string,
  onSuccess: (data: User) => void,
  onFail: (err?: any) => void
) => {
  const reqData = {
    username: userName,
    avatar,
  };
  PUT("/user/me", reqData, onSuccess, onFail);
};

export const updatePassword = (
  oldPassword: string,
  newPassword: string,
  onSuccess: () => void,
  onFail: (err?: any) => void
) => {
  const reqData = {
    oldPassword,
    newPassword,
  };
  PATCH("/user/me/password", reqData, onSuccess, onFail);
};
