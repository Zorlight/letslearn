import { cn, getDurationText } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";

interface Props {
  due: string;
  submittedAt?: string;
}
enum AssignmentStatus {
  OPEN,
  CLOSE,
}

enum SubmissionStatus {
  SUBMITTED,
  NOT_SUBMITTED,
}

enum Color {
  GREEN = "text-green-500",
  RED = "text-red-500",
  ORANGE = "text-orange-500",
}
export default function ActivityStatus({ due, submittedAt }: Props) {
  const current = new Date();
  const dueDate = new Date(due);
  let assignmentStatus = AssignmentStatus.OPEN;
  let submissionStatus = SubmissionStatus.NOT_SUBMITTED;
  let color = Color.ORANGE;

  if (current > dueDate) assignmentStatus = AssignmentStatus.CLOSE;
  if (submittedAt) submissionStatus = SubmissionStatus.SUBMITTED;

  //Eg: Sep 1
  const formattedDueDate = format(dueDate, "MMM d");
  let statusText = "";
  if (submissionStatus === SubmissionStatus.SUBMITTED) {
    statusText = "Done";
    color = Color.GREEN;
  } else if (
    submissionStatus === SubmissionStatus.NOT_SUBMITTED &&
    assignmentStatus === AssignmentStatus.CLOSE
  ) {
    statusText = "Overdue";
    color = Color.RED;
  } else {
    const dayLeft = getDurationText(due, current, 1);
    statusText = `${dayLeft} left`;
    color = Color.ORANGE;
  }
  return (
    <div className="text-gray-500 space-x-1">
      <span className="font-semibold">{`Due ${formattedDueDate}`}</span>
      <span className={cn("italic", color)}>{`(${statusText})`}</span>
    </div>
  );
}
