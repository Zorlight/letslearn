import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "./line-chart/custom-tooltip";
import { defaultLineChartData } from "./line-chart/static-data";

// Sample data
// const defaultLineChartData = [
//   { name: "Jan", value: 50 },
//   { name: "Feb", value: 60 },
//   { name: "Mar", value: 70 },
//   { name: "Apr", value: 80 },
//   { name: "May", value: 90 },
//   { name: "Jun", value: 100 },
// ]

export type LineChartData = {
  name: string;
  value: number;
};
interface Props {
  data?: LineChartData[];
  lineColor?: string;
}
const CustomLineChart = ({
  data = defaultLineChartData,
  lineColor = "#A855F7",
}: Props) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        {/* Grid lines */}
        <CartesianGrid strokeDasharray="3 3" />

        {/* X Axis */}
        <XAxis
          dataKey="name"
          tick={{ fill: "#6b7280", fontSize: 12 }}
          axisLine={{ stroke: "#ccc" }}
          tickLine={false}
        />

        {/* Y Axis */}
        <YAxis
          domain={[0, 100]}
          tick={{ fill: "#6b7280", fontSize: 12 }}
          axisLine={{ stroke: "#ccc" }}
          tickLine={false}
        />

        {/* Tooltip */}
        <Tooltip content={<CustomTooltip />} />

        {/* Line */}
        <Line
          type="monotone"
          dataKey="value"
          stroke={lineColor}
          strokeWidth={2}
          dot={{ r: 4, stroke: lineColor, fill: "#fff" }}
          activeDot={{ r: 6, stroke: lineColor, fill: "#fff" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
