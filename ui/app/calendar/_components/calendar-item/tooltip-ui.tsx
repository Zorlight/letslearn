"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/lib/shadcn/tooltip";
import { format } from "date-fns";
import React from "react";
import { TopicItem } from "../calendar/static-data";
import { isBothStartAndFinish, isFlagEnd, isFlagStart } from "./utils";
import { TooltipArrow } from "@radix-ui/react-tooltip";

interface Props {
  children: React.ReactNode;
  data: TopicItem;
  date: Date;
  shareId?: string;
  onShareIdChange?: (shareId: string | undefined) => void;
}

export default function TooltipUI({
  children,
  data,
  date,
  shareId,
  onShareIdChange,
}: Props) {
  const { topic, startTime, endTime } = data;
  const showBothStartAndFinish = isBothStartAndFinish(data, date);
  const showFlagStart = isFlagStart(data, date);
  const showFlagEnd = isFlagEnd(data, date);

  const dateStr = format(date, "EEEE, MMMM dd yyyy");
  let timeStr = "";
  if (showBothStartAndFinish) {
    const startTimeStr = format(startTime!, "hh:mm a");
    const endTimeStr = format(endTime!, "hh:mm a");
    timeStr = `Available from ${startTimeStr} to ${endTimeStr}`;
  } else if (showFlagStart) {
    timeStr = "Open at " + format(startTime!, "hh:mm a");
  } else if (showFlagEnd) {
    timeStr = "Close at " + format(endTime!, "hh:mm a");
  } else if (!startTime && !endTime) {
    timeStr = "No due time";
  } else {
    const time = startTime || endTime;
    timeStr = "Open at " + format(time!, "hh:mm a");
  }

  const handleMouseEnter = () => {
    if (onShareIdChange) onShareIdChange(topic.id);
  };
  const handleMouseLeave = () => {
    if (onShareIdChange) onShareIdChange(undefined);
  };

  const isOpen = shareId === topic.id;
  let tooltipSide: "top" | "left" | "right" | "bottom" | undefined = "top";
  if (showFlagStart) tooltipSide = "left";
  if (showFlagEnd) tooltipSide = "bottom";

  return (
    <TooltipProvider
      delayDuration={0}
      skipDelayDuration={0}
      disableHoverableContent
    >
      <Tooltip open={isOpen}>
        <TooltipTrigger
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent
          className="w-full flex flex-col gap-1 bg-black text-white border-0 pointer-events-none"
          side={tooltipSide}
        >
          <p className="font-bold">{topic.title}</p>
          <p>{dateStr}</p>
          <p className="font-bold">{timeStr}</p>
          <TooltipArrow />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
