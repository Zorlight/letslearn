"use client";
import IconButton from "@/components/buttons/icon-button";
import { Input } from "@/lib/shadcn/input";
import getStompClient from "@/lib/socket/sockjs";
import { cn } from "@/lib/utils";
import { Conversation, SocketMessage } from "@/models/conversation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeChatBox, openChatBox } from "@/redux/slices/chat";
import { getConversation } from "@/services/conversation";
import { CompatClient } from "@stomp/stompjs";
import { SendHorizonal, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Avatar from "../simple/avatar";
import LeftMessage from "./message/left-message";
import RightMessage from "./message/right-message";
import ChatboxSkeleton from "./skeleton/chatbox-skeleton";

export default function ChatBox() {
  const messageBoxRef = React.useRef<HTMLDivElement>(null);
  const [stompClient, setStompClient] = useState<CompatClient>();
  const messageInputRef = React.useRef<HTMLInputElement>(null);
  const open = useAppSelector((state) => state.chat.isChatBoxOpen);
  const chatUserId = useAppSelector((state) => state.chat.chatUserId);
  const [conversation, setConversation] = useState<Conversation>();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    localStorage.removeItem("chat-user-id");
    dispatch(closeChatBox());
  };

  const sendMessage = (message: SocketMessage) => {
    if (!stompClient || !stompClient.connected) return;
    stompClient.send(
      `/app/sendMessage/${message.conversationId}`,
      {},
      JSON.stringify(message)
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!messageInputRef.current) return;
    messageInputRef.current.value = e.target.value;
  };
  const handleSendMessage = () => {
    if (!messageInputRef.current) return;
    if (!conversation) return;
    if (messageInputRef.current.value === "") return;
    const message: SocketMessage = {
      senderId: conversation.user1.id,
      content: messageInputRef.current.value,
      conversationId: conversation.id,
    };
    sendMessage(message);

    messageInputRef.current.value = "";
  };

  const handleReceiveMessage = (message: any) => {
    if (!conversation) return;
    const parseData = JSON.parse(message.body);

    setConversation((prev) => {
      if (!prev) return;
      return { ...prev, messages: [...prev.messages, parseData] };
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
  };
  const handleGetConversationSuccess = (data: Conversation) => {
    setConversation(data);
  };
  const handleFail = (error: any) => {
    toast.error(error);
  };

  useEffect(() => {
    if (chatUserId) {
      getConversation(chatUserId, handleGetConversationSuccess, handleFail);

      dispatch(openChatBox(chatUserId));
    } else dispatch(closeChatBox());
  }, [chatUserId]);

  useEffect(() => {
    if (!conversation) return;
    if (!stompClient) {
      setStompClient(getStompClient());
      return;
    }

    stompClient.connect({}, (frame: any) => {
      console.log("Connected:", frame);

      stompClient.subscribe(
        `/topic/conversation/${conversation.id}`,
        (message: any) => handleReceiveMessage(message)
      );
    });
  }, [conversation, stompClient]);

  useEffect(() => {
    const storageChatUserId = localStorage.getItem("chat-user-id");
    if (storageChatUserId) dispatch(openChatBox(storageChatUserId));
  }, []);

  useEffect(() => {
    if (!messageBoxRef.current) return;
    messageBoxRef.current.scrollTo(0, messageBoxRef.current.scrollHeight);
  }, [conversation]);

  if (!conversation)
    return <ChatboxSkeleton open={open} onClose={handleClose} />;

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
            <Avatar src={conversation.user2.avatar} />
            <span className="font-bold text-gray-700">
              {conversation.user2.username}
            </span>
          </div>
          <XIcon
            size={20}
            className="text-gray-500 hover:opacity-75 cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <div
          ref={messageBoxRef}
          className="flex flex-col gap-1 h-full p-2 pb-4 default-scrollbar"
        >
          {conversation.messages.map((message, index) => {
            if (message.sender.id === conversation.user1.id)
              return <RightMessage key={index} message={message} />;
            return <LeftMessage key={index} message={message} />;
          })}
        </div>
        <div className="w-full h-fit flex flex-row items-center gap-1 p-2">
          <Input
            ref={messageInputRef}
            className="w-full rounded-full"
            placeholder="Type message"
            onChange={handleInputChange}
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
