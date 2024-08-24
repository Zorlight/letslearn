"use client";
import { usePathname } from "next/navigation";
import { Route } from "./routes";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  data: Route;
}
const SidebarItem = ({ data }: Props) => {
  const { href, label, icon: Icon } = data;
  const path = usePathname();

  const isActive = path === "/" ? path === href : href.startsWith(path);
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-row items-center gap-2 py-4 px-6 border-r-4",
        "font-semibold border-white transition-all",
        isActive
          ? "bg-indigo-100 text-indigo-950 border-indigo-900"
          : "bg-white text-gray-500 hover:bg-indigo-50 hover:border-indigo-50"
      )}
    >
      <Icon size={20} />
      {label}
    </Link>
  );
};

export default SidebarItem;
