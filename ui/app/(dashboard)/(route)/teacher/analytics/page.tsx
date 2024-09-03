import React from "react";
import Datacard from "./_components/datacard";
import Chart from "./_components/chart";
import { chartDataList } from "./_components/fake-data";

const AnalyticPage = () => {
  const revenue = chartDataList.reduce((acc, curr) => acc + curr.value, 0);
  const sales = chartDataList.length;
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-indigo-900">
        <Datacard label="Total Revenue" value={revenue} shouldFormat />
        <Datacard label="Total Sales" value={sales} />
      </div>
      <Chart data={chartDataList} />
    </div>
  );
};

export default AnalyticPage;
