import { Comment } from "@/models/comment";
import { format } from "date-fns";
import Avatar from "../simple/avatar";
import { getTimeText } from "./utils";

interface Props {
  comment: Comment;
}
export default function CommentMessage({ comment }: Props) {
  const { user, createdAt, text } = comment;
  let formatDate = "";
  try {
    formatDate = getTimeText(createdAt);
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="w-full flex flex-row items-center gap-4">
      <Avatar src={user.avatar !== "" ? user.avatar : "/default-user.png"} />
      <div className="w-full flex flex-row items-center justify-between">
        <div className="w-full flex flex-col">
          <div className="flex flex-row items-center gap-2">
            <span className="text-cyan-500 font-bold text-sm">
              {user.username}
            </span>
            <span className="text-gray-400 text-xs">{formatDate}</span>
          </div>
          <span className="w-full text-gray-700 text-sm">{text}</span>
        </div>
      </div>
    </div>
  );
}
