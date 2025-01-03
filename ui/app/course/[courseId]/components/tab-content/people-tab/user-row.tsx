import Avatar from "@/components/ui/simple/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/lib/shadcn/tooltip";
import { User } from "@/models/user";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import React from "react";
import { toast } from "react-toastify";

interface Props {
  user: User;
}
export default function UserRow({ user }: Props) {
  const handleClick = () => {
    navigator.clipboard.writeText(user.email);
    toast.success("Email copied to clipboard");
  };
  return (
    <TooltipProvider delayDuration={50}>
      <Tooltip>
        <TooltipTrigger>
          <div
            className="flex flex-row items-center gap-2 px-4"
            onClick={handleClick}
          >
            <Avatar src={user.avatar} className="w-12" />
            <span className="text-cyan-500 font-bold text-sm">
              {user.username}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="w-fit max-w-[350px] truncate px-2 py-1 rounded-md bg-black text-white pointer-events-none">
          {user.email}
          <TooltipArrow />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
