import CustomPieChart from "@/components/chart/pie-chart";
import { AssignmentReport, ChartDataObject } from "@/models/report";
import RankItem from "../ranking/rank-item";
import AssignmentDashboardSummary from "./assignment-summary";
import { fileTypeColor, sampleGradedSubmissionData } from "./static-data";

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
          <RankItem rank="A" studentWithMarks={studentWithMarkOver5} />
          <RankItem rank="B" studentWithMarks={studentWithMarkOver2} />
          <RankItem rank="C" studentWithMarks={studentWithMarkOver0} />
        </div>
      </div>
    </div>
  );
}
