import { User } from "@/models/user";
import React from "react";
import Avatar from "../ui/simple/avatar";
import { Input } from "@/lib/shadcn/input";
import { SendHorizonal } from "lucide-react";
import IconButton from "../buttons/icon-button";

interface Props {
  user: User;
}
export default function MessageInput({ user }: Props) {
  return (
    <div className="flex flex-row items-center gap-4">
      <Avatar src={user.avatar !== "" ? user.avatar : "/default-user.png"} />
      <div className="w-full flex flex-row items-center gap-2">
        <Input
          placeholder="Type a comment"
          className="flex w-full rounded-full"
        />
        <IconButton className="p-2 group">
          <SendHorizonal
            size={24}
            className="text-gray-400 group-hover:text-gray-500 ease-linear duration-200"
          />
        </IconButton>
      </div>
    </div>
  );
}
