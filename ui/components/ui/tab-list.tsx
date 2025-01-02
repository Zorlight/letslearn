import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Tab from "./tab";
import { useTab } from "@/hooks/useTab";

interface Props {
  tabs: string[];
  className?: string;
  variant?: "default" | "white-text";
  endIcon?: ReactNode;
  onEndIconClick?: () => void;
  onTabSelected?: (tab: string) => void;
}
const TabList = ({
  tabs,
  className,
  variant = "default",
  endIcon,
  onEndIconClick,
  onTabSelected,
}: Props) => {
  const tabContext = useTab<string>();
  const { selectedTab, handleTabSelected: onSelectTab } = tabContext;
  const handleTabSelected = (tab: string) => {
    onSelectTab(tab);
    if (onTabSelected) onTabSelected(tab);
  };
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-between px-5 border-b-[1px]",
        variant === "default" && "border-gray-400",
        variant === "white-text" && "border-white",
        className
      )}
    >
      <div className="w-full flex flex-row items-center">
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
      <div className="w-fit cursor-pointer" onClick={onEndIconClick}>
        {endIcon}
      </div>
    </div>
  );
};

export default TabList;
