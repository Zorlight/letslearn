import { GET } from "@/lib/http-handle/http-handle";
import { QuizReport } from "@/models/report";

export const getQuizReport = (
  topicId: string,
  courseId: string,
  onSuccess: (data: QuizReport) => void,
  onFail: (err?: any) => void
) => {
  const url = `/topic/${topicId}/quiz-report?courseId=${courseId}`;
  GET(url, onSuccess, onFail);
};
