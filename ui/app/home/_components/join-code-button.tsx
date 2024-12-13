import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import React from "react";

interface Props {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}
export default function JoinCodeButton({ open, onOpenChange }: Props) {
  const handleClick = () => {
    if (onOpenChange) onOpenChange(true);
  };
  return (
    <div
      className={cn(
        "w-[50px] h-[50px] flex items-center justify-center border-[0.5px] border-gray-200 hover:bg-gray-100 rounded-md overflow-hidden shadow hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer",
        open && "scale-0 opacity-0 absolute"
      )}
    >
      <Plus size={32} className="text-gray-500" onClick={handleClick} />
    </div>
  );
}
