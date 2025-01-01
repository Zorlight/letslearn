import { cn } from "@/lib/utils";
import { Comment } from "@/models/comment";
import React from "react";
import CommentMessage from "./comment-message";
import CommentInput from "./comment-input";
import { User } from "@/models/user";

interface Props {
  comments: Comment[];
  currentUser: User;
  className?: string;
  onSend?: (message: string) => void;
}
export default function CommentList({
  comments,
  className,
  currentUser,
  onSend,
}: Props) {
  return (
    <div className={cn("w-full flex flex-col items-center gap-2", className)}>
      {comments.map((comment) => (
        <CommentMessage key={comment.id} comment={comment} />
      ))}
      <CommentInput user={currentUser} onSend={onSend} />
    </div>
  );
}
