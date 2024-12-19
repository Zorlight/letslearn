import React from "react";
import ReviewNumber from "./review-number";
import { StudentResponse } from "@/models/student-response";

interface Props {
  assigned: number;
  studentResponse: StudentResponse[];
}
export default function QuizReviewNumber({ assigned, studentResponse }: Props) {
  const attempted = studentResponse.length;
  return (
    <div className="flex flex-row items-center gap-4">
      <ReviewNumber title="Attempted" number={attempted} />
      <ReviewNumber title="Assigned" number={assigned} />
    </div>
  );
}
