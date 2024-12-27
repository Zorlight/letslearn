"use client";
import QuizDashboard from "@/components/dashboard/quiz/quiz-dashboard";
import { QuizReport } from "@/models/report";
import { QuizTopic } from "@/models/topic";
import { getQuizReport } from "@/services/report";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  quiz: QuizTopic;
  courseId: string;
}
export default function TabDashboard({ quiz, courseId }: Props) {
  const [reportData, setReportData] = useState<QuizReport>();
  const handleGetReportSuccess = (data: QuizReport) => {
    setReportData(data);
  };
  const handleGetReportFail = (error: any) => {
    toast.error(error);
  };
  useEffect(() => {
    getQuizReport(
      quiz.id,
      courseId,
      handleGetReportSuccess,
      handleGetReportFail
    );
  }, [courseId, quiz.id]);

  if (!reportData) return null;
  return <QuizDashboard report={reportData} quiz={quiz} />;
}
