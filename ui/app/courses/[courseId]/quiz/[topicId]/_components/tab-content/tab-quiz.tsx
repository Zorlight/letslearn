import { Button } from "@/lib/shadcn/button";
import { Separator } from "@/lib/shadcn/separator";
import { cn, formatDate } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";

const TabQuiz = () => {
  return (
    <div className="space-y-2">
      <div className="bg-slate-50 rounded-md p-6 space-y-2">
        <h4 className="font-medium">Seminar submission - 20/2/2022!</h4>
        <Separator />
        <div>
          <p>
            <span className="font-bold">Opened: </span>
            {format(new Date(), "EEEE, dd MMMM yyyy, hh:mm a")}
          </p>
          <p>
            <span className="font-bold">Due: </span>
            {format(new Date(), "EEEE, dd MMMM yyyy, hh:mm a")}
          </p>
        </div>
        <Separator />
        <p className="text-sm text-slate-600">
          Who is the best teacher in the world? Write a 500-word essay on why
          you
        </p>
      </div>

      <div className="flex flex-row gap-2">
        <Button variant="outline">View all submissions</Button>
        <Button variant="default">Grade</Button>
      </div>
      <div className="py-4 space-y-2">
        <h4 className="text-orange-600">Grading summary</h4>
        <table className="w-full">
          <tbody>
            <TableRow>
              <Cell isLeftColumn>Hidden from student</Cell>
              <Cell>No</Cell>
            </TableRow>
            <TableRow>
              <Cell isLeftColumn>Participants</Cell>
              <Cell>40</Cell>
            </TableRow>
            <TableRow>
              <Cell isLeftColumn>Submitted</Cell>
              <Cell>20</Cell>
            </TableRow>
            <TableRow>
              <Cell isLeftColumn>Time remaining</Cell>
              <Cell>Assignment is due</Cell>
            </TableRow>
          </tbody>
        </table>
      </div>
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

export default TabQuiz;
