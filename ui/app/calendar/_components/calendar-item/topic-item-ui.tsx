import { cn } from "@/lib/utils";
import { TopicItem } from "../calendar/static-data";
import TooltipUI from "./tooltip-ui";
import TopicItemLayout from "./topic-item-layout";
import { useState } from "react";

interface Props {
  data: TopicItem;
  className?: string;
  date: Date;
  shareId?: string;
  onShareIdChange?: (shareId: string | undefined) => void;
}
export default function TopicItemUI({
  data,
  date,
  className,
  shareId,
  onShareIdChange,
}: Props) {
  const { type, id } = data.topic;

  switch (type) {
    case "quiz":
      return (
        <TooltipUI
          data={data}
          date={date}
          shareId={shareId}
          onShareIdChange={onShareIdChange}
        >
          <TopicItemLayout
            data={data}
            date={date}
            className={cn(
              "bg-pink-50 text-quiz",
              shareId === id && "bg-pink-500 text-white",
              className
            )}
          />
        </TooltipUI>
      );
    case "meeting":
      return (
        <TooltipUI
          data={data}
          date={date}
          shareId={shareId}
          onShareIdChange={onShareIdChange}
        >
          <TopicItemLayout
            data={data}
            date={date}
            className={cn(
              "bg-blue-50 text-meeting hover:bg-meeting hover:text-white",
              shareId === id && "bg-meeting text-white",
              className
            )}
          />
        </TooltipUI>
      );
    case "assignment":
      return (
        <TooltipUI
          data={data}
          date={date}
          shareId={shareId}
          onShareIdChange={onShareIdChange}
        >
          <TopicItemLayout
            data={data}
            date={date}
            className={cn(
              "bg-purple-50 text-assignment",
              shareId === id && "bg-assignment text-white",
              className
            )}
          />
        </TooltipUI>
      );
    default:
      return null;
  }
}
