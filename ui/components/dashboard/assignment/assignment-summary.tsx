import { fakeUserList } from "@/fake-data/user";
import { AssignmentReport } from "@/models/report";
import DashboardLogo from "../summary/dashboard-logo";
import SummaryCard from "../summary/summary-card";
import SummaryItem from "../summary/summary-item";

interface Props {
  report: AssignmentReport;
}
export default function AssignmentDashboardSummary({ report }: Props) {
  const {
    submissionCount,
    gradedSubmissionCount,
    fileCount,
    avgMark,
    maxMark,
    completionRate,
    students,
  } = report;

  return (
    <div className="flex flex-row p-2 rounded-xl bg-gray-100">
      <div className="flex-1">
        <div className="flex flex-col gap-4 p-2">
          <div className="flex flex-row items-center gap-2">
            <DashboardLogo type="assignment" />
            <span className="text-gray-700 font-bold text-xl">Dashboard</span>
          </div>
          <div className="flex flex-row items-center gap-4">
            <SummaryItem
              title="Submissions"
              content={submissionCount.toString()}
            />
            <SummaryItem
              title="Graded submission"
              content={gradedSubmissionCount.toString()}
            />
            <SummaryItem title="Total files" content={fileCount.toString()} />
            <SummaryItem title="Avg mark (100)" content={avgMark.toFixed(1)} />
            <SummaryItem title="Top mark (100)" content={maxMark.toString()} />
            <SummaryItem
              title="Completion rate"
              content={`${completionRate * 100}%`}
            />
          </div>
        </div>
      </div>
      <SummaryCard students={students} />
    </div>
  );
}
