import React from "react";
import MiniTableRow from "./mini-table-row";

interface Props {
  hiddenFromStudent: number;
  assigned: number;
  submitted: number;
  needGrading: number;
}
const GradingSummaryTable = ({
  hiddenFromStudent,
  assigned,
  submitted,
  needGrading,
}: Props) => {
  return (
    <div className="flex flex-col border rounded-lg">
      <MiniTableRow title="Hidden from student">
        {hiddenFromStudent !== 0 ? hiddenFromStudent : "No"}
      </MiniTableRow>
      <MiniTableRow title="Assigned">{assigned}</MiniTableRow>
      <MiniTableRow title="Submitted">{submitted}</MiniTableRow>
      <MiniTableRow title="Need grading">{needGrading}</MiniTableRow>
    </div>
  );
};

export default GradingSummaryTable;
