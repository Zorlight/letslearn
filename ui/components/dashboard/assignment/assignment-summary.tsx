import { fakeUserList } from "@/fake-data/user";
import DashboardLogo from "../summary/dashboard-logo";
import SummaryItem from "../summary/summary-item";
import SummaryCard from "../summary/summary-card";

interface Props {}
export default function AssignmentDashboardSummary({}: Props) {
  return (
    <div className="flex flex-row p-2 rounded-xl bg-gray-100">
      <div className="flex-1">
        <div className="flex flex-col gap-4 p-2">
          <div className="flex flex-row items-center gap-2">
            <DashboardLogo type="assignment" />
            <span className="text-gray-700 font-bold text-xl">Dashboard</span>
          </div>
          <div className="flex flex-row items-center gap-4">
            <SummaryItem title="Submissions" content="38" />
            <SummaryItem title="Graded submission" content="0" />
            <SummaryItem title="Total files" content="76" />
            <SummaryItem title="Avg mark (100)" content="72.8" />
            <SummaryItem title="Top mark (100)" content="95" />
            <SummaryItem title="Completion rate" content="75%" />
          </div>
        </div>
      </div>
      <SummaryCard students={fakeUserList} />
    </div>
  );
}
