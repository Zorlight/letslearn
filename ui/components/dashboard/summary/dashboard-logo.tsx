import { cn } from "@/lib/utils";
import { Activity } from "lucide-react";
import React from "react";

interface Props {
  type: "quiz" | "assignment";
}
export default function DashboardLogo({ type }: Props) {
  return (
    <div
      className={cn(
        "w-fit h-fit p-2 rounded-xl text-white",
        type === "quiz" && "bg-quiz shadow-[0px_0px_4px_2px_#db277750]",
        type === "assignment" &&
          "bg-assignment shadow-[0px_0px_4px_2px_##7e22ce50]"
      )}
    >
      <Activity />
    </div>
  );
}
