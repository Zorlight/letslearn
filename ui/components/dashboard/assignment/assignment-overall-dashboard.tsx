import HorizontalBarChart from "@/components/chart/bar-chart";
import CustomPieChart from "@/components/chart/pie-chart";
import { AssignmentOverallReport, ChartDataObject } from "@/models/report";
import { format } from "date-fns";
import CardDashboard from "../card-dashboard/card-dashboard";
import CompareCardValue from "../card-dashboard/compare-card-value";
import { fileTypeColor, sampleGradedSubmissionData } from "./static-data";
import RankItem from "../ranking/rank-item";

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
