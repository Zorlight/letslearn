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
