"use client";
import { fakeQuestions } from "@/fake-data/question";
import { fakeUser } from "@/fake-data/user";
import { Button } from "@/lib/shadcn/button";
import { Card } from "@/lib/shadcn/card";
import { cn } from "@/lib/utils";
import { Question } from "@/models/question";
import {
  QuizResponse,
  QuizStatus,
  ResponseType,
} from "@/models/student-response";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FinishAttemptDialog from "../../quiz-attempting/finish-attempt-dialog";
import QuestionDisplay from "../../quiz-attempting/question-display/question-display";
import QuestionBlock from "../../quiz-attempting/question-navigation-box/question-block";
import { QuestionResult, TabInTab } from "../../static-data";
import BackwardButtonIconText from "../_components/backward-button-icon-text";
import ColorAnnotation from "../_components/quiz-attempting-tab/color-annotation";
import QuizAttemptResult from "../_components/quiz-attempting-tab/quiz-attempt-result";
import SymbolAnnotation from "../_components/quiz-attempting-tab/symbol-annotation";
import {
  colorAnnotations,
  symbolAnnotations,
} from "../_components/static-data";
import { scrollToQuestion } from "../_components/utils";

interface Props {
  className?: string;
  quizResponse: QuizResponse;
  onQuizResponseChange: (quizResponse: QuizResponse) => void;
  onTabInTabChange?: (tab: TabInTab) => void;
  onTabInTabQuestionChange?: (question: Question | undefined) => void;
}
const QuizAttemptingTab = ({
  className,
  quizResponse,
  onQuizResponseChange,
  onTabInTabChange,
  onTabInTabQuestionChange,
}: Props) => {
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
  const startQuiz = () => {
    if (quizResponse.status !== QuizStatus.NOT_STARTED) return;
    const startTime = new Date().toISOString();
    const fullMark = getFullMarkOfQuiz();

    const newQuizResponse = {
      ...quizResponse,
      status: QuizStatus.NOT_FINISHED,
      startedAt: startTime,
      totalMark: fullMark,
    };
    if (onQuizResponseChange) onQuizResponseChange(newQuizResponse);
  };

  const handleFinishQuizResponse = () => {
    const completedTime = new Date().toISOString();
    const quizResponseMark = getQuizResponseMark();
    const finishedQuizResponse: QuizResponse = {
      ...quizResponse,
      status: QuizStatus.FINISHED,
      completedAt: completedTime,
      mark: quizResponseMark,
    };

    if (onQuizResponseChange) onQuizResponseChange(finishedQuizResponse);
  };

  const handleFinishReview = () => {
    if (onTabInTabChange) onTabInTabChange(TabInTab.MAIN_TAB);
  };

  useEffect(() => {
    startQuiz();
  }, []);

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
          <QuizAttemptResult quizResponse={quizResponse} />
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
            onTabInTabQuestionChange={onTabInTabQuestionChange}
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

          {quizResponse?.status === QuizStatus.NOT_FINISHED && (
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
          )}

          {quizResponse?.status === QuizStatus.FINISHED && (
            <Button variant="default" onClick={handleFinishReview}>
              Finish review
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
};

export default QuizAttemptingTab;
