import DashboardLogo from "./dashboard-logo";
import SummaryItem from "./summary-item";

export default function QuizDashboardSummary() {
  return (
    <div>
      <div className="flex flex-row items-center gap-2 p-2 rounded-xl bg-gray-100">
        <DashboardLogo type="quiz" />
        <span className="text-gray-700 font-bold text-xl">Dashboard</span>
      </div>
      <div className="flex flex-row items-center gap-4">
        <SummaryItem title="Questions" content="40" />
        <SummaryItem title="Attempted" content="67" />
        <SummaryItem title="Avg mark (40)" content="27.6" />
        <SummaryItem title="Top mark" content="39" />
        <SummaryItem title="Avg time spend" content="24m 2s" />
        <SummaryItem title="Completion rate" content="75%" />
      </div>
    </div>
  );
}
