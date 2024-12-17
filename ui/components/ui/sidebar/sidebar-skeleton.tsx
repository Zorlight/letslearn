import React from "react";
import SidebarGroup from "./sidebar-group";
import SidebarItem from "./sidebar-item";
import { Calendar, Home, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import SidebarCollapsibleItem from "./sidebar-colapsible-item";
import Rectangle from "../skeleton/rectangle";

interface Props {
  className?: string;
}
export default function SidebarSkeleton({ className }: Props) {
  return (
    <div
      className={cn(
        "w-[350px] h-[calc(100%-60px)] flex flex-col border-r-[0.5px] border-gray-400 bg-white",
        className
      )}
    >
      <SidebarGroup hasBorder={false}>
        <SidebarItem title="Home" icon={<Home />} href="/home" />
        <SidebarItem title="Calendar" icon={<Calendar />} href="/calendar" />
        <SidebarItem title="Setting" icon={<Settings />} href="/setting" />
      </SidebarGroup>
    </div>
  );
}

const ItemSkeleton = () => {
  return <Rectangle className="min-h-[48px] rounded-r-full" />;
};

const TriggerSkeleton = () => {
  return <Rectangle className="w-[359px] min-h-[48px] rounded-r-full" />;
};
