import { cn } from "@/lib/utils";

interface Props {
  color: "green" | "cyan" | "blue" | "yellow" | "gray";
  percent?: number;
  className?: string;
}
const lineColors = {
  green: "bg-green-500",
  cyan: "bg-cyan-500",
  blue: "bg-blue-500",
  yellow: "bg-yellow-500",
  gray: "bg-gray-500",
};

export const Line = ({ color = "gray", className, percent }: Props) => {
  return (
    <div
      style={{ width: `${percent}%` }}
      className={cn(
        "w-full flex h-2 min-w-5 rounded-full",
        lineColors[color],
        className
      )}
    />
  );
};
