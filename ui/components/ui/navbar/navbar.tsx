"use client";
import { Bell, Menu, MessageSquare, Plus } from "lucide-react";
import React from "react";
import Avatar from "../simple/avatar";
import { cn } from "@/lib/utils";
import BreadCrumb, { BreadcrumbItem } from "../simple/breadcrumb";
import AddCourseDialog from "./create-meeting-dialog";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

interface Props {
  className?: string;
  role?: "teacher" | "student";
}
export default function Navbar({ className, role = "teacher" }: Props) {
  const breadcrumbItems: BreadcrumbItem[] = useAppSelector(
    (state) => state.breadcrumb.items
  );
  const router = useRouter();
  const path = usePathname();
  const isHomePage = path === "/home";
  const isCreateCoursePage = path.includes("/course/create");
  const handleAddCourse = () => {
    router.push("/course/create");
  };
  return (
    <div
      className={cn(
        "h-[60px] px-9 flex flex-row items-center justify-between bg-white border-b-[0.5px] border-gray-400 text-gray-700",
        className
      )}
    >
      <div className="flex flex-row items-center gap-6">
        <Menu size={20} />
        <BreadCrumb items={breadcrumbItems} />
      </div>
      <div className="flex flex-row items-center gap-2">
        {isHomePage && role === "teacher" && (
          <div
            className={cn(
              "p-3 rounded-full hover:bg-gray-100 cursor-pointer",
              isCreateCoursePage && "bg-white"
            )}
            onClick={handleAddCourse}
          >
            <Plus
              size={20}
              className={cn(isCreateCoursePage && "text-white")}
            />
          </div>
        )}

        <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
          <Bell size={20} />
        </div>
        <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
          <MessageSquare size={20} />
        </div>
        <Avatar />
      </div>
    </div>
  );
}
