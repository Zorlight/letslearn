import React from "react";
import MiniTableRow from "../util/mini-table-row";
import {
  AssignmentResponseData,
  StudentResponse,
} from "@/models/student-response";
import { AssignmentTopic } from "@/models/topic";

interface Props {
  assignment: AssignmentTopic;
  assignmentResponses: StudentResponse[];
}
const GradingSummaryTable = ({ assignmentResponses, assignment }: Props) => {
  const isNotGraded = (response: StudentResponse) => {
    const { mark } = response.data as AssignmentResponseData;
    return mark === null;
  };
  const student = assignment.studentCount ?? 0;
  const submitted = assignmentResponses.length;
  const needGrading = assignmentResponses.filter(isNotGraded).length;
  return (
    <div className="flex flex-col border rounded-lg">
      <MiniTableRow title="Student">{student}</MiniTableRow>
      <MiniTableRow title="Submitted">{submitted}</MiniTableRow>
      <MiniTableRow title="Need grading">{needGrading}</MiniTableRow>
    </div>
  );
};

export default GradingSummaryTable;
