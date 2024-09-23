import { fakeUser } from "@/fake-data/user";
import { Button } from "@/lib/shadcn/button";
import { Separator } from "@/lib/shadcn/separator";
import { cn } from "@/lib/utils";
import { QuizData, Test } from "@/models/quiz";
import {
  getQuizResponseMark,
  QuizResponseData,
  QuizStatus,
  StudentResponse,
} from "@/models/student-response";
import { nanoid } from "@reduxjs/toolkit";
import { SearchCheck } from "lucide-react";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { attemptsAllowedOptions, TabInTab } from "../static-data";
import QuizAttemptResult from "./_components/quiz-attempting-tab/quiz-attempt-result";

interface Props {
  quiz: Test;
  quizResponses: StudentResponse[];
  onSelectQuizResponse?: (quizResponse: StudentResponse) => void;
  onQuizResponsesChange?: (quizResponses: StudentResponse[]) => void;
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
  const { data, name } = quiz;
  const { questions, attemptAllowed, gradingMethod } = data as QuizData;

  const handlePreviewQuiz = () => {
    initQuizResponse();
    onTabInTabChange(TabInTab.QUIZ_ATTEMPTING_TAB);
  };

  const handleFinishLastPreview = () => {
    //get last quiz response
    const lastIndex = quizResponses.length - 1;
    const lastQuizResponse = quizResponses[lastIndex];
    if (onSelectQuizResponse) onSelectQuizResponse(lastQuizResponse);
    onTabInTabChange(TabInTab.QUIZ_ATTEMPTING_TAB);
  };

  const initQuizResponse = () => {
    if (!thisUser) {
      toast.error("You must login to start the quiz");
      return;
    }
    const startTime = new Date().toISOString();

    let quizResponseData: QuizResponseData = {
      status: QuizStatus.NOT_STARTED,
      startedAt: startTime,
      completedAt: startTime,
      answers: questions.map((question) => ({
        question: question,
        answer: "",
        mark: 0,
      })),
    };
    const newQuizResponse: StudentResponse = {
      id: nanoid(),
      student: thisUser,
      test: quiz,
      data: quizResponseData,
    };
    if (onQuizResponsesChange)
      onQuizResponsesChange([...quizResponses, newQuizResponse]);
    if (onSelectQuizResponse) onSelectQuizResponse(newQuizResponse);
  };

  const maxGrade = useMemo(() => {
    return questions.reduce((cur, question) => cur + question.defaultMark, 0);
  }, [questions]);

  const highestGrade = useMemo(() => {
    return quizResponses.reduce((cur, quizResponse) => {
      const { data } = quizResponse;
      return Math.max(cur, getQuizResponseMark(data as QuizResponseData));
    }, 0);
  }, [quizResponses]);
  const isExellent = highestGrade >= maxGrade * 0.8;
  const isGood =
    highestGrade >= maxGrade * 0.4 && highestGrade < maxGrade * 0.8;
  const isBad = highestGrade < maxGrade * 0.4;
  const hasFinishedQuiz = useMemo(() => {
    const quizResponseDatas = quizResponses.map(
      (quizResponse) => quizResponse.data as QuizResponseData
    );
    return quizResponseDatas.some(
      (quizResponseData) => quizResponseData.status === QuizStatus.FINISHED
    );
  }, [quizResponses]);

  //has the last quiz response not finished
  const hasLastReviewQuiz = useMemo(() => {
    if (quizResponses.length === 0) return false;
    const lastIndex = quizResponses.length - 1;
    const quizResponseData = quizResponses[lastIndex].data as QuizResponseData;
    return quizResponseData.status === QuizStatus.NOT_FINISHED;
  }, [quizResponses]);

  const handleReviewQuiz = (index: number) => {
    const quizToReview = quizResponses[index];
    if (onSelectQuizResponse) onSelectQuizResponse(quizToReview);
    onTabInTabChange(TabInTab.QUIZ_ATTEMPTING_TAB);
  };

  const handleRemoveQuizResponse = (index: number) => {
    const newQuizResponses = quizResponses.filter((_, i) => i !== index);
    if (onQuizResponsesChange) onQuizResponsesChange(newQuizResponses);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="bg-slate-50 rounded-md p-6 space-y-2">
        <h5 className="font-medium">{name}</h5>
        <Separator />
        <p className="text-sm text-slate-600">
          This quiz contains a variety of questions to test your knowledge of
          Alpine mountaineering. At the end of the quiz you will be given your
          score with suggestions for improvement.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {!hasLastReviewQuiz && (
          <Button
            variant="default"
            className="w-fit"
            onClick={handlePreviewQuiz}
          >
            <SearchCheck size={16} />
            Preview quiz
          </Button>
        )}
        {hasLastReviewQuiz && (
          <Button
            variant="default"
            className="w-fit"
            onClick={handleFinishLastPreview}
          >
            <SearchCheck size={16} />
            Continue last review
          </Button>
        )}
        {attemptAllowed !== attemptsAllowedOptions[0] && (
          <p className="text-sm text-slate-600">
            {`Attempts allowed: ${attemptAllowed}`}
          </p>
        )}
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
                onReview={() => handleReviewQuiz(index)}
                onRemove={() => handleRemoveQuizResponse(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TabQuiz;
