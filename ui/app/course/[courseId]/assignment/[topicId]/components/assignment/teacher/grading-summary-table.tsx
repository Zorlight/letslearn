import React from "react";
import MiniTableRow from "../util/mini-table-row";
import {
  AssignmentResponseData,
  StudentResponse,
} from "@/models/student-response";

interface Props {
  assignmentResponses: StudentResponse[];
}
const GradingSummaryTable = ({ assignmentResponses }: Props) => {
  const isNotGraded = (response: StudentResponse) => {
    const { mark } = response.data as AssignmentResponseData;
    return mark === null;
  };
  const assigned = 40;
  const submitted = assignmentResponses.length;
  const needGrading = assignmentResponses.filter(isNotGraded).length;
  return (
    <div className="flex flex-col border rounded-lg">
      <MiniTableRow title="Assigned">{assigned}</MiniTableRow>
      <MiniTableRow title="Submitted">{submitted}</MiniTableRow>
      <MiniTableRow title="Need grading">{needGrading}</MiniTableRow>
    </div>
  );
};

export default GradingSummaryTable;
