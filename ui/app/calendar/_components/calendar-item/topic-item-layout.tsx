"use client";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { TopicItem } from "../calendar/static-data";
import { isBothStartAndFinish } from "./utils";

interface Props {
  data: TopicItem;
  className?: string;
  date: Date;
}
export default function TopicItemLayout({ data, date, className }: Props) {
  const router = useRouter();
  const { topic, startTime, endTime } = data;

  const time = startTime || endTime;
  let timeStr = time ? format(time, "hh:mm a") : "No time";

  const showStartAndFinish = isBothStartAndFinish(data, date);

  if (showStartAndFinish)
    timeStr = `${format(startTime!, "hh:mm a")} - ${format(
      endTime!,
      "hh:mm a"
    )}`;

  const handleClick = () => {
    const { course, topic } = data;
    if (!course) return;
    router.push(`/course/${course.id}/${topic.type}/${topic.id}`);
  };

  return (
    <div
      className={cn(
        "w-full flex flex-col items-start px-2 py-3 transition-all duration-200 cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      <span className="max-w-full truncate whitespace-nowrap text-sm font-bold">
        {topic.title}
      </span>
      <span className="font-semibold text-sm">{timeStr}</span>
    </div>
  );
}
