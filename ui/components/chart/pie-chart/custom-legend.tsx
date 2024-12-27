import { cn } from "@/lib/utils";
import { PieChartData } from "../pie-chart";

interface Props {
  data: PieChartData[];
}
export const CustomLegend = ({ data }: Props) => (
  <div className="flex flex-col gap-2">
    {data.map((entry) => (
      <div key={entry.name} className="flex flex-row items-center gap-2">
        <div
          className={cn("w-3 h-3 rounded-full")}
          style={{
            backgroundColor: entry.color,
            boxShadow: `0px 4px 6px 0px ${entry.color}50`,
          }}
        />
        <span className="font-bold text-sm text-gray-500">{entry.name}</span>
      </div>
    ))}
  </div>
);
