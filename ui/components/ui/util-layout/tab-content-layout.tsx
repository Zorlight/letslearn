import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
}
export default function TabContentLayout({ children, className }: Props) {
  return (
    <div
      className={cn(
        "z-10 mt-[150px] flex w-full overflow-y-scroll default-scrollbar p-5",
        className
      )}
    >
      <div className="w-full h-[600px] bg-white rounded-md p-5">{children}</div>
    </div>
  );
}
