import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";

interface Props {
  checked?: boolean;
}
export default function Tick({ checked = false }: Props) {
  return (
    <div className="relative w-4 h-4 flex items-center justify-center bg-blue-100 rounded-full overflow-hidden">
      <Check
        size={14}
        className={cn(
          "absolute top-[2px] text-blue-800 transition-all duration-200",
          !checked && "opacity-0"
        )}
      />
    </div>
  );
}
