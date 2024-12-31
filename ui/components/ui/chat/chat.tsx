"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/lib/shadcn/dropdown-menu";
import { User } from "@/models/user";
import React from "react";
import ChatList from "./chat-list";
import { fakeMessages } from "@/fake-data/message";
import { ChatMessage } from "@/models/message";
import { useAppDispatch } from "@/redux/hooks";
import { openChatBox } from "@/redux/slices/chat";
import IconButton from "@/components/buttons/icon-button";
import { MessageSquare } from "lucide-react";
interface Props {
  user: User;
}
export default function Chat({ user }: Props) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const handleItemClick = (message: ChatMessage) => {
    setOpen(false);
    localStorage.setItem("chat-open", "true");
    dispatch(openChatBox());
  };
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="outline-0">
        <IconButton>
          <MessageSquare size={20} />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="h-screen max-h-[500px] min-w-[350px] bg-white rounded-md shadow-lg p-2 border-[0.5px] border-gray-300"
      >
        <ChatList
          messages={fakeMessages}
          user={user}
          onItemClick={handleItemClick}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
