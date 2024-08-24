"use client";
import SidebarItem from "./sidebar-item";
import { guestRoutes, teacherRoutes } from "./routes";
import { usePathname } from "next/navigation";

const SidebarRoutes = () => {
  const path = usePathname();
  const isTeacherPage = path.includes("/teacher");
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  return (
    <ul className="w-full flex flex-col">
      {routes.map((route, index) => (
        <SidebarItem key={index} data={route} />
      ))}
    </ul>
  );
};

export default SidebarRoutes;
