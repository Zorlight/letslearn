import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
export default function NavbarButtonLayout({
  children,
  className,
  onClick,
}: Props) {
  return (
    <div
      className={cn(
        "p-3 rounded-full hover:bg-gray-100 cursor-pointer transition-all duration-200",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
