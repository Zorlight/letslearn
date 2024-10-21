import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React from "react";

interface Props {
  courseName: string;
  category: string;
  image: React.ReactNode;
  className?: string;
}
export default function SidebarCourseItem({
  courseName,
  category,
  image,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "relative flex flex-row items-center gap-6 text-gray-500 pl-8 py-3",
        className
      )}
    >
      {image}
      <div className="w-full flex flex-col">
        <span className="font-bold">{courseName}</span>
        <span>{category}</span>
      </div>
    </div>
  );
}
