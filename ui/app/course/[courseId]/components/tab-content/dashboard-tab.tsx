import AssignmentOverallDashboard from "@/components/dashboard/assignment/assignment-overall-dashboard";
import QuizOverallDashboard from "@/components/dashboard/quiz/quiz-overall-dashboard";
import {
  cn,
  getEndDateOfCurrentMonth,
  getStartDateOfCurrentMonth,
} from "@/lib/utils";
import { Course } from "@/models/course";
import { TopicType } from "@/models/topic";
import React, { useEffect, useState } from "react";
import DashboardTabList from "./dashboard-tab/tab-list";
import { DateRangePicker } from "@nextui-org/date-picker";
import { parseDate } from "@internationalized/date";
import { CalendarDateToDate, DateToCalendarDate } from "@/lib/nextui/utils";
import { Calendar } from "lucide-react";
import {
  getAssignmentOverallReport,
  getQuizOverallReport,
} from "@/services/report";
import { toast } from "react-toastify";
import { AssignmentOverallReport, QuizOverallReport } from "@/models/report";

interface Props {
  course: Course;
}
export default function DashboardTab({ course }: Props) {
  const tabs = [TopicType.QUIZ, TopicType.ASSIGNMENT];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [range, setRange] = useState<{ startDate: Date; endDate: Date }>({
    startDate: getStartDateOfCurrentMonth(),
    endDate: getEndDateOfCurrentMonth(),
  });
  const [quizOverallReport, setQuizOverallReport] =
    useState<QuizOverallReport>();
  const [assignmentOverallReport, setAssignmentOverallReport] =
    useState<AssignmentOverallReport>();

  const handleDatePickerRangeChange = (value: any) => {
    if (!value) return;
    const newRange = {
      startDate: CalendarDateToDate(value.start),
      endDate: CalendarDateToDate(value.end),
    };
    setRange(newRange);
  };

  const handleGetQuizOverallReportSuccess = (data: QuizOverallReport) => {
    console.log("overall report: ", data);
    setQuizOverallReport(data);
  };
  const handleGetAssignmentOverallReportSuccess = (
    data: AssignmentOverallReport
  ) => {
    console.log("overall report: ", data);
    setAssignmentOverallReport(data);
  };
  const handleGetReportFail = (error: any) => {
    toast.error(error);
  };
  useEffect(() => {
    const startDateISO = range.startDate.toISOString();
    const endDateISO = range.endDate.toISOString();
    getQuizOverallReport(
      course.id,
      startDateISO,
      endDateISO,
      handleGetQuizOverallReportSuccess,
      handleGetReportFail
    );
    getAssignmentOverallReport(
      course.id,
      startDateISO,
      endDateISO,
      handleGetAssignmentOverallReportSuccess,
      handleGetReportFail
    );
  }, [course.id, range]);

  if (!quizOverallReport || !assignmentOverallReport) return null;
  return (
    <div
      className={cn(
        "h-full p-5 default-scrollbar flex flex-col items-center gap-5",
        selectedTab === TopicType.QUIZ ? "bg-pink-50" : "bg-purple-50"
      )}
    >
      <div className="relative w-full flex flex-row items-center justify-center">
        <DashboardTabList
          tabs={tabs}
          selectedTab={selectedTab}
          onSelect={setSelectedTab}
        />
        <DateRangePicker
          variant="bordered"
          hideTimeZone
          showMonthAndYearPickers
          defaultValue={{
            start: DateToCalendarDate(range.startDate),
            end: DateToCalendarDate(range.endDate),
          }}
          radius="sm"
          selectorIcon={
            <Calendar
              size={16}
              color={selectedTab === TopicType.QUIZ ? "#db2777" : "#7e22ce"}
            />
          }
          onChange={handleDatePickerRangeChange}
          className="absolute right-0 w-fit bg-white"
          classNames={{
            inputWrapper: cn(
              "border-[0.5px]",
              selectedTab === TopicType.QUIZ &&
                "border-quiz hover:border-pink-500",
              selectedTab === TopicType.ASSIGNMENT &&
                "border-assignment hover:border-purple-500"
            ),
          }}
        />
      </div>
      <div className="w-full">
        {selectedTab === TopicType.QUIZ && (
          <QuizOverallDashboard quizOverallReport={quizOverallReport} />
        )}
        {selectedTab === TopicType.ASSIGNMENT && (
          <AssignmentOverallDashboard report={assignmentOverallReport} />
        )}
      </div>
    </div>
  );
}
