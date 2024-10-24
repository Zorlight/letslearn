import { Button } from "@/lib/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/shadcn/dropdown-menu";
import { cn } from "@/lib/utils";
import { CirclePlus, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {}
export default function CreateMeetingDialog({}: Props) {
  const path = usePathname();
  const isInCreateCoursePage = path.includes("/course/create");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={cn("rounded-full", isInCreateCoursePage && "bg-indigo-600")}
      >
        <Plus size={20} className={cn(isInCreateCoursePage && "text-white")} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="mt-3 bg-white font-sans z-50"
      >
        <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer ease-linear duration-100">
          <CirclePlus size={16} />
          <p>A new question</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer ease-linear duration-100">
          <CirclePlus size={16} />
          <p>From question bank</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
