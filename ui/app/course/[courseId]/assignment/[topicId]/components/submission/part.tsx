import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  title: string;
  children: any;
  titleClassName?: string;
  className?: string;
}
export default function Part({
  title,
  children,
  titleClassName,
  className,
}: Props) {
  return (
    <div className={cn("w-full flex flex-col gap-4", className)}>
      <h5 className={cn("text-blue-700", titleClassName)}>{title}</h5>
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
