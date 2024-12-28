import React, { useMemo } from "react";
import CustomPieChart from "@/components/chart/pie-chart";
import RankItem from "../ranking/rank-item";
import { fakeUserList } from "@/fake-data/user";
import QuizDashboardSummary from "./quiz-summary";
import { ChartDataObject, QuizReport } from "@/models/report";
import { QuizTopic } from "@/models/topic";

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

interface Props {
  report: QuizReport;
  quiz: QuizTopic;
}
export default function QuizDashboard({ quiz, report }: Props) {
  const {
    studentWithMarkOver8,
    studentWithMarkOver5,
    studentWithMarkOver2,
    studentWithMarkOver0,
  } = report;
  const handleGetQuestionTypeData = (report: QuizReport) => {
    const data = [...sampleQuestionTypeData];
    const {
      trueFalseQuestionCount,
      multipleChoiceQuestionCount,
      shortAnswerQuestionCount,
    } = report;
    data[0].value = multipleChoiceQuestionCount;
    data[1].value = trueFalseQuestionCount;
    data[2].value = shortAnswerQuestionCount;
    return data;
  };
  const handleGetStudentMarkData = (obj: ChartDataObject) => {
    if (!obj) return sampleStudentMarkData;
    const data = [...sampleStudentMarkData];
    data[0].value = obj[8];
    data[1].value = obj[5];
    data[2].value = obj[2];
    data[3].value = obj[0];
    data[4].value = obj["-1"];
    return data;
  };

  const handleClick = (studentId: string) => {};

  const studentMarkData = useMemo(
    () => handleGetStudentMarkData(report.markDistributionCount),
    [report.markDistributionCount]
  );
  const questionTypeData = useMemo(
    () => handleGetQuestionTypeData(report),
    [report]
  );
  return (
    <div className="flex flex-col gap-2">
      <QuizDashboardSummary report={report} quiz={quiz} />

      <div className="flex flex-row gap-4">
        <div className="w-full flex flex-col gap-4 p-4">
          <h6 className="text-orange-500">Question type</h6>
          <CustomPieChart
            data={questionTypeData}
            title="Total questions"
            unitForPlural="questions"
            unitForSingular="question"
          />
        </div>
        <div className="w-full flex flex-col gap-4 p-4">
          <h6 className="text-orange-500">Student mark</h6>
          <CustomPieChart
            data={studentMarkData}
            title="Total students"
            unitForPlural="students"
            unitForSingular="student"
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
