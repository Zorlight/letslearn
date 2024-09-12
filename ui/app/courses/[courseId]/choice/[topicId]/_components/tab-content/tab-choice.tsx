import { Button } from "@/lib/shadcn/button";
import { Separator } from "@/lib/shadcn/separator";
import { cn, formatDate } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";

const TabChoice = () => {
  return (
    <div className="space-y-4">
      <div className="bg-slate-50 rounded-md p-6 space-y-2">
        <p>
          <span className="font-bold">Closed: </span>
          {format(new Date(), "EEEE, dd MMMM yyyy, hh:mm a")}
        </p>
        <Separator />
        <p>What is the most important thing you learned from this course?</p>
      </div>

      <p>The result are not currently viewable.</p>
    </div>
  );
};

interface TableRowProps {
  children: React.ReactNode;
}
const TableRow = ({ children }: TableRowProps) => {
  return <tr className="odd:bg-gray-100 hover:bg-gray-200">{children}</tr>;
};

interface CellProps {
  children: React.ReactNode;
  isLeftColumn?: boolean;
}
const Cell = ({ children, isLeftColumn }: CellProps) => {
  return (
    <td
      className={cn(
        "p-2 border text-sm",
        isLeftColumn && "w-[200px] font-bold"
      )}
    >
      {children}
    </td>
  );
};

export default TabChoice;
