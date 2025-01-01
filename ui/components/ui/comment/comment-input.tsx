import { User } from "@/models/user";
import React from "react";
import { Input } from "@/lib/shadcn/input";
import { SendHorizonal } from "lucide-react";
import IconButton from "@/components/buttons/icon-button";
import Avatar from "../simple/avatar";

interface Props {
  user: User;
  onSend?: (message: string) => void;
}
export default function CommentInput({ user, onSend }: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!inputRef.current) return;
    inputRef.current.value = e.target.value;
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (onSend) onSend(e.currentTarget.value);
      e.currentTarget.value = "";
    }
  };
  const handleClickSend = () => {
    if (!inputRef.current) return;
    if (onSend) onSend(inputRef.current.value || "");
    inputRef.current.value = "";
  };
  return (
    <div className="w-full flex flex-row items-center gap-4">
      <Avatar src={user.avatar !== "" ? user.avatar : "/default-user.png"} />
      <div className="w-full flex flex-row items-center gap-2">
        <Input
          ref={inputRef}
          placeholder="Type a comment"
          className="flex w-full rounded-full"
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
        <IconButton className="p-2 group" onClick={handleClickSend}>
          <SendHorizonal
            size={24}
            className="text-gray-400 group-hover:text-gray-500 ease-linear duration-200"
          />
        </IconButton>
      </div>
    </div>
  );
}
