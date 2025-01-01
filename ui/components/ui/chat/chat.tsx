"use client";
import IconButton from "@/components/buttons/icon-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/lib/shadcn/dropdown-menu";
import { User } from "@/models/user";
import { useAppDispatch } from "@/redux/hooks";
import { openChatBox } from "@/redux/slices/chat";
import { getAllUsers } from "@/services/user";
import { MessageSquare } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import ChatList from "./chat-list";
interface Props {
  user: User;
}
export default function Chat({ user }: Props) {
  const [open, setOpen] = React.useState(false);
  const [chatUserList, setChatUserList] = React.useState<User[]>([]);
  const dispatch = useAppDispatch();
  const handleItemClick = (chatUser: User) => {
    setOpen(false);
    localStorage.setItem("chat-user-id", chatUser.id);
    dispatch(openChatBox(chatUser.id));
  };

  useEffect(() => {
    const handleSuccess = (users: User[]) => {
      setChatUserList(users);
    };
    const handleError = (error: any) => {
      toast.error(error);
    };

    getAllUsers(handleSuccess, handleError);
  }, []);
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
          chatUserList={chatUserList}
          user={user}
          onItemClick={handleItemClick}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
