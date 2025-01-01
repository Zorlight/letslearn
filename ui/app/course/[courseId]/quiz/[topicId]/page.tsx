"use client";
import TabList from "@/components/ui/tab-list";
import PageLayout from "@/components/ui/util-layout/page-layout";
import { Course } from "@/models/course";
import { iconMap, QuizTopic } from "@/models/topic";
import { TabProvider } from "@/provider/tab-provider";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/slices/breadcrumb";
import { getCourse } from "@/services/course";
import { getTopic } from "@/services/topic";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Tab } from "./components/static-data";
import TabContent from "./components/tab-content/tab-content";
import { getQuizBreadcrumb } from "./components/utils";
import Loading from "./loading";
import { Role } from "@/models/user";
import { Users } from "lucide-react";
import { addComment, getComments } from "@/services/comment";
import { Comment } from "@/models/comment";
import { nanoid } from "@reduxjs/toolkit";
import CommentInput from "@/components/ui/comment/comment-input";
import CommentMessage from "@/components/ui/comment/comment-message";
import CommentList from "@/components/ui/comment/comment-list";

interface Props {
  params: {
    courseId: string;
    topicId: string;
  };
}
export default function QuizPage({ params }: Props) {
  const { courseId, topicId } = params;
  const [course, setCourse] = useState<Course>();
  const [quiz, setQuiz] = useState<QuizTopic>();
  const [initTab, setInitTab] = useState<string>(Tab.QUIZ);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.profile.value);
  const [comments, setComments] = useState<Comment[]>([]);

  const handleAddCommentSuccess = (data: Comment) => {
    setComments((prev) => [...prev, data]);
  };
  const handleSendComment = (message: string) => {
    if (!quiz || !user) return;
    const comment: Comment = {
      id: nanoid(4),
      text: message,
      topic: quiz,
      user: user,
      createdAt: new Date().toISOString(),
    };
    addComment(courseId, topicId, comment, handleAddCommentSuccess, handleFail);
  };

  const handleQuizChange = (data: QuizTopic) => {
    setQuiz(data);
  };
  const handleTabSelected = (tab: string) => {
    localStorage.setItem(`quiz-${topicId}`, tab);
  };

  const handleGetTopicSuccess = (data: QuizTopic) => {
    setQuiz(data);
  };

  const handleGetCourseSuccess = (data: Course) => {
    setCourse(data);
  };
  const handleFail = (error: any) => {
    toast.error(error);
  };

  useEffect(() => {
    if (!quiz || !course) return;
    dispatch(setBreadcrumb(getQuizBreadcrumb(course, quiz)));
  }, [course, quiz]);

  useEffect(() => {
    getCourse(courseId, handleGetCourseSuccess, handleFail);
  }, [courseId]);

  useEffect(() => {
    //this useEffect is used for updating tab based on local storage
    let storageTab = localStorage.getItem(`quiz-${topicId}`);
    if (storageTab) setInitTab(storageTab);

    getTopic(courseId, topicId, handleGetTopicSuccess, handleFail);
  }, [topicId]);

  useEffect(() => {
    getComments(courseId, topicId, setComments, handleFail);
  }, [topicId, courseId]);

  const Icon = iconMap.quiz;
  const teacherTabs = Object.values(Tab);
  const studentTabs = [Tab.QUIZ];

  if (!quiz || !user) return <Loading />;
  return (
    <PageLayout className="relative bg-pink-50 !overflow-y-hidden">
      <TabProvider initTab={initTab}>
        <div className="z-0 absolute top-0 w-full h-[250px] px-5 py-10 justify-center bg-gradient-to-br from-quiz via-[#751540] via-75% to-[#751540] shadow-[inset_4px_4px_20px_0px_#751540] text-white">
          <div className="w-full space-y-8">
            <div className="w-full px-5 flex flex-row gap-4">
              <Icon size={32} />
              <h3>{quiz.title}</h3>
            </div>
            <TabList
              tabs={user.role === Role.TEACHER ? teacherTabs : studentTabs}
              variant="white-text"
              onTabSelected={handleTabSelected}
            />
          </div>
        </div>
        <div className="z-10 mt-[150px] flex flex-col gap-5 w-full default-scrollbar p-5">
          <div className="w-full min-h-fit h-full bg-white rounded-md p-5 shadow-md">
            <TabContent
              courseId={courseId}
              quiz={quiz}
              onQuizChange={handleQuizChange}
            />
          </div>
          <div className="w-full min-h-fit h-full bg-white rounded-md p-5 shadow-md space-y-4">
            <div className="flex flex-row gap-2 text-gray-500 items-center">
              <Users size={20} />
              <span className="font-bold text-sm">Class comments</span>
            </div>
            <CommentList
              comments={comments}
              currentUser={user}
              onSend={handleSendComment}
              className="gap-4"
            />
          </div>
        </div>
      </TabProvider>
    </PageLayout>
  );
}
