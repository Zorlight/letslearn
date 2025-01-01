import { ChatMessage } from "@/models/message";
import { User } from "@/models/user";
import { Dot } from "lucide-react";
import Avatar from "../simple/avatar";
import { getTimeText } from "./message/utils";

interface Props {
  message?: ChatMessage;
  chatUser: User;
  currentUser: User;
  onClick?: () => void;
}
export default function ChatItem({
  chatUser,
  message,
  currentUser,
  onClick,
}: Props) {
  let lastMessage = "";
  let formattedTime = "";
  let isYourMessage = false;
  if (message) {
    const { sender, content, timestamp } = message;
    lastMessage = content;
    formattedTime = getTimeText(timestamp);
    isYourMessage = sender.id === currentUser.id;
  }

  return (
    <div
      className="flex flex-row items-center gap-2 transition-all duration-200 hover:bg-gray-100 rounded-lg p-2 cursor-pointer"
      onClick={onClick}
    >
      <Avatar src={chatUser.avatar} />
      <div className="flex flex-col">
        <span className="font-bold text-gray-700">{chatUser.username}</span>
        {message && (
          <div className="flex flex-row items-center text-gray-500 text-sm">
            <span className="max-w-[150px] truncate">{`${
              !!isYourMessage ? "You: " : ""
            }${lastMessage}`}</span>
            <Dot size={8} />
            <span className="text-xs">{formattedTime}</span>
          </div>
        )}
      </div>
    </div>
  );
}
