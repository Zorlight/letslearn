import React from "react";
import { cn } from "@/lib/utils";
import Tab from "./tab";
import { useTab } from "@/hooks/useTab";

interface Props {
  tabs: string[];
  className?: string;
  variant?: "default" | "white-text";
}
const TabList = ({ tabs, className, variant = "default" }: Props) => {
  const tabContext = useTab<string>();
  const { selectedTab, handleTabSelected } = tabContext;
  return (
    <div
      className={cn(
        "px-5 flex flex-row items-center border-b-[0.5px]",
        variant === "default" && "border-gray-400",
        variant === "white-text" && "border-white",
        className
      )}
    >
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          title={tab}
          isSelected={tab === selectedTab}
          variant={variant}
          onClick={() => handleTabSelected(tab)}
        />
      ))}
    </div>
  );
};

export default TabList;
