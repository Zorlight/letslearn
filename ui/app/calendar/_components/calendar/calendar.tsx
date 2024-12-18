"use client";
import { generateDateRange } from "@/lib/utils";
import { Topic } from "@/models/topic";
import React, { useState } from "react";
import DateLayout from "./date-layout";
import { CalendarRange, DateItem } from "./static-data";
import { handleGetDateItems } from "./utils";

interface Props {
  range: CalendarRange;
  topics: Topic[];
}
export default function Calendar({ range, topics }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [shareId, setShareId] = useState<string | undefined>(undefined);

  const dateRange = generateDateRange(range.start, range.end);
  const dateList: DateItem[] = handleGetDateItems(dateRange, topics);

  return (
    <div className="h-full flex flex-row border-1 border-blue-800 rounded-md overflow-hidden">
      {dateList.map((dateItem) => (
        <DateLayout
          key={dateItem.date.toString()}
          selectedDate={selectedDate}
          dateItem={dateItem}
          shareId={shareId}
          onShareIdChange={setShareId}
        />
      ))}
    </div>
  );
}
