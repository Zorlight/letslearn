import React from "react";
import MiniTableRow from "../util/mini-table-row";
import {
  AssignmentResponseData,
  StudentResponse,
} from "@/models/student-response";
import { getDurationText } from "@/lib/utils";
import { AssignmentTopic } from "@/models/topic";
import { format } from "date-fns";
import { CloudinaryFile } from "@/models/cloudinary-file";
import { SubmissionStatus } from "../../submission/static-data";
import { BackgroundColor, GradingStatus, TextColor } from "./static-data";

interface Props {
  assignment: AssignmentTopic;
  assignmentResponse: StudentResponse | undefined;
}
const SubmissionStatusTable = ({ assignment, assignmentResponse }: Props) => {
  const { data } = assignment;
  const { close } = data;
  let submissionStatus = SubmissionStatus.NOT_SUBMITTED;
  let gradingStatus = GradingStatus.NOT_GRADED;
  let timeRemaining = "3 days 4 hours";
  let lastModified = "Not modified";
  let fileSubmitted: any = "No file submitted";
  let submissionStatusTextColor = "";
  let submissionStatusBackgroundColor = "";
  let timeRemainingTextColor = "";
  let timeRemainingBackgroundColor = "";

  const handleGetSubmissionStatus = (
    close: string | null,
    submittedAt: string | undefined
  ) => {
    if (!submittedAt) return SubmissionStatus.NOT_SUBMITTED;
    else if (submittedAt && close && new Date(submittedAt) < new Date(close)) {
      submissionStatusTextColor = TextColor.GREEN;
      submissionStatusBackgroundColor = BackgroundColor.GREEN;
      return SubmissionStatus.SUBMITTED_EARLY;
    } else {
      submissionStatusTextColor = TextColor.RED;
      submissionStatusBackgroundColor = BackgroundColor.RED;
      return SubmissionStatus.SUBMITTED_LATE;
    }
  };

  const handleGetTimeRemaining = (
    close: string | null,
    submittedAt: string | undefined
  ) => {
    if (!close) return "No due date";

    if (!submittedAt && new Date() < new Date(close)) {
      const durationText = getDurationText(new Date(), new Date(close), 1);
      return `${durationText} left`;
    } else if (!submittedAt && new Date() > new Date(close)) {
      timeRemainingTextColor = TextColor.RED;
      timeRemainingBackgroundColor = BackgroundColor.RED;
      return "Overdue by " + getDurationText(new Date(close), new Date(), 1);
    } else if (submittedAt && new Date(submittedAt) > new Date(close)) {
      timeRemainingTextColor = TextColor.RED;
      timeRemainingBackgroundColor = BackgroundColor.RED;
      return `Submitted late by ${getDurationText(
        new Date(close),
        new Date(submittedAt),
        1
      )}`;
    }
    timeRemainingTextColor = TextColor.GREEN;
    timeRemainingBackgroundColor = BackgroundColor.GREEN;
    return "Submitted early by " + getDurationText(close, submittedAt, 1);
  };

  const getUIFileSubmitted = (file: CloudinaryFile) => {
    return (
      <a
        href={file.downloadUrl}
        className="font-semibold text-cyan-500 hover:underline underline-offset-2 decoration-cyan-500"
      >
        {file.name}
      </a>
    );
  };

  if (assignmentResponse) {
    const { mark, submittedAt, files } =
      assignmentResponse.data as AssignmentResponseData;

    // submission status
    submissionStatus = handleGetSubmissionStatus(close, submittedAt);

    // grading status
    if (mark) gradingStatus = GradingStatus.GRADED;

    // time remaining
    timeRemaining = handleGetTimeRemaining(close, submittedAt);

    // last modified
    lastModified = format(new Date(submittedAt), "EEEE, d MMMM yyyy, h:mm a");

    // file submitted
    fileSubmitted = files.map(getUIFileSubmitted);
  }

  return (
    <div className="flex flex-col border rounded-lg">
      <MiniTableRow
        title="Submisison status"
        color={submissionStatusBackgroundColor}
      >
        <span className={submissionStatusTextColor}>{submissionStatus}</span>
      </MiniTableRow>
      <MiniTableRow title="Grading status">{gradingStatus}</MiniTableRow>
      <MiniTableRow title="Time remaining" color={timeRemainingBackgroundColor}>
        <span className={timeRemainingTextColor}>{timeRemaining}</span>
      </MiniTableRow>
      <MiniTableRow title="Last modified">{lastModified}</MiniTableRow>
      <MiniTableRow title="File(s) submitted">{fileSubmitted}</MiniTableRow>
    </div>
  );
};
export default SubmissionStatusTable;
