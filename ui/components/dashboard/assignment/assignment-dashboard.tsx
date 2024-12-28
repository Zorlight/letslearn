import React from "react";
import CustomPieChart from "@/components/chart/pie-chart";
import RankItem from "../ranking/rank-item";
import { fakeUserList } from "@/fake-data/user";
import AssignmentDashboardSummary from "./assignment-summary";
import { AssignmentReport, ChartDataObject } from "@/models/report";
import { AssignmentTopic } from "@/models/topic";
import { fileTypeColor } from "./static-data";

const sampleFileTypeSubmisisonData = [
  { name: ".zip", value: 60, color: "#EC4899" },
  { name: ".docx", value: 20, color: "#3B82F6" },
  { name: ".pdf", value: 30, color: "#EF4444" },
  { name: ".xlsx", value: 10, color: "#22C55E" },
];
const sampleGradedSubmissionData = [
  { name: "80 - 100%", value: 25, color: "#22C55E" },
  { name: "50 - 79%", value: 10, color: "#06B6D4" },
  { name: "20 - 49%", value: 5, color: "#3B82F6" },
  { name: "0 - 19%", value: 5, color: "#EAB308" },
  { name: "Not graded", value: 5, color: "#6B7280" },
];

interface Props {
  report: AssignmentReport;
}
export default function AssignmentDashboard({ report }: Props) {
  const {
    studentWithMarkOver8,
    studentWithMarkOver5,
    studentWithMarkOver2,
    studentWithMarkOver0,
  } = report;
  const handleGetFileTypeSubmissionData = (report: AssignmentReport) => {
    let data = [];
    const { fileTypeCount } = report;
    for (const key in fileTypeCount) {
      let color = "";
      if (key in fileTypeColor) color = fileTypeColor[key];
      else color = fileTypeColor["other"];
      data.push({ name: key, value: fileTypeCount[key], color });
    }

    return data;
  };
  const handleGetGradedSubmissionData = (obj: ChartDataObject) => {
    if (!obj) return sampleGradedSubmissionData;
    const data = [...sampleGradedSubmissionData];
    data[0].value = obj[8];
    data[1].value = obj[5];
    data[2].value = obj[2];
    data[3].value = obj[0];
    data[4].value = obj["-1"];
    return data;
  };

  const fileTypeSubmisisonChartData = handleGetFileTypeSubmissionData(report);
  const gradedSubmissionChartData = handleGetGradedSubmissionData(
    report.markDistributionCount
  );

  return (
    <div className="flex flex-col gap-2">
      <AssignmentDashboardSummary report={report} />

      <div className="flex flex-row gap-4">
        <div className="w-full flex flex-col gap-4 p-4">
          <h6 className="text-orange-500">File type submission</h6>
          <CustomPieChart
            data={fileTypeSubmisisonChartData}
            title="Total file"
            unitForPlural="files"
            unitForSingular="file"
          />
        </div>
        <div className="w-full flex flex-col gap-4 p-4">
          <h6 className="text-orange-500">Graded submission</h6>
          <CustomPieChart
            data={gradedSubmissionChartData}
            title="Total submission"
            unitForPlural="submissions"
            unitForSingular="submission"
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 p-4">
        <h6 className="text-orange-500">Student mark</h6>
        <div className="flex flex-col gap-2">
          <RankItem rank="S" studentWithMarks={studentWithMarkOver8} />
          <RankItem rank="A" studentWithMarks={studentWithMarkOver8} />
          <RankItem rank="B" studentWithMarks={studentWithMarkOver8} />
          <RankItem rank="C" studentWithMarks={studentWithMarkOver8} />
        </div>
      </div>
    </div>
  );
}
