import { User } from "@/models/user";
import { format } from "date-fns";
import { Reply } from "lucide-react";
import IconButton from "../buttons/icon-button";
import Avatar from "../ui/simple/avatar";

interface Props {
  user: User;
}
export default function MessageComment({ user }: Props) {
  const date = new Date();
  const formatDate = format(date, "hh:mm a");
  return (
    <div className="flex flex-row items-center gap-4">
      <Avatar src={user.avatar !== "" ? user.avatar : "/default-user.png"} />
      <div className="w-full flex flex-row items-center justify-between">
        <div className="w-full flex flex-col">
          <div className="flex flex-row items-center gap-2">
            <span className="text-cyan-500 font-bold text-sm">
              {user.username}
            </span>
            <span className="text-gray-400 text-xs">{formatDate}</span>
          </div>
          <span className="w-full text-gray-700 text-sm">
            Hello teacher! My submission was lost, can you help me ?
          </span>
        </div>
        <IconButton className="p-2 group">
          <Reply
            size={24}
            className="text-gray-400 group-hover:text-gray-500 ease-linear duration-200"
          />
        </IconButton>
      </div>
    </div>
  );
}
