import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  title: string;
  isSelected: boolean;
  onClick?: () => void;
}
const Tab = ({ title, isSelected, onClick }: Props) => {
  return (
    <div
      className={cn(
        "w-fit px-4 py-2 border-b-2 border-transparent transition-all duration-300 text-indigo-950 hover:bg-slate-100 hover:text-indigo-900 cursor-pointer",
        isSelected && "border-indigo-700 text-indigo-700"
      )}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default Tab;
