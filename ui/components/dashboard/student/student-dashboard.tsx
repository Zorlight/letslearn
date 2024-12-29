import React from "react";
import CompareCardValue from "../card-dashboard/compare-card-value";
import RankLogo from "../ranking/rank-logo";
import CardDashboard from "../card-dashboard/card-dashboard";
import CustomLineChart from "@/components/chart/line-chart";
import {
  sampleAvgQuizMarkLineChartData,
  sampleTopAssignmentMarkData,
  sampleTopQuizMarkData,
} from "./static-data";
import HorizontalBarChart from "@/components/chart/bar-chart";

interface Props {
  report: any;
}
export default function StudentDashboard({ report }: Props) {
  const getPlaceInCourseText = (num: number) => {
    if (num === 1) return "1st";
    if (num === 2) return "2nd";
    if (num === 3) return "3rd";
    return `${num}th`;
  };
  return (
    <div className="grid grid-cols-4 gap-5">
      <CompareCardValue
        className="col-span-1"
        title="Completed activity"
        value={7}
      />
      <CompareCardValue
        className="col-span-1"
        title="Avg quiz mark"
        value={<MarkWithRankLogo mark={7.9} max={10} />}
      />
      <CompareCardValue
        className="col-span-1"
        title="Avg assignment mark"
        value={<MarkWithRankLogo mark={80} max={100} />}
      />
      <CompareCardValue
        className="col-span-1"
        title="Place in course"
        value={getPlaceInCourseText(8)}
      />
      <CardDashboard className="col-span-3 row-span-3 row-start-2 col-start-1 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">Avg quiz mark in last 6 months</h6>
        <CustomLineChart
          data={sampleAvgQuizMarkLineChartData}
          lineColor="#db2777"
        />
      </CardDashboard>
      <CompareCardValue
        className="col-span-1 row-span-1 row-start-2 col-start-4"
        title="Total quiz"
        value={5}
      />
      <CompareCardValue
        className="col-span-1 row-span-1 row-start-3 col-start-4"
        title="Quiz to do"
        value="2 quizzes"
      />
      <CompareCardValue
        className="col-span-1 row-span-1 row-start-4 col-start-4"
        title="Next quiz will end on"
        value="2021-12-31"
      />

      <CompareCardValue
        className="col-span-1 row-span-1 row-start-5 col-start-1"
        title="Total assignment"
        value={5}
      />
      <CompareCardValue
        className="col-span-1 row-span-1 row-start-6 col-start-1"
        title="Assignment to do"
        value="2 quizzes"
      />
      <CompareCardValue
        className="col-span-1 row-span-1 row-start-7 col-start-1"
        title="Next assignment will end on"
        value="2021-12-31"
      />
      <CardDashboard className="col-span-3 row-span-3 row-start-5 col-start-2 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">
          Avg assignment mark in last 6 months
        </h6>
        <CustomLineChart
          data={sampleAvgQuizMarkLineChartData}
          lineColor="#7e22ce"
        />
      </CardDashboard>
      <CardDashboard className="col-span-2 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">Top quiz mark</h6>
        <HorizontalBarChart
          data={sampleTopQuizMarkData}
          type="percent"
          unit="Mark"
        />
      </CardDashboard>
      <CardDashboard className="col-span-2 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">Top assignment mark</h6>
        <HorizontalBarChart
          data={sampleTopAssignmentMarkData}
          type="number"
          unit="Mark"
          barColor="#7e22ce"
          maxValue={100}
        />
      </CardDashboard>
    </div>
  );
}

const MarkWithRankLogo = ({ mark, max }: { mark: number; max: number }) => {
  let rank: "S" | "A" | "B" | "C" = "S";
  const percent = mark / max;
  console.log(percent);
  if (percent >= 0.8) rank = "S";
  else if (percent >= 0.5) rank = "A";
  else if (percent >= 0.2) rank = "B";
  else rank = "C";
  return (
    <div className="flex flex-row items-center gap-2">
      <span className="text-gray-700 font-bold">{mark}</span>
      <RankLogo rank={rank} />
    </div>
  );
};
