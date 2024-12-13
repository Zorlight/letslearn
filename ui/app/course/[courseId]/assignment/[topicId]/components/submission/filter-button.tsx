import { Button } from "@/lib/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/lib/shadcn/dropdown-menu";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";
import React from "react";

interface Props {
  data: Record<string, any>;
  selectedKey: string;
  handleSelectChange?: (key: string) => void;
}
export default function FilterButton({
  data,
  selectedKey,
  handleSelectChange,
}: Props) {
  const keys = Object.keys(data);
  const handleSelect = (key: string) => () => {
    if (handleSelectChange) handleSelectChange(key);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            "w-[100px] text-left text-gray-500 font-bold bg-gray-100 hover:bg-gray-200 ease-linear duration-100 py-2 rounded-md cursor-pointer outline-none select-none",
            "dark:bg-white/10 dark:hover:bg-white/20"
          )}
        >
          <Filter className="h-4 w-4" />
          <span>{selectedKey === "" ? "Filter" : data[selectedKey]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-sans bg-white z-50">
        <DropdownMenuCheckboxItem
          key="all"
          checked={selectedKey === ""}
          onClick={handleSelect("")}
          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 ease-linear duration-100"
        >
          All
        </DropdownMenuCheckboxItem>
        {keys.map((key, index) => {
          return (
            <DropdownMenuCheckboxItem
              key={index}
              checked={selectedKey === key}
              onClick={handleSelect(key)}
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 ease-linear duration-100"
            >
              {data[key]}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
