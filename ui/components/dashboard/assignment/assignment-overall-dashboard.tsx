import HorizontalBarChart from "@/components/chart/bar-chart";
import CustomPieChart from "@/components/chart/pie-chart";
import { fakeUserList } from "@/fake-data/user";
import RankItem from "../ranking/rank-item";
import CompareCardValue from "../card-dashboard/compare-card-value";
import CardDashboard from "../card-dashboard/card-dashboard";
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
const avgMarkData = [
  { name: "First assignment", value: 9 },
  { name: "Introduce to Astronomy", value: 9 },
  { name: "Final project", value: 7 },
];

const avgCompletionRateData = [
  { name: "First assignment", value: 90 },
  { name: "Introduce to Astronomy", value: 90 },
  { name: "Final project", value: 70 },
];

export default function AssignmentOverallDashboard() {
  return (
    <div className="grid grid-cols-4 gap-5">
      <CompareCardValue
        className="col-span-1"
        title="Total assignments"
        value="7"
      />
      <CompareCardValue
        className="col-span-1"
        title="Avg completion rate"
        value="74%"
      />
      <CompareCardValue
        className="col-span-1"
        title="Assignments to do"
        value="2 assignments"
      />
      <CompareCardValue
        className="col-span-1"
        title="Next assignment will end on"
        value="Fri, Dec 20 2024"
      />
      <CardDashboard className="col-span-2 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">File type submission</h6>
        <CustomPieChart
          data={fileTypeSubmisisonData}
          title="Total submissions"
        />
      </CardDashboard>

      <CardDashboard className="col-span-2 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">Graded submissions</h6>
        <CustomPieChart data={sampleStudentMarkData} title="Total questions" />
      </CardDashboard>
      <CardDashboard className="col-span-2 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">Avg mark</h6>
        <HorizontalBarChart data={avgMarkData} type="number" />
      </CardDashboard>
      <CardDashboard className="col-span-2 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">Completion rate</h6>
        <HorizontalBarChart
          data={avgCompletionRateData}
          type="percent"
          barColor="#8B5CF6"
        />
      </CardDashboard>
      <CardDashboard className="col-span-4 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">Student mark</h6>
        <div className="flex flex-col gap-2">
          <RankItem rank="S" students={fakeUserList} />
          <RankItem rank="A" students={fakeUserList} />
          <RankItem rank="B" students={fakeUserList} />
          <RankItem rank="C" students={fakeUserList} />
        </div>
      </CardDashboard>
    </div>
  );
}
