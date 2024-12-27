import AssignmentOverallDashboard from "@/components/dashboard/assignment/assignment-overall-dashboard";
import QuizOverallDashboard from "@/components/dashboard/quiz/quiz-overall-dashboard";
import { cn } from "@/lib/utils";
import { Course } from "@/models/course";
import { TopicType } from "@/models/topic";
import React from "react";
import DashboardTabList from "./dashboard-tab/tab-list";
import { DateRangePicker } from "@nextui-org/date-picker";
import { parseDate } from "@internationalized/date";
import { CalendarDateToDate } from "@/lib/nextui/utils";
import { Calendar } from "lucide-react";

interface Props {
  course: Course;
}
export default function DashboardTab({ course }: Props) {
  const tabs = [TopicType.QUIZ, TopicType.ASSIGNMENT];
  const [selectedTab, setSelectedTab] = React.useState(tabs[0]);
  const handleDatePickerRangeChange = (value: any) => {
    if (!value) return;
    const startDate = CalendarDateToDate(value.start);
    const endDate = CalendarDateToDate(value.end);

    console.log("startDate: ", startDate);
    console.log("endDate: ", endDate);
  };

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
            start: parseDate("2024-08-01"),
            end: parseDate("2024-08-31"),
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
        {selectedTab === TopicType.QUIZ && <QuizOverallDashboard />}
        {selectedTab === TopicType.ASSIGNMENT && <AssignmentOverallDashboard />}
      </div>
    </div>
  );
}
