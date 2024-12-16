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
      <SidebarGroup>
        <SidebarCollapsibleItem trigger={<TriggerSkeleton />}>
          <div className="max-h-[calc(100vh-350px)] min-h-fit default-scrollbar space-y-2 mt-2">
            {[...Array(8).keys()].map((_, index) => (
              <ItemSkeleton key={index} />
            ))}
          </div>
        </SidebarCollapsibleItem>
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
