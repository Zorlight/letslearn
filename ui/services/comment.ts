import { GET, POST } from "@/lib/http-handle/http-handle";
import { Comment } from "@/models/comment";
import { convertCommentToRequestData } from "./adapters/comment/comment";

export const addComment = (
  courseId: string,
  topicId: string,
  comment: Comment,
  onSuccess: (data: Comment) => void,
  onFail: (err?: any) => void
) => {
  let reqData = convertCommentToRequestData(comment);

  const url = `/course/${courseId}/topic/${topicId}/comments`;
  POST(url, reqData, onSuccess, onFail);
};

export const getComments = (
  courseId: string,
  topicId: string,
  onSuccess: (data: Comment[]) => void,
  onFail: (err?: any) => void
) => {
  const url = `/course/${courseId}/topic/${topicId}/comments`;
  GET(url, onSuccess, onFail);
};
