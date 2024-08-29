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
        <Button
          variant="indigo"
          size="icon"
          className="rounded-full select-none pointer-events-none"
        >
          {icon}
        </Button>
        <span className="font-medium">{title}</span>
      </div>
      <div className="w-full space-y-4">{children}</div>
    </div>
  );
};

export default CourseItemLayout;
