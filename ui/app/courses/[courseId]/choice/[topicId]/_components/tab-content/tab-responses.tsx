"use client";
import Cell from "@/app/courses/[courseId]/_components/simple-table/table-cell";
import TableRow from "@/app/courses/[courseId]/_components/simple-table/table-row";
import { useState } from "react";
import UserButton from "@/components/buttons/user-button";
import { fakeResponses } from "@/fake-data/student-response";

export type ResponsesData = {
  option: string;
  studentResponses: string[];
};

const TabResponses = () => {
  const [responses, setResponses] = useState<ResponsesData[]>(fakeResponses);

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="py-4 space-y-2">
        <h4 className="text-orange-600">Responses</h4>
        <table className="w-full">
          <tbody>
            <TableRow className="bg-white">
              <Cell isLeftColumn>Choice options</Cell>
              {responses.map((response, index) => (
                <Cell key={index} className="text-center">
                  {response.option}
                </Cell>
              ))}
            </TableRow>
            <TableRow>
              <Cell isLeftColumn>Number of responses</Cell>
              {responses.map((response, index) => (
                <Cell key={index} className="text-center">
                  {response.studentResponses.length}
                </Cell>
              ))}
            </TableRow>
            <TableRow>
              <Cell isLeftColumn>User who chose this option</Cell>
              {responses.map((response, index) => (
                <Cell key={index}>
                  <div className="flex flex-col items-start gap-2">
                    {response.studentResponses.map((student, index) => (
                      <UserButton
                        key={index}
                        userId={index.toString()}
                        userName={student}
                      />
                    ))}
                  </div>
                </Cell>
              ))}
            </TableRow>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabResponses;
