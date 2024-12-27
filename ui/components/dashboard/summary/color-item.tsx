import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}
export default function ColorItem({ children, className }: Props) {
  return (
    <div
      className={cn(
        "h-fit bg-gray-100 px-2 rounded-xl text-xs font-bold",
        className
      )}
    >
      {children}
    </div>
  );
}
