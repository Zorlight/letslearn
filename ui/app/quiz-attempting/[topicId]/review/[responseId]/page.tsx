"use client";
import { StudentResponse } from "@/models/student-response";
import { getQuizResponse } from "@/services/quiz-response";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { defaultQuizResponse } from "../../components/static-data";
import QuizReview from "./components/quiz-review";
import { useAppSelector } from "@/redux/hooks";
import { Role } from "@/models/user";

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
  const [selectedQuizResponse, setSelectedQuizResponse] =
    useState<StudentResponse>(defaultQuizResponse);

  const handleGetQuizResponseSuccess = (quizResponse: StudentResponse) => {
    setSelectedQuizResponse(quizResponse);
  };
  const handleGetQuizResponseFail = (error: any) => {
    toast.error(error);
  };
  const handleGetPreviewQuizResponse = () => {
    if (!preview) return;
    setSelectedQuizResponse(preview);
  };
  useEffect(() => {
    if (!user) return;
    if (user.role === Role.STUDENT) {
      // fetch quiz response
      getQuizResponse(
        topicId,
        responseId,
        handleGetQuizResponseSuccess,
        handleGetQuizResponseFail
      );
    } else {
      handleGetPreviewQuizResponse();
    }
  }, [topicId, responseId, user]);
  return (
    <div className="p-5">
      <QuizReview quizResponse={selectedQuizResponse} />
    </div>
  );
}
