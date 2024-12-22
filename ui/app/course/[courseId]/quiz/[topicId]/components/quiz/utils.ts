import {
  getQuizResponseMark,
  QuizResponseData,
  sortQuizResponsesByCompletedDate,
  StudentResponse,
} from "@/models/student-response";

export const handleGetHighestGrade = (quizResponses: StudentResponse[]) => {
  return quizResponses.reduce((cur, quizResponse) => {
    const { data } = quizResponse;
    return Math.max(cur, getQuizResponseMark(data as QuizResponseData));
  }, 0);
};

export const handleGetAverageGrade = (quizResponses: StudentResponse[]) => {
  const grade =
    quizResponses.reduce((cur, quizResponse) => {
      const { data } = quizResponse;
      return cur + getQuizResponseMark(data as QuizResponseData);
    }, 0) / quizResponses.length;
  return grade;
};

export const handleGetFirstAttemptGrade = (
  quizResponses: StudentResponse[]
) => {
  const sortedByCompletedDate = sortQuizResponsesByCompletedDate(quizResponses);
  if (sortedByCompletedDate.length === 0) return 0;
  const firstAttempt = sortedByCompletedDate[0];
  const { data } = firstAttempt;
  return getQuizResponseMark(data as QuizResponseData);
};

export const handleGetLastAttemptGrade = (quizResponses: StudentResponse[]) => {
  const sortedByCompletedDate = sortQuizResponsesByCompletedDate(
    quizResponses,
    false
  );
  if (sortedByCompletedDate.length === 0) return 0;
  const lastAttempt = sortedByCompletedDate[0];
  const { data } = lastAttempt;
  return getQuizResponseMark(data as QuizResponseData);
};
