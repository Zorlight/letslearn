import { cn } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";

interface Props {
  date: Date;
  isSelected?: boolean;
}
export default function DateNumber({ date, isSelected = false }: Props) {
  return (
    <div className="flex flex-col items-center gap-1 text-gray-500">
      <span
        className={cn("text-sm font-semibold", isSelected && "text-blue-700")}
      >
        {format(date, "EEE")}
      </span>
      <div
        className={cn(
          "flex items-center justify-center p-2 rounded-full transition-all duration-200",
          !isSelected && "group-hover:bg-blue-100 group-hover:text-blue-700",
          isSelected && "bg-blue-700 text-white"
        )}
      >
        <span className="h-[24px] text-xl font-bold">{format(date, "dd")}</span>
      </div>
    </div>
  );
}
