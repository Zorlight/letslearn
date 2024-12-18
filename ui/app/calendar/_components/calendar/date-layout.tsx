"use client";
import { cn, isInDate } from "@/lib/utils";
import DateNumber from "../calendar-item/date-number";
import TopicItemUI from "../calendar-item/topic-item-ui";
import { DateItem } from "./static-data";

interface Props {
  selectedDate?: Date;
  className?: string;
  dateItem: DateItem;
  shareId: string | undefined;
  onShareIdChange: (shareId: string | undefined) => void;
}
export default function DateLayout({
  selectedDate,
  dateItem,
  className,
  shareId,
  onShareIdChange,
}: Props) {
  const { date } = dateItem;
  const isSelected = selectedDate ? isInDate(selectedDate, date) : false;

  return (
    <div
      className={cn(
        "w-full flex flex-col items-center py-3 border-[0.5px] border-blue-800 group",
        className
      )}
    >
      <DateNumber date={date} isSelected={isSelected} />
      <div className="w-full flex flex-col gap-2 mt-2">
        {dateItem.topicItems.map((topicItem, index) => (
          <TopicItemUI
            key={index}
            data={topicItem}
            date={date}
            shareId={shareId}
            onShareIdChange={onShareIdChange}
          />
        ))}
      </div>
    </div>
  );
}
