import React from "react";
import MiniTableRow from "./mini-table-row";

interface Props {}
const SubmissionStatusTable = ({}: Props) => {
  const submissionStatus = "Not submitted";
  const gradingStatus = "Not graded";
  const timeRemaining = "3 days 4 hours";
  const lastModified = "Not modified";
  const fileSubmitted = "No file submitted";

  return (
    <div className="flex flex-col border rounded-lg">
      <MiniTableRow title="Submisison status">{submissionStatus}</MiniTableRow>
      <MiniTableRow title="Grading status">{gradingStatus}</MiniTableRow>
      <MiniTableRow title="Time remaining">{timeRemaining}</MiniTableRow>
      <MiniTableRow title="Last modified">{lastModified}</MiniTableRow>
      <MiniTableRow title="File(s) submitted">{fileSubmitted}</MiniTableRow>
    </div>
  );
};
export default SubmissionStatusTable;
