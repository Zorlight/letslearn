"use client";
import { Card } from "@/lib/shadcn/card";
import { ChartData } from "@/models/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
  data: ChartData[];
}

const Chart = ({ data }: Props) => {
  return (
    <Card className="p-6">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#000000"
            fontSize={12}
            tickLine={false}
            axisLine={true}
          />
          <YAxis
            stroke="#000000"
            fontSize={12}
            tickLine={true}
            axisLine={true}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar dataKey="value" fill="#312e81" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <p></p>
    </Card>
  );
};

export default Chart;
