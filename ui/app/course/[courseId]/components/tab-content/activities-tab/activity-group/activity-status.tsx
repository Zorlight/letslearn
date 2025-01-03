import { cn, getDurationText } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";

interface Props {
  due: string | null;
  open: string | null;
}
enum TopicStatus {
  NOT_OPEN,
  OPEN,
  CLOSE,
}

enum Color {
  GREEN = "text-green-500",
  RED = "text-red-500",
  ORANGE = "text-orange-500",
}
export default function ActivityStatus({ due, open }: Props) {
  const current = new Date();
  const dueDate = due ? new Date(due) : null;
  const openDate = open ? new Date(open) : null;

  let topicStatus = TopicStatus.OPEN;
  let color = Color.ORANGE;

  if (dueDate && current > dueDate) topicStatus = TopicStatus.CLOSE;
  else if (openDate && current < openDate) topicStatus = TopicStatus.NOT_OPEN;

  //Eg: Sep 1
  const formattedDueDate = dueDate ? format(dueDate, "MMM d") : null;
  const formattedOpenDate = openDate ? format(openDate, "MMM d") : null;

  let dueStatusText = "";
  if (topicStatus === TopicStatus.CLOSE) {
    dueStatusText = "Closed";
    color = Color.RED;
  } else {
    const dayLeft = getDurationText(due, current, 1);
    dueStatusText = `${dayLeft} left`;
    color = Color.ORANGE;
  }

  let openStatusText = "";
  if (topicStatus === TopicStatus.NOT_OPEN) {
    const dayLeft = getDurationText(openDate, current, 1);
    openStatusText = `${dayLeft} left`;
    color = Color.ORANGE;
  }
  return (
    <div className="text-gray-500 space-x-1">
      {formattedDueDate && (
        <>
          <span className="font-semibold">{`Due ${formattedDueDate}`}</span>
          <span className={cn("italic", color)}>{`(${dueStatusText})`}</span>
        </>
      )}
      {formattedOpenDate && (
        <>
          <span className="font-semibold">{`Start at ${formattedOpenDate}`}</span>
          <span className={cn("italic", color)}>{`(${openStatusText})`}</span>
        </>
      )}
    </div>
  );
}
