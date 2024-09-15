import React from "react";
import { cn } from "@/lib/utils";
import Tab from "./tab";
import { useTab } from "@/hooks/useTab";

interface Props {
  tabs: string[];
  className?: string;
}
const TabList = ({ tabs, className }: Props) => {
  const tabContext = useTab<string>();
  const { selectedTab, handleTabSelected } = tabContext;
  return (
    <div className={cn("flex flex-row items-center", className)}>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          title={tab}
          isSelected={tab === selectedTab}
          onClick={() => handleTabSelected(tab)}
        />
      ))}
    </div>
  );
};

export default TabList;
