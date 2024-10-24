import IconBadge from "@/components/ui/simple/icon-badge";
import { Button } from "@/lib/shadcn/button";
import React, { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  children: ReactNode[] | ReactNode;
}
const CourseItemLayout = ({ icon, title, children }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center gap-2">
        <IconBadge icon={icon} />
        <span className="font-medium">{title}</span>
      </div>
      <div className="w-full space-y-4">{children}</div>
    </div>
  );
};

export default CourseItemLayout;
