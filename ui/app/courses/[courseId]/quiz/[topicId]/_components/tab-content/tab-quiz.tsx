import { Button } from "@/lib/shadcn/button";
import { Separator } from "@/lib/shadcn/separator";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { SearchCheck } from "lucide-react";
import React, { useMemo } from "react";
import { GradingMethod, TabInTab } from "../static-data";
import {
  QuizResponse,
  QuizStatus,
  ResponseType,
} from "@/models/student-response";
import { fakeUser } from "@/fake-data/user";
import { toast } from "react-toastify";
import { nanoid } from "@reduxjs/toolkit";
import { Quiz } from "@/models/quiz";
import QuizAttemptResult from "./_components/quiz-attempting-tab/quiz-attempt-result";

interface Props {
  quiz: Quiz;
  quizResponses: QuizResponse[];
  onSelectQuizResponse?: (quizResponse: QuizResponse) => void;
  onQuizResponsesChange?: (quizResponses: QuizResponse[]) => void;
  onTabInTabChange: (tab: TabInTab) => void;
  className?: string;
}
const TabQuiz = ({
  className,
  quiz,
  quizResponses,
  onTabInTabChange,
  onQuizResponsesChange,
  onSelectQuizResponse,
}: Props) => {
  const thisUser = fakeUser;
  const { questions } = quiz;

  const handlePreviewQuiz = () => {
    initQuizResponse();
    onTabInTabChange(TabInTab.QUIZ_ATTEMPTING_TAB);
  };

  const initQuizResponse = () => {
    if (!thisUser) {
      toast.error("You must login to start the quiz");
      return;
    }
    const startTime = new Date().toISOString();
    let newQuizResponse: QuizResponse = {
      id: nanoid(),
      type: ResponseType.QUIZ,
      status: QuizStatus.NOT_STARTED,
      startedAt: startTime,
      completedAt: startTime,
      mark: 0,
      totalMark: 0,
      student: thisUser,
    };
    if (onQuizResponsesChange)
      onQuizResponsesChange([...quizResponses, newQuizResponse]);
    if (onSelectQuizResponse) onSelectQuizResponse(newQuizResponse);
  };

  const attemptsAllowed = 3;
  const gradingMethod = GradingMethod.HIGHEST_GRADE;
  const maxGrade = useMemo(() => {
    return questions.reduce((cur, question) => cur + question.defaultMark, 0);
  }, [questions]);

  const highestGrade = useMemo(() => {
    return quizResponses.reduce((cur, quizResponse) => {
      return Math.max(cur, quizResponse.mark);
    }, 0);
  }, [quizResponses]);
  const isExellent = highestGrade >= maxGrade * 0.8;
  const isGood =
    highestGrade >= maxGrade * 0.4 && highestGrade < maxGrade * 0.8;
  const isBad = highestGrade < maxGrade * 0.4;
  const hasFinishedQuiz = useMemo(() => {
    return quizResponses.some(
      (quizResponse) => quizResponse.status === QuizStatus.FINISHED
    );
  }, [quizResponses]);

  return (
    <div className={cn("space-y-6", className)}>
      <div className="bg-slate-50 rounded-md p-6 space-y-2">
        <h5 className="font-medium">Quiz - 20/2/2022!</h5>
        <Separator />
        <p className="text-sm text-slate-600">
          This quiz contains a variety of questions to test your knowledge of
          Alpine mountaineering. At the end of the quiz you will be given your
          score with suggestions for improvement.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Button variant="default" className="w-fit" onClick={handlePreviewQuiz}>
          <SearchCheck size={16} />
          Preview quiz
        </Button>
        <p className="text-sm text-slate-600">
          {`Attempts allowed: ${attemptsAllowed}`}
        </p>
        <p className="text-sm text-slate-600">
          {`Grading method: ${gradingMethod}`}
        </p>
      </div>
      {hasFinishedQuiz && (
        <div className="flex flex-col gap-4 mt-8">
          <h5
            className={cn(
              isExellent && "text-green-500",
              isGood && "text-yellow-500",
              isBad && "text-red-500"
            )}
          >{`Highest grade: ${highestGrade} / ${maxGrade}`}</h5>
          <h5 className="text-orange-500">Your attempt</h5>

          <div className="flex flex-col gap-4">
            {quizResponses.map((quizResponse, index) => (
              <QuizAttemptResult
                key={index}
                responseIndex={index}
                quizResponse={quizResponse}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TabQuiz;
