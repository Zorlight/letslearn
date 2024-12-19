"use client";
import IconBadge from "@/components/ui/simple/icon-badge";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/shadcn/accordion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  value: string;
  title: ReactNode;
  numOfItems?: number;
  onTrigger?: (value: string) => void;
  showContent: string[];
  children: ReactNode;
  className?: string;
}
const CollapsibleContent = ({
  title,
  value,
  numOfItems,
  onTrigger,
  children,
  showContent,
  className,
}: Props) => {
  const handleTrigger = () => {
    if (onTrigger) onTrigger(value);
  };
  return (
    <AccordionItem value={value} className={className}>
      <AccordionTrigger className="w-full decoration-indigo-800 text-indigo-800 p-0">
        <div
          className="w-full p-4 hover:bg-gray-50 flex flex-row items-center justify-between gap-4 cursor-pointer transition-all duration-200"
          onClick={handleTrigger}
        >
          <h5>{title}</h5>

          <div className="flex flex-row gap-4 items-center">
            <h6
              className={cn(
                "font-semibold",
                numOfItems === 0 && "text-gray-500"
              )}
            >
              {numOfItems}
            </h6>
            <IconBadge
              icon={<ChevronLeft />}
              size="sm"
              className={cn(showContent.includes(value) && "-rotate-90")}
              onClick={handleTrigger}
            />
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
};

export default CollapsibleContent;
