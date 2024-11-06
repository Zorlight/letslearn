import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  title: string;
  children: any;
  className?: string;
}
export default function Part({ title, children, className }: Props) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <h4 className="text-blue-700">{title}</h4>
      <div>{children}</div>
    </div>
  );
}
