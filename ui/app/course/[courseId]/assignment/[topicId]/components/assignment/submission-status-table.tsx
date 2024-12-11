import React from "react";
import MiniTableRow from "./mini-table-row";
import {
  AssignmentResponseData,
  StudentResponse,
} from "@/models/student-response";
import { getDurationText } from "@/lib/utils";
import { AssignmentTopic } from "@/models/topic";
import { format } from "date-fns";

interface Props {
  assignment: AssignmentTopic;
  assignmentResponse: StudentResponse | undefined;
}
const SubmissionStatusTable = ({ assignment, assignmentResponse }: Props) => {
  const { data } = assignment;
  const { close } = data;
  let submissionStatus = "Not submitted";
  let gradingStatus = "Not graded";
  let timeRemaining = "3 days 4 hours";
  let lastModified = "Not modified";
  let fileSubmitted = "No file submitted";

  if (assignmentResponse) {
    const { mark, submittedAt, files } =
      assignmentResponse.data as AssignmentResponseData;
    submissionStatus = "Submitted";
    if (mark) gradingStatus = "Graded";
    const isSubmittedEarly = close
      ? new Date(submittedAt) < new Date(close)
      : true;
    timeRemaining =
      "This assignment was submitted" +
      (isSubmittedEarly ? " early " : " late ") +
      getDurationText(close, submittedAt);
    lastModified = format(new Date(submittedAt), "EEEE, dd/MM/yyyy H:mm a");
    fileSubmitted = files.length + " file(s) submitted";
  }

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
