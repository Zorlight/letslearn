"use client";
import IconBadge from "@/components/buttons/icon-badge";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/shadcn/accordion";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  value: string;
  title: ReactNode;
  onTrigger?: (value: string) => void;
  showContent: string[];
  children: ReactNode;
}
const CollapsibleContent = ({
  title,
  value,
  onTrigger,
  children,
  showContent,
}: Props) => {
  const handleTrigger = () => {
    if (onTrigger) onTrigger(value);
  };
  return (
    <AccordionItem value={value}>
      <AccordionTrigger>
        <div
          className="w-fit flex flex-row items-center justify-start gap-4 cursor-pointer"
          onClick={handleTrigger}
        >
          <IconBadge
            icon={<ChevronRight />}
            size="sm"
            className={cn(showContent.includes(value) && "rotate-90")}
            onClick={handleTrigger}
          />
          <h5 className="text-indigo-800">{title}</h5>
        </div>
      </AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
};

export default CollapsibleContent;
