import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React from "react";

interface Props {
  title: string;
  icon: any;
  className?: string;
}
export default function SidebarItem({ title, icon, className }: Props) {
  return (
    <div
      className={cn(
        "relative flex flex-row items-center gap-6 text-gray-500 pl-9 py-3",
        className
      )}
    >
      {icon}
      <span className="font-bold text-sm">{title}</span>
    </div>
  );
}
