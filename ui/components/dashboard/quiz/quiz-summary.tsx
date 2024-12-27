import { fakeUserList } from "@/fake-data/user";
import DashboardLogo from "../summary/dashboard-logo";
import SummaryItem from "../summary/summary-item";
import SummaryCard from "../summary/summary-card";
import { QuizReport } from "@/models/report";
import { QuizTopic } from "@/models/topic";
import { getQuizTotalMark, QuizData } from "@/models/quiz";
import { useEffect, useMemo, useState } from "react";
import { getShortTimeStringByDuration } from "@/lib/utils";
import {
  getAllQuizResponsesOfTopic,
  getQuizResponse,
} from "@/services/quiz-response";
import { StudentResponse } from "@/models/student-response";
import { toast } from "react-toastify";

interface Props {
  report: QuizReport;
  quiz: QuizTopic;
}
export default function QuizDashboardSummary({ report, quiz }: Props) {
  const {
    questionCount,
    attemptCount,
    avgStudentMarkBase10,
    maxStudentMarkBase10,
    avgTimeSpend,
    completionRate,
    studentCount,
  } = report;
  const { questions } = quiz.data as QuizData;
  const [quizResponses, setQuizResponses] = useState<StudentResponse[]>([]);

  const totalMark = useMemo(() => getQuizTotalMark(questions), [questions]);
  const avgMark = useMemo(
    () => (avgStudentMarkBase10 / 10) * totalMark,
    [avgStudentMarkBase10, totalMark]
  );

  const maxMark = useMemo(
    () => (maxStudentMarkBase10 / 10) * totalMark,
    [maxStudentMarkBase10, totalMark]
  );
  const averageTimeSpend = getShortTimeStringByDuration(avgTimeSpend, 2);
  return (
    <div className="flex flex-row p-2 rounded-xl bg-gray-100">
      <div className="flex-1">
        <div className="flex flex-col gap-4 p-2">
          <div className="flex flex-row items-center gap-2">
            <DashboardLogo type="quiz" />
            <span className="text-gray-700 font-bold text-xl">Dashboard</span>
          </div>
          <div className="flex flex-row items-center gap-4">
            <SummaryItem title="Questions" content={questionCount.toString()} />
            <SummaryItem title="Attempted" content={attemptCount.toString()} />
            <SummaryItem
              title={`Avg mark (${totalMark})`}
              content={avgMark.toFixed(1)}
            />
            <SummaryItem title="Top mark" content={maxMark.toFixed(1)} />
            <SummaryItem title="Avg time spend" content={averageTimeSpend} />
            <SummaryItem title="Completion rate" content={completionRate} />
          </div>
        </div>
      </div>
      <SummaryCard students={fakeUserList} />
    </div>
  );
}
