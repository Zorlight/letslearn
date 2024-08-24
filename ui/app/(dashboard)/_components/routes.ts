import { BarChart, Compass, Layout, List, LucideIcon } from "lucide-react";

type Route = {
  icon: LucideIcon;
  label: string;
  href: string;
};
const guestRoutes: Route[] = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/browse",
  },
];
const teacherRoutes: Route[] = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

export type { Route };
export { guestRoutes, teacherRoutes };
