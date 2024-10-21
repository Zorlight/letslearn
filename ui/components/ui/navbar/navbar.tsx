import { Bell, Menu, MessageSquare, Plus } from "lucide-react";
import React from "react";
import Avatar from "../simple/avatar";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}
export default function Navbar({ className }: Props) {
  return (
    <div
      className={cn(
        "h-[60px] px-9 flex flex-row items-center justify-between bg-white border-b-[0.5px] border-gray-400 text-gray-700",
        className
      )}
    >
      <Menu size={20} />
      <div className="flex flex-row items-center gap-6">
        <Plus size={20} />
        <Bell size={20} />
        <MessageSquare size={20} />
        <Avatar />
      </div>
    </div>
  );
}
