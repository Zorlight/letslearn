import { cn } from "@/lib/utils";
import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { CustomLegend } from "./pie-chart/custom-legend";
import { CustomTooltip } from "./pie-chart/custom-tooltip";
import { nanoid } from "@reduxjs/toolkit";

export type PieChartData = {
  name: string;
  value: number;
  color: string;
};

// Sample data
// const data = [
//   { name: "Multiple choice", value: 25, color: "#f05482" },
//   { name: "True false", value: 10, color: "#a684f4" },
//   { name: "Short answer", value: 5, color: "#ff914d" },
// ];

interface Props {
  data: PieChartData[];
  title: string;
  className?: string;
  unitForPlural: string;
  unitForSingular: string;
}
export default function CustomPieChart({
  data,
  title,
  className,
  unitForPlural,
  unitForSingular,
}: Props) {
  const total = data.reduce((acc, cur) => acc + cur.value, 0);
  console.log("total", total);
  const filterId = nanoid();
  return (
    <div
      className={cn(
        "flex flex-row gap-4 items-center justify-center",
        className
      )}
    >
      <div className="relative flex items-center justify-center">
        <PieChart width={225} height={225} className="z-10">
          <defs>
            {data.map((entry, index) => (
              <filter
                key={`shadow-${filterId}-${index}`}
                id={`shadow-${filterId}-${index}`}
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feDropShadow
                  dx=""
                  dy="4"
                  stdDeviation="6"
                  floodColor={`${entry.color}75`} // 50% opacity
                />
              </filter>
            ))}
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            dataKey="value"
            paddingAngle={0.5}
            cornerRadius={10}
            startAngle={90} // Start at 12 o'clock
            endAngle={-270} // Rotate clockwise
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke="#00000000"
                style={{ filter: `url(#shadow-${filterId}-${index})` }} // Apply shadow with matching color
              />
            ))}
          </Pie>
          <Tooltip
            content={
              <CustomTooltip
                total={total}
                unitForPlural={unitForPlural}
                unitForSingular={unitForSingular}
              />
            }
          />
        </PieChart>
        <div className="absolute z-0 bg-white flex flex-col items-center justify-center rounded-full w-[100px] h-[100px] shadow-[0px_0px_12px_0px_#00000025]">
          <span className="text-xs font-bold text-gray-500 w-full text-center px-1">
            {title}
          </span>
          <span className="text-2xl font-bold text-gray-700 text-center">
            {total || 0}
          </span>
        </div>
      </div>
      <CustomLegend data={data} />
    </div>
  );
}
