import AssignmentDashboard from "@/components/dashboard/assignment/assignment-dashboard";
import { StudentResponse } from "@/models/student-response";
import { AssignmentTopic } from "@/models/topic";

interface Props {
  assignment: AssignmentTopic;
  onAssignmentResponsesChange?: (
    assignmentResponses: StudentResponse[]
  ) => void;
  className?: string;
}
export default function TabDashboard({
  className,
  assignment,
  onAssignmentResponsesChange,
}: Props) {
  return <AssignmentDashboard />;
}
