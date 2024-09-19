"use client";
import { fakeQuestions } from "@/fake-data/question";
import { Button } from "@/lib/shadcn/button";
import { Card } from "@/lib/shadcn/card";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";
import QuestionBlock from "../../quiz-attempting/question-navigation-box/question-block";
import QuestionDisplay from "../../quiz-attempting/question-display/question-display";
import { QuestionResult, TabInTab } from "../../static-data";
import BackwardButtonIconText from "../_components/backward-button-icon-text";
import {
  colorAnnotations,
  symbolAnnotations,
} from "../_components/static-data";
import { scrollToQuestion } from "../_components/utils";
import FinishAttemptDialog from "../../quiz-attempting/finish-attempt-dialog";
import SymbolAnnotation from "../_components/quiz-attempting-tab/symbol-annotation";
import ColorAnnotation from "../_components/quiz-attempting-tab/color-annotation";
import QuizAttemptResult from "../_components/quiz-attempting-tab/quiz-attempt-result";
import {
  QuizResponse,
  QuizStatus,
  ResponseType,
} from "@/models/student-response";
import { fakeUser } from "@/fake-data/user";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";

interface Props {
  onTabInTabChange?: (tab: TabInTab) => void;
  className?: string;
}
const QuizAttemptingTab = ({ className, onTabInTabChange }: Props) => {
  const totalQuestions = fakeQuestions.length;
  // const thisUser = useAppSelector((state) => state.profile.value);

  const thisUser = fakeUser;
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [flags, setFlags] = useState<boolean[]>(fakeQuestions.map(() => false));
  const [hasAnswers, setHasAnswers] = useState<boolean[]>(
    fakeQuestions.map(() => false)
  );
  const [questionResults, setQuestionResults] = useState(
    fakeQuestions.map(() => QuestionResult.NOT_SHOW)
  );
  const [marks, setMarks] = useState<number[]>(fakeQuestions.map(() => 0));
  const [questions, setQuestions] = useState(fakeQuestions);
  const [quizResponse, setQuizResponse] = useState<QuizResponse>();
  const handleFlagChange = (index: number) => {
    const newFlags = [...flags];
    newFlags[index] = !newFlags[index];
    setFlags(newFlags);
  };

  const handleAnswerSelected = (index: number, value: boolean = true) => {
    const newHasAnswers = [...hasAnswers];
    newHasAnswers[index] = value;
    setHasAnswers(newHasAnswers);
  };
  const handleShowingCorrectAnswer = () => {
    setShowCorrectAnswer(!showCorrectAnswer);
  };

  const handleMarkChange = (index: number, mark: number) => {
    const newMarks = [...marks];
    newMarks[index] = mark;
    setMarks(newMarks);
  };

  useEffect(() => {
    let newResults;
    if (showCorrectAnswer) {
      const getResultByMark = (index: number, mark: number) => {
        let result = QuestionResult.NOT_SHOW;
        const defaultMark = questions[index].defaultMark;
        if (mark === defaultMark) result = QuestionResult.FULL_MARK;
        else if (mark === 0) result = QuestionResult.ZERO_MARK;
        else result = QuestionResult.PARTIAL_MARK;

        return result;
      };
      newResults = marks.map((mark, index) => getResultByMark(index, mark));
    } else newResults = fakeQuestions.map(() => QuestionResult.NOT_SHOW);

    setQuestionResults(newResults);
  }, [showCorrectAnswer, marks, questions]);

  const handleGoBack = () => {
    if (onTabInTabChange) onTabInTabChange(TabInTab.MAIN_TAB);
  };

  const handleCancelFinishAttempt = () => {};
  const handleConfirmFinishAttempt = () => {
    setShowCorrectAnswer(true);
    handleFinishQuizResponse();
  };
  const getFullMarkOfQuiz = () => {
    let totalMark = 0;
    questions.forEach((question) => {
      totalMark += question.defaultMark;
    });
    return totalMark;
  };
  const getQuizResponseMark = () => {
    let totalMark = 0;
    marks.forEach((mark) => {
      totalMark += mark;
    });
    return totalMark;
  };
  const initQuizResponse = () => {
    if (!thisUser) {
      toast.error("You must login to start the quiz");
      return;
    }
    const startTime = new Date().toISOString();
    const fullMark = getFullMarkOfQuiz();
    let quizResponse: QuizResponse = {
      type: ResponseType.QUIZ,
      status: QuizStatus.NOT_FINISHED,
      startedAt: startTime,
      completedAt: startTime,
      mark: 0,
      totalMark: fullMark,
      student: thisUser,
    };
    setQuizResponse(quizResponse);
  };

  const handleFinishQuizResponse = () => {
    if (!thisUser) {
      toast.error("You must login to finish the quiz");
      return;
    }
    if (!quizResponse) {
      toast.error("You must start the quiz first");
      return;
    }
    const completedTime = new Date().toISOString();
    const quizResponseMark = getQuizResponseMark();
    const finishedQuizResponse: QuizResponse = {
      ...quizResponse,
      status: QuizStatus.FINISHED,
      completedAt: completedTime,
      mark: quizResponseMark,
    };

    setQuizResponse(finishedQuizResponse);
  };

  useEffect(() => {
    initQuizResponse();
  }, []);

  useEffect(() => {
    console.log("quizResponse", quizResponse);
  }, [quizResponse]);

  let dialogTitle = "";
  const isMissingAnswer = hasAnswers.includes(false);
  if (isMissingAnswer) dialogTitle = "Some questions have not been answered";
  else dialogTitle = "All questions have been answered";

  return (
    <div className="relative">
      <div className="absolute left-0 top-0 h-full max-w-[320px] w-1/3">
        <div className="sticky top-24">
          <BackwardButtonIconText onClick={handleGoBack} />
          <Card className="p-4 space-y-4">
            <h5 className="text-orange-600">Annotation table</h5>
            <div className="flex flex-row justify-center">
              <h6 className="text-pink-600">Symbol</h6>
            </div>
            <div className="flex flex-col gap-2">
              {symbolAnnotations.map((annotation, index) => (
                <SymbolAnnotation
                  key={index}
                  symbol={annotation.symbol}
                  description={annotation.description}
                />
              ))}
            </div>
            <div className="flex flex-row justify-center">
              <h6 className="bg-gradient-to-br from-violet-500 via-cyan-500 via-teal-500 to-yellow-500 inline-block text-transparent bg-clip-text">
                Color
              </h6>
            </div>
            <div className="flex flex-col gap-2">
              {colorAnnotations.map((annotation, index) => (
                <ColorAnnotation
                  key={index}
                  colorClassName={annotation.colorClassName}
                  description={annotation.description}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className={cn("flex flex-col gap-10 pb-48", className)}>
        {quizResponse && showCorrectAnswer && (
          <QuizAttemptResult quizResult={quizResponse} />
        )}
        {questions.map((question, index) => (
          <QuestionDisplay
            key={index}
            questionIndex={index}
            totalQuestions={totalQuestions}
            question={question}
            showCorrectAnswer={showCorrectAnswer}
            isFlagged={flags[index]}
            onFlagChange={() => handleFlagChange(index)}
            result={questionResults[index]}
            mark={marks[index]}
            onAnswerSelected={(hasAnswered) =>
              handleAnswerSelected(index, hasAnswered)
            }
            onMarkChange={(mark) => handleMarkChange(index, mark)}
          />
        ))}
        <Button variant="default" onClick={handleShowingCorrectAnswer}>
          {showCorrectAnswer ? "Hide" : "Show"} correct answer
        </Button>
      </div>
      <div className="absolute right-0 top-0 h-full max-w-[320px] w-1/3 ">
        <Card className="sticky top-24 p-4 space-y-4">
          <h5 className="text-orange-600">Quiz navigation</h5>
          <div className="flex gap-2">
            {questions.map((_, index) => (
              <QuestionBlock
                key={index}
                questionIndex={index}
                isFlagged={flags[index]}
                hasAnswered={hasAnswers[index]}
                questionResult={questionResults[index]}
                onClick={() => scrollToQuestion(index)}
              />
            ))}
          </div>

          <FinishAttemptDialog
            variant={isMissingAnswer ? "warning" : "success"}
            title={dialogTitle}
            content={
              <span>
                {
                  "Once you submit your answers, you won’t be able to change them. Are you sure you want to finish the attempt?"
                }
              </span>
            }
            onYes={handleConfirmFinishAttempt}
            onCancel={handleCancelFinishAttempt}
          >
            <Button variant="default">Finish attempt</Button>
          </FinishAttemptDialog>
        </Card>
      </div>
    </div>
  );
};

export default QuizAttemptingTab;
