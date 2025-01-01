import StudentDashboard from "@/components/dashboard/student/student-dashboard";
import { CalendarDateToDate, DateToCalendarDate } from "@/lib/nextui/utils";
import {
  getEndDateOfCurrentMonth,
  getStartDateOfCurrentMonth,
} from "@/lib/utils";
import { Course } from "@/models/course";
import { StudentReport } from "@/models/report";
import { getStudentReport } from "@/services/report";
import { DateRangePicker } from "@nextui-org/date-picker";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  course: Course;
}
export default function DashboardStudent({ course }: Props) {
  const [range, setRange] = useState<{ startDate: Date; endDate: Date }>({
    startDate: getStartDateOfCurrentMonth(),
    endDate: getEndDateOfCurrentMonth(),
  });
  const [report, setReport] = useState<any>();

  const handleDatePickerRangeChange = (value: any) => {
    if (!value) return;
    const newRange = {
      startDate: CalendarDateToDate(value.start),
      endDate: CalendarDateToDate(value.end),
    };
    setRange(newRange);
  };

  const handleGetReportSuccess = (data: StudentReport) => {
    console.log("report: ", data);
    setReport(data);
  };

  const handleGetReportFail = (error: any) => {
    toast.error(error);
  };
  useEffect(() => {
    const startDateISO = range.startDate.toISOString();
    const endDateISO = range.endDate.toISOString();
    getStudentReport(
      course.id,
      startDateISO,
      endDateISO,
      handleGetReportSuccess,
      handleGetReportFail
    );
  }, [course.id, range]);

  if (!report) return null;
  return (
    <div className="h-full p-5 default-scrollbar flex flex-col items-center gap-5 bg-blue-50">
      <div className="w-full flex flex-row items-center justify-end">
        <DateRangePicker
          variant="bordered"
          hideTimeZone
          showMonthAndYearPickers
          defaultValue={{
            start: DateToCalendarDate(range.startDate),
            end: DateToCalendarDate(range.endDate),
          }}
          radius="sm"
          selectorIcon={<Calendar size={16} color={"#3b82f6"} />}
          onChange={handleDatePickerRangeChange}
          className="w-fit bg-white focus-within:border-blue-500"
          classNames={{
            inputWrapper:
              "border-[0.5px] border-blue-400 hover:border-blue-500 focus-within:border-blue-500",
          }}
        />
      </div>
      <div className="w-full">
        <StudentDashboard report={report} range={range} />
      </div>
    </div>
  );
}
