"use client";
import Navbar from "@/components/ui/navbar/navbar";
import Sidebar from "@/components/ui/sidebar/sidebar";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSidebarOpen } from "@/redux/slices/sidebar";
import { useEffect } from "react";
interface Props {
  children: React.ReactNode;
}
export default function MainLayout({ children }: Props) {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector((state) => state.sidebar.isOpen);
  const toggleSidebar = () => {
    dispatch(setSidebarOpen(!isSidebarOpen));
    localStorage.setItem("isSidebarOpen", JSON.stringify(!isSidebarOpen));
  };
  useEffect(() => {
    const getIsSideBarOpen = () => {
      const isSidebarOpen = localStorage.getItem("isSidebarOpen");
      return isSidebarOpen ? JSON.parse(isSidebarOpen) : true;
    };
    dispatch(setSidebarOpen(getIsSideBarOpen()));
  }, []);
  return (
    <div className="relative w-screen h-screen">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        className="absolute top-0 left-0 right-0"
      />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        className={cn(
          "absolute left-0 top-[60px] w-[350px] h-[calc(100%-60px)] max-lg:w-12",
          !isSidebarOpen && "w-12"
        )}
      />
      <div
        className={cn(
          "pt-[60px] pl-[350px] flex w-full h-full transition-all duration-500 max-lg:pl-12",
          !isSidebarOpen && "pl-12"
        )}
      >
        {children}
      </div>
    </div>
  );
}
