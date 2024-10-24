"use client";
import React from "react";
import TabList from "../tab-list";
import { TabProvider } from "@/provider/tab-provider";
import { cn } from "@/lib/utils";
interface Props {
  children?: React.ReactNode | React.ReactNode[];
  tabs: string[];
  className?: string;
}
export default function PageLayoutWithTab({
  children,
  tabs,
  className,
}: Props) {
  return (
    <div
      className={cn("flex flex-col w-full h-full overflow-hidden", className)}
    >
      <TabProvider initTab={tabs[0]}>
        <TabList
          tabs={tabs}
          className="sticky top-0 h-[40px] bg-white shadow-md"
        />
        <div className="relative w-full h-full p-5 overflow-y-scroll default-scrollbar">
          {children}
        </div>
      </TabProvider>
    </div>
  );
}
