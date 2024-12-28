import AssignmentDashboard from "@/components/dashboard/assignment/assignment-dashboard";
import { AssignmentReport } from "@/models/report";
import { AssignmentTopic } from "@/models/topic";
import { getAssignmentReport } from "@/services/report";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  assignment: AssignmentTopic;
  courseId: string;
}
export default function TabDashboard({ assignment, courseId }: Props) {
  const [reportData, setReportData] = useState<AssignmentReport>();
  const handleGetReportSuccess = (data: AssignmentReport) => {
    console.log("assign report", data);
    setReportData(data);
  };
  const handleGetReportFail = (error: any) => {
    toast.error(error);
  };
  useEffect(() => {
    getAssignmentReport(
      assignment.id,
      courseId,
      handleGetReportSuccess,
      handleGetReportFail
    );
  }, [courseId, assignment.id]);

  if (!reportData) return null;
  return <AssignmentDashboard report={reportData} />;
}
