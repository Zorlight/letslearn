import React from "react";
import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  return (
    <div className={cn("h-full flex flex-col overflow-y-auto")}>
      <div className="h-[80px] p-6">
        <Logo />
      </div>
      <SidebarRoutes />
    </div>
  );
};

export default Sidebar;
