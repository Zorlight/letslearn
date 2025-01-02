"use client";
import React from "react";
import TabList from "../tab-list";
import { TabProvider } from "@/provider/tab-provider";
import { cn } from "@/lib/utils";
interface Props {
  children?: React.ReactNode | React.ReactNode[];
  initTab?: string;
  tabs: string[];
  className?: string;
  tabContentClassName?: string;
  endIcon?: React.ReactNode;
  onTabSelected?: (tab: string) => void;
  onEndIconClick?: () => void;
}
export default function PageLayoutWithTab({
  children,
  initTab,
  tabs,
  className,
  tabContentClassName,
  endIcon,
  onEndIconClick,
  onTabSelected,
}: Props) {
  return (
    <div
      className={cn("flex flex-col w-full h-full overflow-hidden", className)}
    >
      <TabProvider initTab={initTab || tabs[0]}>
        <TabList
          tabs={tabs}
          className="sticky top-0 h-[40px] bg-white shadow-md"
          onTabSelected={onTabSelected}
          endIcon={endIcon}
          onEndIconClick={onEndIconClick}
        />
        <div
          className={cn(
            "relative w-full h-full p-5 overflow-y-scroll default-scrollbar",
            tabContentClassName
          )}
        >
          {children}
        </div>
      </TabProvider>
    </div>
  );
}
