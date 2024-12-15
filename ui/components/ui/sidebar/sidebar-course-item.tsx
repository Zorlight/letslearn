"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface Props {
  courseName: string;
  category: string;
  image: React.ReactNode;
  className?: string;
  href?: string;
}
export default function SidebarCourseItem({
  courseName,
  category,
  image,
  className,
  href,
}: Props) {
  const router = useRouter();
  const path = usePathname();
  const isSelected = href ? path.startsWith(href) : false;
  const handleClick = () => {
    if (href) router.push(href);
  };
  return (
    <div
      className={cn(
        "relative flex flex-row items-center gap-6 text-gray-500 pl-8 py-2 hover:bg-blue-50 hover:text-blue-700 rounded-r-full transition-all duration-200 cursor-pointer",
        isSelected && "bg-blue-50 text-blue-700",
        className
      )}
      onClick={handleClick}
    >
      {image}
      <div className="w-full flex flex-col">
        <span className="font-bold">{courseName}</span>
        <span>{category}</span>
      </div>
    </div>
  );
}
