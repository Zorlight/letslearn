import React from "react";
import CardDashboard from "./card-dashboard";
import ColorItem from "../summary/color-item";
import { MoveUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  title: string;
  value: number;
  type: "up" | "down" | "equal" | "none";
}

export default function CompareCardRange({ className }: Props) {
  return (
    <CardDashboard className={cn("flex flex-col gap-2", className)}>
      <span className="text-sm font-bold text-gray-500">Total quizzes</span>
      <div className="flex flex-row items-center justify-between">
        <span className="text-gray-700 font-bold">7</span>
        <ColorItem className="text-green-600 bg-green-100 flex flex-row items-center gap-1">
          <MoveUp size={10} strokeWidth={3.5} />
          <span>2 quizzes</span>
        </ColorItem>
      </div>
      <span className="w-full text-xs text-gray-300 font-bold text-center">
        Compare to last month (November)
      </span>
    </CardDashboard>
  );
}
