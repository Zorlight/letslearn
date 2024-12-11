import React from "react";
import DateNumber from "./date-number";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Props {
  date: Date;
  selectedDate?: Date;
  className?: string;
}
export default function DateLayout({ date, selectedDate, className }: Props) {
  const isSelected = selectedDate
    ? format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
    : false;
  return (
    <div
      className={cn(
        "w-full flex flex-col items-center py-3 border-[0.5px] border-blue-800 group cursor-pointer",
        className
      )}
    >
      <DateNumber date={date} isSelected={isSelected} />
    </div>
  );
}
