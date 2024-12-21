"use client";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Bell,
  LogOut,
  Menu,
  MessageSquare,
  Plus,
  Settings2,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Avatar from "../simple/avatar";
import BreadCrumb, { BreadcrumbItem } from "../simple/breadcrumb";
import IconButton from "@/components/buttons/icon-button";
import { Role, User } from "@/models/user";
import { useEffect, useState } from "react";
import { getMyInfo } from "@/services/user";
import { toast } from "react-toastify";
import { setProfile } from "@/redux/slices/profile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/shadcn/dropdown-menu";
import { logout } from "@/services/auth";
import NavbarSkeleton from "./navbar-skeleton";
interface Props {
  className?: string;
  isSidebarOpen?: boolean;
  toggleSidebar?: () => void;
}
export default function Navbar({
  className,
  isSidebarOpen = true,
  toggleSidebar,
}: Props) {
  const user = useAppSelector((state) => state.profile.value);
  const dispatch = useAppDispatch();
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
  const handleGoToSetting = () => {
    router.push("/setting");
  };

  const handleClearLocalStorage = () => {
    localStorage.clear();
  };
  const handleLogout = () => {
    logout(
      () => {},
      () => {}
    );
    handleClearLocalStorage();
    toast.success("Logout successfully");
    router.push("/login");
  };
  const handleGetMyInfoSuccess = (data: User) => {
    dispatch(setProfile(data));
  };

  const handleGetMyInfoFail = (error: any) => {
    toast.error(error);
  };
  useEffect(() => {
    getMyInfo(handleGetMyInfoSuccess, handleGetMyInfoFail);
  }, []);
  if (!user) return <NavbarSkeleton className={className} />;
  return (
    <div
      className={cn(
        "w-full h-[60px] px-6 flex flex-row items-center justify-between bg-white border-b-[0.5px] border-gray-400 text-gray-500 transition-all duration-500",
        !isSidebarOpen && "pl-0 pr-1",
        className
      )}
    >
      <div className="flex flex-row items-center gap-6">
        <IconButton onClick={toggleSidebar}>
          <Menu />
        </IconButton>
        <BreadCrumb items={breadcrumbItems} />
      </div>
      <div
        className={cn(
          "flex flex-row items-center gap-1",
          !isSidebarOpen && "gap-0"
        )}
      >
        {isHomePage && user && user.role === Role.TEACHER && (
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

        <IconButton>
          <Bell size={20} />
        </IconButton>
        <IconButton>
          <MessageSquare size={20} />
        </IconButton>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <Avatar className="hover:scale-110" src={user?.image} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white font-sans z-50">
            <DropdownMenuItem
              className="flex gap-2 hover:bg-gray-100"
              onClick={handleGoToSetting}
            >
              <Settings2 size={16} />
              Setting
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-2 text-red-500 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
