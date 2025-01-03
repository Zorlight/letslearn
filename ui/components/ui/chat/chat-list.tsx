"use client";
import { Input } from "@/lib/shadcn/input";
import { User } from "@/models/user";
import { useMemo, useState } from "react";
import ChatItem from "./chat-item";

interface Props {
  user: User;
  chatUserList: User[];
  onItemClick?: (chatUser: User) => void;
}
export default function ChatList({ user, chatUserList, onItemClick }: Props) {
  const [filterInput, setFilterInput] = useState("");
  const handleFilterChatUser = (filterInput: string, chatUserList: User[]) => {
    if (filterInput === "") return chatUserList;
    return chatUserList.filter((chatUser) =>
      chatUser.username.toLowerCase().includes(filterInput.toLowerCase())
    );
  };
  const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterInput(e.target.value);
  };
  const handleClick = (chatUser: User) => () => {
    if (onItemClick) onItemClick(chatUser);
  };
  const filterChatUsers = useMemo(
    () => handleFilterChatUser(filterInput, chatUserList),
    [chatUserList, filterInput]
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
        {filterChatUsers.map((chatUser, index) => (
          <ChatItem
            key={index}
            chatUser={chatUser}
            currentUser={user}
            onClick={handleClick(chatUser)}
          />
        ))}
      </div>
    </div>
  );
}
