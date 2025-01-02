"use client";
import { StudentResponse } from "@/models/student-response";
import { getQuizResponse } from "@/services/quiz-response";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { defaultQuizResponse } from "../../components/static-data";
import QuizReview from "./components/quiz-review";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Role, User } from "@/models/user";
import { getTopic } from "@/services/topic";
import { QuizTopic } from "@/models/topic";
import { useSearchParams } from "next/navigation";
import { getMyInfo } from "@/services/user";
import { setProfile } from "@/redux/slices/profile";

interface Props {
  params: {
    topicId: string;
    responseId: string;
  };
}
export default function QuizReviewPage({ params }: Props) {
  const { topicId, responseId } = params;
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.profile.value);
  const preview = useAppSelector((state) => state.quizAttempting.preview);
  const [quiz, setQuiz] = useState<QuizTopic>();
  const [selectedQuizResponse, setSelectedQuizResponse] =
    useState<StudentResponse>(defaultQuizResponse);
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");

  const handleGetQuizResponseSuccess = (quizResponse: StudentResponse) => {
    setSelectedQuizResponse(quizResponse);
  };
  const handleFail = (error: any) => {
    toast.error(error);
  };
  const handleGetPreviewQuizResponse = () => {
    if (!preview) return;
    setSelectedQuizResponse(preview);
  };
  const handleGetTopicSuccess = (data: QuizTopic) => {
    setQuiz(data);
  };
  const handleGetUserSuccess = (data: User) => {
    dispatch(setProfile(data));
  };

  useEffect(() => {
    if (!user || !courseId) return;

    getTopic(courseId, topicId, handleGetTopicSuccess, handleFail);
    if (responseId.length === 4) handleGetPreviewQuizResponse();
    else {
      // fetch quiz response
      getQuizResponse(
        topicId,
        responseId,
        handleGetQuizResponseSuccess,
        handleFail
      );
    }
  }, [topicId, responseId, user]);

  if (!quiz) return null;
  return (
    <div className="p-5">
      <QuizReview quiz={quiz} quizResponse={selectedQuizResponse} />
    </div>
  );
}
