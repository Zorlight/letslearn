import HorizontalBarChart from "@/components/chart/bar-chart";
import CustomPieChart from "@/components/chart/pie-chart";
import { fakeUserList } from "@/fake-data/user";
import RankItem from "../ranking/rank-item";
import CardDashboard from "../card-dashboard/card-dashboard";
import CompareCardValue from "../card-dashboard/compare-card-value";
const sampleQuestionTypeData = [
  { name: "Multiple choice", value: 25, color: "#EC4899" },
  { name: "True false", value: 10, color: "#8B5CF6" },
  { name: "Short answer", value: 5, color: "#F97316" },
];
const sampleStudentMarkData = [
  { name: "80 - 100%", value: 25, color: "#22C55E" },
  { name: "50 - 79%", value: 10, color: "#06B6D4" },
  { name: "20 - 49%", value: 5, color: "#3B82F6" },
  { name: "0 - 19%", value: 5, color: "#EAB308" },
  { name: "Not attempted", value: 5, color: "#6B7280" },
];

const avgMarkData = [
  { name: "First exam", value: 4 },
  { name: "Introduce to Astronomy", value: 1 },
  { name: "Final test", value: 6 },
];

const avgCompletionRateData = [
  { name: "First exam", value: 80 },
  { name: "Introduce to Astronomy", value: 76 },
  { name: "Final test", value: 100 },
];

export default function QuizOverallDashboard() {
  return (
    <div className="grid grid-cols-4 gap-5">
      <CompareCardValue
        className="col-span-1"
        title="Total quizzes"
        value="7"
      />
      <CompareCardValue
        className="col-span-1"
        title="Number of questions range"
        value="10 - 40"
      />
      <CompareCardValue
        className="col-span-1"
        title="Avg completion rate"
        value="74%"
      />
      <CompareCardValue
        className="col-span-1"
        title="Score range"
        value="1.9 - 8.8"
      />
      <CardDashboard className="col-span-2 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">Question type</h6>
        <CustomPieChart data={sampleQuestionTypeData} title="Total questions" />
      </CardDashboard>

      <CardDashboard className="col-span-2 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">Student mark</h6>
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
