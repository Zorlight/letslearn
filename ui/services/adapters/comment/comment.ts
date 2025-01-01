import { Comment } from "@/models/comment";
import { convertTopicToRequestData } from "../topic/topic";

export const convertCommentToRequestData = (comment: Comment) => {
  const { id, topic, ...others } = comment;
  let reqData = {
    ...others,
    id: id.length !== 4 ? id : null,
    topic: convertTopicToRequestData(topic),
  };
  return reqData;
};
