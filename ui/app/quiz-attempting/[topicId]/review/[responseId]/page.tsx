"use client";
import { StudentResponse } from "@/models/student-response";
import { getQuizResponse } from "@/services/quiz-response";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { defaultQuizResponse } from "../../components/static-data";
import QuizReview from "./components/quiz-review";
import { useAppSelector } from "@/redux/hooks";
import { Role } from "@/models/user";
import { getTopic } from "@/services/topic";
import { QuizTopic } from "@/models/topic";

interface Props {
  params: {
    topicId: string;
    responseId: string;
  };
}
export default function QuizReviewPage({ params }: Props) {
  const { topicId, responseId } = params;
  const user = useAppSelector((state) => state.profile.value);
  const preview = useAppSelector((state) => state.quizAttempting.preview);
  const [quiz, setQuiz] = useState<QuizTopic>();
  const [selectedQuizResponse, setSelectedQuizResponse] =
    useState<StudentResponse>(defaultQuizResponse);

  const handleGetQuizResponseSuccess = (quizResponse: StudentResponse) => {
    setSelectedQuizResponse(quizResponse);
  };
  const handleGetFail = (error: any) => {
    toast.error(error);
  };
  const handleGetPreviewQuizResponse = () => {
    if (!preview) return;
    setSelectedQuizResponse(preview);
  };
  const handleGetTopicSuccess = (data: QuizTopic) => {
    setQuiz(data);
  };

  useEffect(() => {
    if (!user) return;
    getTopic(topicId, handleGetTopicSuccess, handleGetFail);
    if (user.role === Role.STUDENT) {
      // fetch quiz response
      getQuizResponse(
        topicId,
        responseId,
        handleGetQuizResponseSuccess,
        handleGetFail
      );
    } else {
      handleGetPreviewQuizResponse();
    }
  }, [topicId, responseId, user]);
  if (!quiz) return null;
  return (
    <div className="p-5">
      <QuizReview quiz={quiz} quizResponse={selectedQuizResponse} />
    </div>
  );
}
