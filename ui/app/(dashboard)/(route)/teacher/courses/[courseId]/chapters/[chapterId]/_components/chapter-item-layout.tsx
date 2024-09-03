import IconBadge from "@/components/buttons/icon-badge";
import { Button } from "@/lib/shadcn/button";
import React, { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  children: ReactNode[] | ReactNode;
}
const ChapterItemLayout = ({ icon, title, children }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center gap-2">
        <IconBadge icon={icon} />
        <span className="font-medium">{title}</span>
      </div>
      <div className="w-full flex flex-col gap-4">{children}</div>
    </div>
  );
};

export default ChapterItemLayout;
