import React, { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/lib/shadcn/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";

interface Props {
  children: ReactNode;
  content: ReactNode;
}
export default function TopicTooltip({ children, content }: Props) {
  if (!content) return children;
  return (
    <TooltipProvider
      delayDuration={50}
      skipDelayDuration={50}
      disableHoverableContent
    >
      <Tooltip>
        <TooltipTrigger className="cursor-default">{children}</TooltipTrigger>
        <TooltipContent className="w-full flex flex-col gap-1 bg-black text-white border-0 pointer-events-none">
          {content}
          <TooltipArrow />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
