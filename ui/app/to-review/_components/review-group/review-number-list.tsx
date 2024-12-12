import React from "react";
import ReviewNumber from "./review-number";

interface Props {
  attempted: number;
  assigned: number;
  graded: number;
}
export default function ReviewNumberList({
  attempted,
  assigned,
  graded,
}: Props) {
  return (
    <div className="flex flex-row items-center gap-4">
      <ReviewNumber title="Attempted" number={attempted} />
      <ReviewNumber title="Assigned" number={assigned} />
      <ReviewNumber title="Graded" number={graded} />
    </div>
  );
}
