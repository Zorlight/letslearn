import { Button } from "@/lib/shadcn/button";
import EditorDisplay from "@/lib/tinymce/editor-display";
import { cn } from "@/lib/utils";

import { AssignmentTopic } from "@/models/topic";
import { format } from "date-fns";
import GradingSummary from "../assignment/grading-summary-table";
import { Role, User } from "@/models/user";
import GradingView from "../assignment/grading-view";
import SubmissionView from "../assignment/submission-view";
import { StudentResponse } from "@/models/student-response";
import { CloudinaryFile } from "@/models/cloudinary-file";
import { defaultAssignmentResponse } from "../assignment/static-data";
import { createAssignmentResponse } from "@/services/assignment-response";
import { toast } from "react-toastify";

interface Props {
  user: User;
  assignment: AssignmentTopic;
  assignmentResponses: StudentResponse[];
  className?: string;
  onAssignmentResponsesChange?: (responses: StudentResponse[]) => void;
}
const TabAssignment = ({
  className,
  assignment,
  assignmentResponses,
  user,
  onAssignmentResponsesChange,
}: Props) => {
  const { data } = assignment;
  const { open, close, description } = data;
  const responseOfStudent = assignmentResponses.find(
    (response) => response.student.id === user.id
  );

  const openTime = open
    ? format(new Date(open), "EEEE, dd MMMM yyyy, h:mm a")
    : null;
  const closeTime = close
    ? format(new Date(close), "EEEE, dd MMMM yyyy, h:mm a")
    : null;

  const handleCreateAssignmentResponseSuccess = (res: StudentResponse) => {
    if (onAssignmentResponsesChange) {
      onAssignmentResponsesChange([...assignmentResponses, res]);
    }
  };

  const handleCreateAssignmentResponseFail = (err: any) => {
    toast.error(err);
  };

  const handleUploaded = (files: CloudinaryFile[]) => {
    let initAssignmentResponses = defaultAssignmentResponse;
    initAssignmentResponses = {
      ...initAssignmentResponses,
      topicId: assignment.id,
      data: {
        ...initAssignmentResponses.data,
        files: files,
        submittedAt: new Date().toISOString(),
      },
    };
    createAssignmentResponse(
      assignment.id,
      initAssignmentResponses,
      handleCreateAssignmentResponseSuccess,
      handleCreateAssignmentResponseFail
    );
  };

  return (
    <div className={cn(className)}>
      <div className="pb-4 space-y-2 border-b-[0.5px] border-gray-300 text-gray-700">
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
      <EditorDisplay className="text-gray-500" htmlString={description} />
      {/* {role === Role.TEACHER && <GradingView />}
      {role === Role.STUDENT && <SubmissionView />} */}
      <SubmissionView
        assignemnt={assignment}
        assignmentResponse={responseOfStudent}
        onUploaded={handleUploaded}
      />
    </div>
  );
};

export default TabAssignment;
