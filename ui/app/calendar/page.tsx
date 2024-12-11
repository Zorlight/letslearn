import IconButton from "@/components/buttons/icon-button";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/lib/shadcn/button";
import { format } from "date-fns";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Calendar, { CalendarRange } from "./_components/calendar/calendar";

export default function CalendarPage() {
  const options = ["All courses"];
  const current = new Date();
  const nextWeek = new Date(current);
  nextWeek.setDate(nextWeek.getDate() + 6);

  const calendarRange: CalendarRange = {
    start: current,
    end: nextWeek,
  };
  const formatCalendarRange = (range: { start: Date; end: Date }) => {
    const startText = format(range.start, "MMM d");
    const endText = format(range.end, "MMM d, yyyy");
    return `${startText} - ${endText}`;
  };
  return (
    <div className="w-full p-5 text-gray-700 space-y-2">
      <div className="flex flex-row items-center justify-between">
        <Combobox
          name="Course"
          options={options}
          popoverClassName="min-w-[250px]"
        >
          <Button
            variant="outline"
            className="min-w-[250px] flex justify-between"
          >
            All courses
            <ChevronDown />
          </Button>
        </Combobox>
        <div className="flex flex-row items-center gap-2">
          <IconButton>
            <ChevronLeft />
          </IconButton>
          <span className="font-semibold">
            {formatCalendarRange(calendarRange)}
          </span>
          <IconButton>
            <ChevronRight />
          </IconButton>
        </div>
        {/* Trick for UI */}
        <div className="min-w-[250px] opacity-0"></div>
      </div>
      <div className="h-[calc(100%-60px)]">
        <Calendar range={calendarRange} />
      </div>
    </div>
  );
}
