import { ChatMessage } from "@/models/message";
import Avatar from "../simple/avatar";
import { User } from "@/models/user";
import { format } from "date-fns";
import { Dot } from "lucide-react";
import { getTimeText } from "./message/utils";

interface Props {
  message: ChatMessage;
  currentUser: User;
  onClick?: () => void;
}
export default function ChatItem({ message, currentUser, onClick }: Props) {
  const { sender, content, time } = message;
  const isYourMessage = sender.id === currentUser.id;
  const formattedTime = getTimeText(time);
  return (
    <div
      className="flex flex-row items-center gap-2 transition-all duration-200 hover:bg-gray-100 rounded-lg p-2 cursor-pointer"
      onClick={onClick}
    >
      <Avatar src={sender.avatar} />
      <div className="flex flex-col">
        <span className="font-bold text-gray-700">{sender.username}</span>
        <div className="flex flex-row items-center text-gray-500 text-sm">
          <span className="max-w-[150px] truncate">{`${
            !!isYourMessage ? "You: " : ""
          }${content}`}</span>
          <Dot size={8} />
          <span className="text-xs">{time && formattedTime}</span>
        </div>
      </div>
    </div>
  );
}
