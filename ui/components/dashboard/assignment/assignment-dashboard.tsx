import React from "react";
import CustomPieChart from "@/components/chart/pie-chart";
import RankItem from "../ranking/rank-item";
import { fakeUserList } from "@/fake-data/user";
import AssignmentDashboardSummary from "./assignment-summary";

const fileTypeSubmisisonData = [
  { name: ".zip", value: 60, color: "#EC4899" },
  { name: ".docx", value: 20, color: "#3B82F6" },
  { name: ".pdf", value: 30, color: "#EF4444" },
  { name: ".xlsx", value: 10, color: "#22C55E" },
];
const sampleStudentMarkData = [
  { name: "80 - 100%", value: 25, color: "#22C55E" },
  { name: "50 - 79%", value: 10, color: "#06B6D4" },
  { name: "20 - 49%", value: 5, color: "#3B82F6" },
  { name: "0 - 19%", value: 5, color: "#EAB308" },
  { name: "Not attempted", value: 5, color: "#6B7280" },
];

interface Props {}
export default function AssignmentDashboard({}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <AssignmentDashboardSummary />

      <div className="flex flex-row gap-4">
        <div className="w-full flex flex-col gap-4 p-4">
          <h6 className="text-orange-500">File type submission</h6>
          <CustomPieChart
            data={fileTypeSubmisisonData}
            title="Total submissions"
          />
        </div>
        <div className="w-full flex flex-col gap-4 p-4">
          <h6 className="text-orange-500">Graded assignments</h6>
          <CustomPieChart
            data={sampleStudentMarkData}
            title="Total questions"
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 p-4">
        <h6 className="text-orange-500">Student mark</h6>
        <div className="flex flex-col gap-2">
          <RankItem rank="S" students={fakeUserList} />
          <RankItem rank="A" students={fakeUserList} />
          <RankItem rank="B" students={fakeUserList} />
          <RankItem rank="C" students={fakeUserList} />
        </div>
      </div>
    </div>
  );
}
