"use client";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { Bell, Menu, MessageSquare, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Avatar from "../simple/avatar";
import BreadCrumb, { BreadcrumbItem } from "../simple/breadcrumb";
import NavbarButtonLayout from "./nav-button-layout";

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
  const handleAvatarClick = () => {
    router.push("/setting");
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
      <div className="flex flex-row items-center gap-1">
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

        <NavbarButtonLayout>
          <Bell size={20} />
        </NavbarButtonLayout>
        <NavbarButtonLayout>
          <MessageSquare size={20} />
        </NavbarButtonLayout>
        <Avatar className="hover:scale-110" onClick={handleAvatarClick} />
      </div>
    </div>
  );
}
