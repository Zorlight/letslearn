import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/lib/shadcn/tooltip";
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/models/message";
import { format } from "date-fns";

interface Props {
  message: ChatMessage;
  className?: string;
  tooltipSide?: "top" | "left" | "right" | "bottom";
}
export default function Message({ message, className, tooltipSide }: Props) {
  const { content, time } = message;
  const formatTime = format(new Date(time), "HH:mm");
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={cn(
              "w-fit rounded-full px-3 py-1 bg-blue-700 text-white",
              className
            )}
          >
            {content}
          </div>
        </TooltipTrigger>
        <TooltipContent
          className="rounded-full w-fit px-3 bg-black/70 text-white text-xs border-0 pointer-events-none"
          side={tooltipSide}
        >
          {formatTime}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
