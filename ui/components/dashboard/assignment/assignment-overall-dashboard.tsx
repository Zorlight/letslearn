import HorizontalBarChart from "@/components/chart/bar-chart";
import CustomPieChart from "@/components/chart/pie-chart";
import { AssignmentOverallReport, ChartDataObject } from "@/models/report";
import { format } from "date-fns";
import CardDashboard from "../card-dashboard/card-dashboard";
import CompareCardValue from "../card-dashboard/compare-card-value";
import { fileTypeColor } from "./static-data";
import RankItem from "../ranking/rank-item";
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
const sampleAvgMarkData = [
  { name: "First assignment", value: 9 },
  { name: "Introduce to Astronomy", value: 9 },
  { name: "Final project", value: 7 },
];

const sampleAvgCompletionRateData = [
  { name: "First assignment", value: 90 },
  { name: "Introduce to Astronomy", value: 90 },
  { name: "Final project", value: 70 },
];

interface Props {
  report: AssignmentOverallReport;
}

export default function AssignmentOverallDashboard({ report }: Props) {
  const {
    assignmentCount,
    avgCompletionRate,
    closestNextEndAssignment,
    studentWithMarkOver8,
    studentWithMarkOver5,
    studentWithMarkOver2,
    studentWithMarkOver0,
  } = report;

  const handleGetFileTypeSubmissionData = (report: AssignmentOverallReport) => {
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

  const handleGetAvgMarkData = (
    assignmentOverallReport: AssignmentOverallReport
  ) => {
    const { singleAssignmentReports } = assignmentOverallReport;
    return singleAssignmentReports.map((assignment) => ({
      name: assignment.name,
      value: assignment.avgMark,
    }));
  };

  const handleGetCompletionRateData = (
    assignmentOverallReport: AssignmentOverallReport
  ) => {
    const { singleAssignmentReports } = assignmentOverallReport;
    return singleAssignmentReports.map((assignment) => ({
      name: assignment.name,
      value: assignment.completionRate * 100,
    }));
  };

  const formattedEndAssignmentDate = closestNextEndAssignment
    ? format(new Date(closestNextEndAssignment), "EEE, MMM dd yyyy")
    : null;
  const fileTypeSubmisisonChartData = handleGetFileTypeSubmissionData(report);
  const gradedSubmissionChartData = handleGetGradedSubmissionData(
    report.markDistributionCount
  );
  const avgMarkData = handleGetAvgMarkData(report);
  const avgCompletionRateData = handleGetCompletionRateData(report);
  return (
    <div className="grid grid-cols-4 gap-5">
      <CompareCardValue
        className="col-span-1"
        title="Total assignments"
        value={assignmentCount.toString()}
      />
      <CompareCardValue
        className="col-span-1"
        title="Avg completion rate"
        value={`${avgCompletionRate * 100}%`}
      />
      <CompareCardValue
        className="col-span-1"
        title="Assignments to do"
        value="2 assignments"
      />
      <CompareCardValue
        className="col-span-1"
        title={
          formattedEndAssignmentDate
            ? "Next assignment will end on"
            : "No assignment to do now"
        }
        value={formattedEndAssignmentDate ? formattedEndAssignmentDate : ""}
      />
      <CardDashboard className="col-span-2 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">File type submission</h6>
        <CustomPieChart
          data={fileTypeSubmisisonChartData}
          title="Total submissions"
          unitForPlural="submissions"
          unitForSingular="submission"
        />
      </CardDashboard>

      <CardDashboard className="col-span-2 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">Graded submission</h6>
        <CustomPieChart
          data={gradedSubmissionChartData}
          title="Total submission"
          unitForPlural="submissions"
          unitForSingular="submission"
        />
      </CardDashboard>
      <CardDashboard className="col-span-2 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">Avg mark</h6>
        <HorizontalBarChart data={avgMarkData} type="number" unit="Mark" />
      </CardDashboard>
      <CardDashboard className="col-span-2 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">Completion rate</h6>
        <HorizontalBarChart
          data={avgCompletionRateData}
          type="percent"
          barColor="#8B5CF6"
          unit="Rate"
        />
      </CardDashboard>
      <CardDashboard className="col-span-4 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">Student mark</h6>
        <div className="flex flex-col gap-2">
          <RankItem rank="S" studentWithMarks={studentWithMarkOver8} />
          <RankItem rank="A" studentWithMarks={studentWithMarkOver5} />
          <RankItem rank="B" studentWithMarks={studentWithMarkOver2} />
          <RankItem rank="C" studentWithMarks={studentWithMarkOver0} />
        </div>
      </CardDashboard>
    </div>
  );
}
