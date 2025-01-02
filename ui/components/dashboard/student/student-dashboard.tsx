import HorizontalBarChart from "@/components/chart/bar-chart";
import CustomLineChart from "@/components/chart/line-chart";
import {
  getLast6Months,
  monthNames,
} from "@/components/chart/line-chart/static-data";
import { StudentReport, TopicWithMark } from "@/models/report";
import CardDashboard from "../card-dashboard/card-dashboard";
import CompareCardValue from "../card-dashboard/compare-card-value";
import RankLogo from "../ranking/rank-logo";
import { sampleAvgQuizMarkLineChartData } from "./static-data";

interface Props {
  report: StudentReport;
  range: { startDate: Date; endDate: Date };
}
export default function StudentDashboard({ report, range }: Props) {
  const {
    avgAssignmentMark,
    avgQuizMark,
    quizToDoCount,
    assignmentToDoCount,
    totalAssignmentCount,
    totalQuizCount,
    topTopicAssignment,
    topTopicQuiz,
  } = report;

  const handleGetTopTopicData = (topTopic: TopicWithMark[]) => {
    return topTopic.map((topic) => ({
      name: topic.topic.title,
      value: topic.mark || 0,
    }));
  };

  const isInMonth = (date: Date, month: number) => {
    return date.getMonth() === month;
  };

  const handleGetAvgMarkLineChartData = (topicWithMarks: TopicWithMark[]) => {
    const last6Months = getLast6Months(range.endDate);
    const data = last6Months.map((month) => {
      const monthName = monthNames[month];
      let totalResponse = 0;
      const totalQuizMarkByMonth = topicWithMarks.reduce((acc, topic) => {
        if (
          topic.doneTime &&
          topic.mark &&
          isInMonth(new Date(topic.doneTime), month)
        ) {
          totalResponse++;
          return acc + topic.mark;
        }
        return acc;
      }, 0);

      return {
        name: monthName,
        value: totalResponse ? totalQuizMarkByMonth / totalResponse : 0,
      };
    });
    return data;
  };

  const topTopicQuizData = handleGetTopTopicData(topTopicQuiz);
  const topTopicAssignmentData = handleGetTopTopicData(topTopicAssignment);
  const quizCompletionRate = totalQuizCount
    ? (totalQuizCount - quizToDoCount) / totalQuizCount
    : 0;
  const assignmentCompletionRate = totalAssignmentCount
    ? (totalAssignmentCount - assignmentToDoCount) / totalAssignmentCount
    : 0;
  const avgQuizMarkLineChartData = handleGetAvgMarkLineChartData(topTopicQuiz);

  const avgAssignmentMarkLineChartData =
    handleGetAvgMarkLineChartData(topTopicAssignment);

  return (
    <div className="grid grid-cols-4 gap-5">
      <CompareCardValue
        className="col-span-1"
        title="Quiz completion rate"
        value={`${Math.round(quizCompletionRate * 100)}%`}
      />
      <CompareCardValue
        className="col-span-1"
        title="Avg quiz mark"
        value={<MarkWithRankLogo mark={avgQuizMark} max={10} />}
      />
      <CompareCardValue
        className="col-span-1"
        title="Avg assignment mark"
        value={<MarkWithRankLogo mark={avgAssignmentMark} max={100} />}
      />
      <CompareCardValue
        className="col-span-1"
        title="Assignment completion rate"
        value={`${Math.round(assignmentCompletionRate * 100)}%`}
      />
      <CardDashboard className="col-span-3 row-span-3 row-start-2 col-start-1 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">Avg quiz mark in last 6 months</h6>
        <CustomLineChart data={avgQuizMarkLineChartData} lineColor="#db2777" />
      </CardDashboard>
      <CompareCardValue
        className="col-span-1 row-span-1 row-start-2 col-start-4"
        title="Total quizzes"
        value={`${totalQuizCount} ${totalQuizCount > 1 ? "quizzes" : "quiz"}`}
      />
      <CompareCardValue
        className="col-span-1 row-span-1 row-start-3 col-start-4"
        title={quizToDoCount > 0 ? "Quiz to do" : "No quiz to do now"}
        value={quizToDoCount !== 0 ? `${quizToDoCount} quizzes` : ""}
      />
      <CompareCardValue
        className="col-span-1 row-span-1 row-start-4 col-start-4"
        title={quizToDoCount > 0 ? "Next quiz will end on" : "Total attempted"}
        value={quizToDoCount > 0 ? "2021-12-31" : totalQuizCount.toString()}
      />

      <CompareCardValue
        className="col-span-1 row-span-1 row-start-5 col-start-1"
        title="Total assignments"
        value={`${totalAssignmentCount} ${
          totalAssignmentCount > 1 ? "assignments" : "assignment"
        }`}
      />
      <CompareCardValue
        className="col-span-1 row-span-1 row-start-6 col-start-1"
        title={
          assignmentToDoCount > 0
            ? "Assignment to do"
            : "No assignment to do now"
        }
        value={
          assignmentToDoCount !== 0 ? `${assignmentToDoCount} assignments` : ""
        }
      />
      <CompareCardValue
        className="col-span-1 row-span-1 row-start-7 col-start-1"
        title="Total files"
        value={1}
      />
      <CardDashboard className="col-span-3 row-span-3 row-start-5 col-start-2 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">
          Avg assignment mark in last 6 months
        </h6>
        <CustomLineChart
          data={avgAssignmentMarkLineChartData}
          lineColor="#7e22ce"
        />
      </CardDashboard>
      <CardDashboard className="col-span-2 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">Top quiz mark</h6>
        <HorizontalBarChart
          data={topTopicQuizData}
          type="number"
          unit="Mark"
          maxValue={10}
        />
      </CardDashboard>
      <CardDashboard className="col-span-2 w-full flex flex-col gap-4">
        <h6 className="text-orange-500">Top assignment mark</h6>
        <HorizontalBarChart
          data={topTopicAssignmentData}
          type="number"
          unit="Mark"
          barColor="#7e22ce"
          maxValue={100}
        />
      </CardDashboard>
    </div>
  );
}

const MarkWithRankLogo = ({ mark, max }: { mark: number; max: number }) => {
  let rank: "S" | "A" | "B" | "C" = "S";
  const percent = mark / max;
  console.log(percent);
  if (percent >= 0.8) rank = "S";
  else if (percent >= 0.5) rank = "A";
  else if (percent >= 0.2) rank = "B";
  else rank = "C";
  return (
    <div className="flex flex-row items-center gap-2">
      <span className="text-gray-700 font-bold">{mark}</span>
      <RankLogo rank={rank} />
    </div>
  );
};
