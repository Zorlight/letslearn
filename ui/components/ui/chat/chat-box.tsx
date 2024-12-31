"use client";
import IconButton from "@/components/buttons/icon-button";
import { fakeMessages } from "@/fake-data/message";
import { fakeUser } from "@/fake-data/user";
import { Input } from "@/lib/shadcn/input";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeChatBox, openChatBox } from "@/redux/slices/chat";
import { SendHorizonal, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Avatar from "../simple/avatar";
import LeftMessage from "./message/left-message";
import RightMessage from "./message/right-message";

export default function ChatBox() {
  const [messageInput, setMessageInput] = useState("");
  const open = useAppSelector((state) => state.chat.isChatBoxOpen);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    localStorage.removeItem("chat-open");
    dispatch(closeChatBox());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };
  const handleSendMessage = () => {
    if (messageInput === "") return;

    // send logic here

    setMessageInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
  };
  useEffect(() => {
    const isOpen = localStorage.getItem("chat-open");

    if (isOpen) dispatch(openChatBox());
    else dispatch(closeChatBox());
  }, []);

  const chatUser = fakeUser;
  const chatMessages = fakeMessages;

  return (
    <div
      className={cn(
        "absolute right-10 bottom-0 h-screen max-h-[500px] w-full max-w-[350px] bg-white rounded-t-md shadow-lg border-[0.5px] border-gray-300 transition-all duration-300 overflow-hidden z-10",
        !open && "h-0"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="w-full h-fit flex flex-row items-stretch justify-between shadow p-2">
          <div className="flex flex-row items-center gap-2">
            <Avatar src={chatUser.avatar} />
            <span className="font-bold text-gray-700">{chatUser.username}</span>
          </div>
          <XIcon
            size={20}
            className="text-gray-500 hover:opacity-75 cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <div className="flex flex-col gap-1 h-full p-2 pb-4 default-scrollbar">
          {chatMessages.map((message, index) => {
            if (message.sender.id === chatUser.id)
              return <RightMessage key={index} message={message} />;
            return <LeftMessage key={index} message={message} />;
          })}
        </div>
        <div className="w-full h-fit flex flex-row items-center gap-1 p-2">
          <Input
            className="w-full rounded-full"
            placeholder="Type message"
            onChange={handleInputChange}
            value={messageInput}
            onKeyDown={handleKeyDown}
          />
          <IconButton className="p-2 group" onClick={handleSendMessage}>
            <SendHorizonal
              size={24}
              className="text-gray-400 group-hover:text-gray-500 ease-linear duration-200"
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
