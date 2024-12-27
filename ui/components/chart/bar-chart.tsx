import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { CustomTooltip } from "./bar-chart/custom-tooltip";
import { nanoid } from "@reduxjs/toolkit";

// Sample data
// const barChartData = [
//   { name: "First assignment", value: 4 },
//   { name: "Introduce to Astronomy special task", value: 1 },
//   { name: "Final project 1", value: 6 },
// ];

export type BarChartData = {
  name: string;
  value: number;
};

interface Props {
  data: BarChartData[];
  barColor?: string;
  type?: "number" | "percent";
}

const HorizontalBarChart = ({
  data,
  barColor = "#1db7c1",
  type = "number",
}: Props) => {
  // Calculate dynamic height
  const barHeight = 65; // Height of each bar, including gaps
  const chartHeight = data.length * barHeight + 50; // Add padding for top and bottom margins
  const filterId = nanoid(4);
  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <BarChart layout="vertical" data={data} barSize={24}>
        {/* SVG Filter for Shadow */}
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="4"
              floodColor={`${barColor}75`} // 50% opacity
            />
          </filter>
        </defs>
        {/* Grid */}
        <CartesianGrid />
        {/* X-Axis */}
        <XAxis
          type="number"
          domain={type === "number" ? [0, 10] : [0, 100]}
          axisLine={{ stroke: "#ccc" }}
          tick={{ fill: "#6b7280", fontSize: 12 }}
          tickFormatter={(tick) => (type === "number" ? tick : `${tick}%`)} // Thêm ký tự %
        />
        {/* Y-Axis */}
        <YAxis type="category" dataKey="name" width={0} tick={false} />
        {/* Tooltip */}
        <Tooltip
          content={<CustomTooltip color={barColor} />}
          cursor={{ fill: "transparent" }}
        />
        {/* Bars */}
        <Bar
          dataKey="value"
          fill={barColor}
          radius={[0, 6, 6, 0]} // Rounded corners
          background={{ fill: "#e5e7eb" }}
          style={{ filter: `url(#${filterId})` }} // Apply shadow
        >
          {/* Render Labels in Top Left of Bar */}
          <LabelList
            dataKey="name"
            position="insideLeft"
            style={{
              fontWeight: "bold",
              fontSize: 12,
            }}
            content={({ x, y, value }: any) => (
              <text
                x={x + 10} // Adjust horizontal position
                y={y - 5} // Adjust vertical position to be above bar
                fill="#6b7280"
                fontSize={12}
                fontWeight="bold"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {value}
              </text>
            )}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalBarChart;
