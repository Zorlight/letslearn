"use client";
import { cn } from "@/lib/utils";
import { Category } from "@/models/course";
import { ReactNode } from "react";

interface Props {
  icon?: ReactNode;
  category: Category;
  isSelected?: boolean;
  onClick?: () => void;
}
const CategoryItem = ({
  icon,
  category,
  isSelected = false,
  onClick,
}: Props) => {
  return (
    <div
      className={cn(
        "flex flex-row item-center gap-1 text-indigo-950 border border-gray-200 rounded-full py-1 px-4 ease-linear duration-100 whitespace-nowrap select-none cursor-pointer hover:border-gray-400",
        isSelected && "bg-indigo-50 text-indigo-700 border-indigo-400"
      )}
      onClick={onClick}
    >
      {icon}
      {category.name}
    </div>
  );
};

export default CategoryItem;
