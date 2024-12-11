"use client";
import React from "react";
import DateLayout from "./date-layout";

export type CalendarRange = {
  start: Date;
  end: Date;
};
interface Props {
  range: CalendarRange;
}
export default function Calendar({ range }: Props) {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const getDateListFromRange = (start: Date, end: Date) => {
    const dateList = [new Date(start)];
    let currentDate = start;
    while (currentDate < end) {
      currentDate.setDate(currentDate.getDate() + 1);
      dateList.push(new Date(currentDate));
    }
    return dateList;
  };
  const dateList = getDateListFromRange(range.start, range.end);
  return (
    <div className="h-full flex flex-row border-1 border-blue-800 rounded-md overflow-hidden">
      {dateList.map((date) => (
        <DateLayout
          key={date.toISOString()}
          date={date}
          selectedDate={selectedDate}
        />
      ))}
    </div>
  );
}
