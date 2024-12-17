import { Bell, Menu, MessageSquare } from "lucide-react";
import React from "react";
import Line from "../skeleton/line";
import Circle from "../skeleton/circle";
import IconButton from "@/components/buttons/icon-button";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}
export default function NavbarSkeleton({ className }: Props) {
  return (
    <div
      className={cn(
        "w-full h-[60px] px-9 flex flex-row items-center justify-between bg-white border-b-[0.5px] border-gray-400 text-gray-700",
        className
      )}
    >
      <div className="flex flex-row items-center gap-6">
        <Menu size={20} />
        <Line className="min-w-[80px]" />
      </div>
      <div className="flex flex-row items-center gap-1">
        <IconButton>
          <Bell size={20} />
        </IconButton>
        <IconButton>
          <MessageSquare size={20} />
        </IconButton>
        <Circle className="ml-3 min-w-[36px] min-h-[36px]" />
      </div>
    </div>
  );
}
