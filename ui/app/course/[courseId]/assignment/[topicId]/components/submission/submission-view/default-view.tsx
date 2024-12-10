import React from "react";
import Part from "../part";
import { StudentResponse } from "@/models/student-response";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import EditorDisplay from "@/lib/tinymce/editor-display";
import { AssignmentTopic } from "@/models/topic";
interface Props {
  className?: string;
  assignment: AssignmentTopic;
  studentResponses: StudentResponse[];
}
export default function SubmissionDefaultView({
  assignment,
  studentResponses,
  className,
}: Props) {
  const { data } = assignment;
  const { open, close, description } = data;

  const openTime = open
    ? format(new Date(open), "EEEE, dd MMMM yyyy, h:mm a")
    : null;
  const closeTime = close
    ? format(new Date(close), "EEEE, dd MMMM yyyy, h:mm a")
    : null;
  return (
    <div className={cn(className)}>
      <div className="pb-4 space-y-2 border-b-[0.5px] border-gray-400 text-gray-800">
        {openTime && (
          <p>
            <span className="font-bold">Open: </span>
            <span className="text-gray-500">{openTime}</span>
          </p>
        )}
        {closeTime && (
          <p>
            <span className="font-bold">Close: </span>
            <span className="text-gray-500">{closeTime}</span>
          </p>
        )}
      </div>

      <Part title="Status">
        <div className="flex flex-row">
          <div className="flex flex-col pr-3 border-r-1 border-gray-400">
            <span className="font-bold text-xl">36</span>
            <span className="text-gray-500">Submitted</span>
          </div>
          <div className="flex flex-col px-3">
            <span className="font-bold text-xl">40</span>
            <span className="text-gray-500">Assigned</span>
          </div>
        </div>
      </Part>

      <Part title="Assignment" className="gap-0">
        <EditorDisplay className="text-gray-500" htmlString={description} />
      </Part>
    </div>
  );
}
