"use client";
import { ChatMessage } from "@/models/message";
import { User } from "@/models/user";
import ChatItem from "./chat-item";
import { Input } from "@/lib/shadcn/input";
import { useMemo, useState } from "react";

interface Props {
  messages: ChatMessage[];
  user: User;
  onItemClick?: (message: ChatMessage) => void;
}
export default function ChatList({ messages, user, onItemClick }: Props) {
  const [filterInput, setFilterInput] = useState("");
  const handleFilterMessage = (
    filterInput: string,
    messages: ChatMessage[]
  ) => {
    if (filterInput === "") return messages;
    return messages.filter((message) =>
      message.sender.username.toLowerCase().includes(filterInput.toLowerCase())
    );
  };
  const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterInput(e.target.value);
  };
  const handleClick = (message: ChatMessage) => () => {
    if (onItemClick) onItemClick(message);
  };
  const filteredMessages = useMemo(
    () => handleFilterMessage(filterInput, messages),
    [messages, filterInput]
  );
  return (
    <div>
      <div className="p-2 space-y-2">
        <h5 className="text-gray-700">Message box</h5>
        <Input
          className="w-full rounded-full"
          placeholder="Find someone to chat"
          onChange={handleFilterInputChange}
        />
      </div>

      <div className="flex flex-col">
        {filteredMessages.map((message, index) => (
          <ChatItem
            key={index}
            message={message}
            currentUser={user}
            onClick={handleClick(message)}
          />
        ))}
      </div>
    </div>
  );
}
