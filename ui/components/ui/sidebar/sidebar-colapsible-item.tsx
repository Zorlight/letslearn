"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/shadcn/accordion";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import React, { useEffect, useMemo, useRef } from "react";

interface Props {
  trigger: React.ReactNode;
  children: React.ReactNode;
  isSideBarOpen?: boolean;
}
export default function SidebarCollapsibleItem({
  trigger,
  children,
  isSideBarOpen = true,
}: Props) {
  const [isOpen, setIsOpen] = React.useState(true);
  const toggleTrigger = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Accordion type="single" collapsible defaultValue="accordion-item">
      <AccordionItem value="accordion-item">
        <AccordionTrigger
          className="w-full py-0 hover:no-underline text-gray-500 hover:bg-blue-50 hover:text-blue-700 rounded-r-full outline-none transition-all duration-200"
          onClick={toggleTrigger}
        >
          <ChevronRight
            className={cn(
              "absolute left-2 z-10 transition-all duration-200",
              isOpen && "rotate-90",
              !isSideBarOpen && "opacity-0 pointer-events-none",
              "max-lg:opacity-0 max-lg:pointer-events-none"
            )}
          />
          {trigger}
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
