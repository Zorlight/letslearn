"use client";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export type BreadcrumbItem = {
  label: string;
  href: string;
};
interface Props {
  items: BreadcrumbItem[];
}
const BreadCrumb = ({ items }: Props) => {
  const router = useRouter();
  const handleLinkClick = (href: string) => {
    router.push(href);
  };
  return (
    <div className="flex flex-row items-center gap-4 select-none">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-row items-center gap-4 text-gray-500"
        >
          <span
            className="font-bold text-sm hover:underline underline-offset-4 cursor-pointer"
            onClick={() => handleLinkClick(item.href)}
          >
            {item.label}
          </span>
          {index !== items.length - 1 && (
            <ChevronRight className="text-gray-400" />
          )}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumb;
