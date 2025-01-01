import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
  color?: string;
}
export default function MiniTableRow({ title, children, color }: Props) {
  return (
    <div
      className={cn(
        "flex flex-row items-center gap-3 py-2 px-4",
        color ? color : "odd:bg-gray-100 hover:bg-gray-50"
      )}
    >
      <span className="font-semibold max-w-[200px] w-1/2">{title}</span>
      <p className="text-slate-600 text-sm">{children}</p>
    </div>
  );
}
