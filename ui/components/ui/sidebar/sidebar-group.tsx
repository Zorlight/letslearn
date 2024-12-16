import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  hasBorder?: boolean;
}
export default function SidebarGroup({
  children,
  className,
  hasBorder = true,
}: Props) {
  return (
    <div
      className={cn(
        "w-full pr-5 py-3",
        hasBorder && "border-t-[0.5px] border-gray-400",
        className
      )}
    >
      {children}
    </div>
  );
}
