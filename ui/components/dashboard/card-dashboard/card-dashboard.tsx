import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}
export default function CardDashboard({ children, className }: Props) {
  return (
    <div className={cn("p-4 rounded-xl bg-white shadow-md", className)}>
      {children}
    </div>
  );
}
