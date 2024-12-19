import React from "react";
import ReviewNumber from "./review-number";
import {
  AssignmentResponseData,
  StudentResponse,
} from "@/models/student-response";

interface Props {
  assigned: number;
  studentResponse: StudentResponse[];
}
export default function AssignmentReviewNumber({
  assigned,
  studentResponse,
}: Props) {
  const submitted = studentResponse.length;
  const graded = studentResponse.filter((response) => {
    const { mark } = response.data as AssignmentResponseData;
    return mark !== null;
  }).length;
  return (
    <div className="flex flex-row items-center gap-4">
      <ReviewNumber title="Graded" number={graded} />
      <ReviewNumber title="Submitted" number={submitted} />
      <ReviewNumber title="Assigned" number={assigned} />
    </div>
  );
}
