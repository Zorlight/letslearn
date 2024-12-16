import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
}
export default function Rectangle({ className }: Props) {
  return (
    <div
      className={cn(
        "min-w-[200px] min-h-[200px] rounded-lg overflow-hidden animate-pulse bg-gray-400",
        className
      )}
    />
  );
}
