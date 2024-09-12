import React from "react";
import { cn } from "@/lib/utils";
import Tab from "./tab";

interface Props {
  tabs: string[];
  selectedTab: string;
  onSelected?: (tab: string) => void;
  className?: string;
}
const TabList = ({ tabs, selectedTab, onSelected, className }: Props) => {
  return (
    <div className={cn("flex flex-row items-center", className)}>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          title={tab}
          isSelected={tab === selectedTab}
          onClick={() => onSelected && onSelected(tab)}
        />
      ))}
    </div>
  );
};

export default TabList;
