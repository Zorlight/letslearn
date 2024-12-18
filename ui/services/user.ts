import { GET } from "@/lib/http-handle/http-handle";

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
