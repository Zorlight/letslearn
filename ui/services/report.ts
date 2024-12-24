import { GET } from "@/lib/http-handle/http-handle";

export const getReportTest = (
  topicId: string,
  courseId: string,
  onSuccess: (data: any) => void,
  onFail: (err?: any) => void
) => {
  const url = `/topic/${topicId}/report?courseId=${courseId}`;
  GET(url, onSuccess, onFail);
};
