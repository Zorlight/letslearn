import { cn } from "@/lib/utils";
import React from "react";
interface Props {
  className?: string;
}
export default function Circle({ className }: Props) {
  return (
    <div
      className={cn(
        "min-w-[48px] min-h-[48px] rounded-full overflow-hidden animate-pulse bg-gray-400",
        className
      )}
    />
  );
}
