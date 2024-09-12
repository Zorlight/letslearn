import Cell from "@/app/courses/[courseId]/_components/simple-table/table-cell";
import TableRow from "@/app/courses/[courseId]/_components/simple-table/table-row";
import { Button } from "@/lib/shadcn/button";
import { Separator } from "@/lib/shadcn/separator";
import { cn, formatDate } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";

const TabAssignment = () => {
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
            <TableRow className="odd:bg-gray-100 hover:bg-gray-200">
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

export default TabAssignment;
