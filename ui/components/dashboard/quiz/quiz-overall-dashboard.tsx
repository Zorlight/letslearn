import HorizontalBarChart from "@/components/chart/bar-chart";
import CustomPieChart from "@/components/chart/pie-chart";
import { fakeUserList } from "@/fake-data/user";
import RankItem from "../ranking/rank-item";
import CardDashboard from "../card-dashboard/card-dashboard";
import CompareCardValue from "../card-dashboard/compare-card-value";
import { ChartDataObject, QuizOverallReport } from "@/models/report";
import { sampleQuestionTypeData, sampleStudentMarkData } from "./static-data";
import { getStudentWithMark } from "./utils";

interface Props {
  quizOverallReport: QuizOverallReport;
}

export default function QuizOverallDashboard({ quizOverallReport }: Props) {
  const {
    quizCount,
    maxQuestionCount,
    minQuestionCount,
    avgCompletionPercentage,
    maxStudentScoreBase10,
    minStudentScoreBase10,
    studentWithMarkOver8,
    studentWithMarkOver5,
    studentWithMarkOver2,
    studentWithMarkOver0,
  } = quizOverallReport;

  const handleGetQuestionTypeData = (quizOverallReport: QuizOverallReport) => {
    const {
      trueFalseQuestionCount,
      multipleChoiceQuestionCount,
      shortAnswerQuestionCount,
    } = quizOverallReport;
    const data = [...sampleQuestionTypeData];
    data[0].value = multipleChoiceQuestionCount;
    data[1].value = trueFalseQuestionCount;
    data[2].value = shortAnswerQuestionCount;
    return data;
  };

  const handleGetStudentMarkData = (obj: ChartDataObject) => {
    const data = [...sampleStudentMarkData];
    data[0].value = obj[8];
    data[1].value = obj[5];
    data[2].value = obj[2];
    data[3].value = obj[0];
    data[4].value = obj[-1];
    return data;
  };

  const handleGetAvgMarkData = (quizOverallReport: QuizOverallReport) => {
    const { singleQuizReports } = quizOverallReport;
    return singleQuizReports.map((quiz) => ({
      name: quiz.name,
      value: quiz.avgStudentMarkBase10,
    }));
  };

  const handleGetCompletionRateData = (
    quizOverallReport: QuizOverallReport
  ) => {
    const { singleQuizReports } = quizOverallReport;
    return singleQuizReports.map((quiz) => ({
      name: quiz.name,
      value: quiz.completionRate * 100,
    }));
  };

  const questionTypeChartData = handleGetQuestionTypeData(quizOverallReport);
  const studentMarkChartData = handleGetStudentMarkData(
    quizOverallReport.markDistributionCount
  );
  const avgMarkChartData = handleGetAvgMarkData(quizOverallReport);
  const avgCompletionRateChartData =
    handleGetCompletionRateData(quizOverallReport);

  return (
    <div className="grid grid-cols-4 gap-5">
      <CompareCardValue
        className="col-span-1"
        title="Total quizzes"
        value={quizCount.toString()}
      />
      <CompareCardValue
        className="col-span-1"
        title="Number of questions range"
        value={`${minQuestionCount} - ${maxQuestionCount}`}
      />
      <CompareCardValue
        className="col-span-1"
        title="Avg completion rate"
        value={`${avgCompletionPercentage * 100}%`}
      />
      <CompareCardValue
        className="col-span-1"
        title="Score range"
        value={`${minStudentScoreBase10.toFixed(
          2
        )} - ${maxStudentScoreBase10.toFixed(2)}`}
      />
      <CardDashboard className="col-span-2 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">Question type</h6>
        <CustomPieChart
          data={questionTypeChartData}
          title="Total questions"
          unitForPlural="questions"
          unitForSingular="question"
        />
      </CardDashboard>

      <CardDashboard className="col-span-2 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">Student mark</h6>
        <CustomPieChart
          data={studentMarkChartData}
          title="Total students"
          unitForPlural="students"
          unitForSingular="student"
        />
      </CardDashboard>
      <CardDashboard className="col-span-2 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">Avg mark</h6>
        <HorizontalBarChart data={avgMarkChartData} type="number" unit="Mark" />
      </CardDashboard>
      <CardDashboard className="col-span-2 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">Completion rate</h6>
        <HorizontalBarChart
          data={avgCompletionRateChartData}
          type="percent"
          barColor="#8B5CF6"
          unit="Rate"
        />
      </CardDashboard>
      <CardDashboard className="col-span-4 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">Student mark</h6>
        <div className="flex flex-col gap-2">
          <RankItem
            rank="S"
            students={getStudentWithMark(studentWithMarkOver8)}
          />
          <RankItem
            rank="A"
            students={getStudentWithMark(studentWithMarkOver5)}
          />
          <RankItem
            rank="B"
            students={getStudentWithMark(studentWithMarkOver2)}
          />
          <RankItem
            rank="C"
            students={getStudentWithMark(studentWithMarkOver0)}
          />
        </div>
      </CardDashboard>
    </div>
  );
}
