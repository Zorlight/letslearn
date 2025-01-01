import { cn } from "@/lib/utils";
import React from "react";
import Circle from "../../skeleton/circle";
import Rectangle from "../../skeleton/rectangle";
import { SendHorizonal, XIcon } from "lucide-react";
import { Input } from "@/lib/shadcn/input";
import IconButton from "@/components/buttons/icon-button";

interface Props {
  open: boolean;
  onClose?: () => void;
}
export default function ChatboxSkeleton({ open, onClose }: Props) {
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
            <Circle className="w-8 h-8" />
            <Rectangle className="min-w-32 min-h-4" />
          </div>
          <XIcon
            size={20}
            className="text-gray-500 hover:opacity-75 cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="flex flex-col gap-1 h-full p-2 pb-4 default-scrollbar">
          {[1, 2, 1, 1, 2, 2, 2, 1, 2].map((item) => (
            <div
              key={item}
              className={cn(
                "w-full flex flex-row justify-start",
                item % 2 === 0 && "justify-end"
              )}
            >
              <Rectangle key={item} className="min-w-32 min-h-7 rounded-full" />
            </div>
          ))}
        </div>
        <div className="w-full h-fit flex flex-row items-center gap-1 p-2">
          <Input className="w-full rounded-full" placeholder="Type message" />
          <IconButton className="p-2 group">
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
