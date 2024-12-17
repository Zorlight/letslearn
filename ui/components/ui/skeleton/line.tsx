import { cn } from "@/lib/utils";
import React from "react";
interface Props {
  className?: string;
}
export default function Line({ className }: Props) {
  return (
    <div
      className={cn(
        "min-w-[200px] min-h-[16px] rounded-full overflow-hidden animate-pulse bg-gray-400",
        className
      )}
    />
  );
}
