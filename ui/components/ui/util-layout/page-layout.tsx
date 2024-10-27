import { cn } from "@/lib/utils";
import React from "react";
interface Props {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
}
export default function PageLayout({ children, className }: Props) {
  return (
    <div
      className={cn("relative flex w-full h-full default-scrollbar", className)}
    >
      {children}
    </div>
  );
}
