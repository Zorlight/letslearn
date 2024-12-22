import { Button } from "@/lib/shadcn/button";
import EditorDisplay from "@/lib/tinymce/editor-display";
import { cn, getTimeStringByDuration } from "@/lib/utils";
import {
  attemptsAllowedOptions,
  getSecondFromTimeLimitType,
  GradingMethod,
} from "@/models/quiz";
import {
  QuizResponseData,
  QuizStatus,
  sortQuizResponsesByCompletedDate,
  StudentResponse,
} from "@/models/student-response";
import { QuizTopic } from "@/models/topic";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { getGradeColor } from "../../utils";
import QuizAttemptResult from "../quiz-attempt-result";
import {
  handleGetAverageGrade,
  handleGetFirstAttemptGrade,
  handleGetHighestGrade,
  handleGetLastAttemptGrade,
} from "../utils";

interface Props {
  quiz: QuizTopic;
  quizResponses: StudentResponse[];
  onQuizResponsesChange?: (quizResponses: StudentResponse[]) => void;
  className?: string;
}
const TabStudentQuiz = ({
  className,
  quiz,
  quizResponses,
  onQuizResponsesChange,
}: Props) => {
  const router = useRouter();
  const { data } = quiz;
  const {
    open,
    close,
    description,
    questions,
    attemptAllowed,
    gradingMethod,
    timeLimit,
    timeLimitUnit,
  } = data;

  const handleAttemptQuiz = () => {
    router.push(`/quiz-attempting/${quiz.id}`);
  };

  const handleReviewQuiz = (index: number) => {
    const quizToReview = quizResponses[index];
    router.push(`/quiz-attempting/${quiz.id}/review/${quizToReview.id}`);
  };

  const handleRemoveQuizResponse = (index: number) => {
    const newQuizResponses = quizResponses.filter((_, i) => i !== index);
    if (onQuizResponsesChange) onQuizResponsesChange(newQuizResponses);
  };

  const fullMarkOfQuiz = useMemo(() => {
    return questions.reduce((cur, question) => cur + question.defaultMark, 0);
  }, [questions]);

  const gradeToShow = useMemo(() => {
    if (gradingMethod === GradingMethod.HIGHEST_GRADE)
      return handleGetHighestGrade(quizResponses);
    if (gradingMethod === GradingMethod.AVERAGE_GRADE)
      return handleGetAverageGrade(quizResponses);
    if (gradingMethod === GradingMethod.FIRST_GRADE)
      return handleGetFirstAttemptGrade(quizResponses);
    if (gradingMethod === GradingMethod.LAST_GRADE)
      return handleGetLastAttemptGrade(quizResponses);
    return 0;
  }, [quizResponses, gradingMethod]);
  const gradeTitle = useMemo(() => {
    if (gradingMethod === GradingMethod.HIGHEST_GRADE) return "Highest grade:";
    if (gradingMethod === GradingMethod.AVERAGE_GRADE) return "Average grade:";
    if (gradingMethod === GradingMethod.FIRST_GRADE) return "First grade:";
    if (gradingMethod === GradingMethod.LAST_GRADE) return "Last grade:";
    return "Grade";
  }, [gradingMethod]);

  const hasFinishedQuiz = useMemo(() => {
    const quizResponseDatas = quizResponses.map(
      (quizResponse) => quizResponse.data as QuizResponseData
    );
    return quizResponseDatas.some(
      (quizResponseData) => quizResponseData.status === QuizStatus.FINISHED
    );
  }, [quizResponses]);

  const quizResponsesToShow = useMemo(() => {
    const filteredQuizResponses = quizResponses.filter(
      (quizResponse) =>
        (quizResponse.data as QuizResponseData).status === QuizStatus.FINISHED
    );
    return sortQuizResponsesByCompletedDate(filteredQuizResponses);
  }, [quizResponses]);

  const timeLimitString = useMemo(() => {
    if (!timeLimit) return "No time limit";
    const duration = getSecondFromTimeLimitType(timeLimit, timeLimitUnit);
    return getTimeStringByDuration(duration);
  }, [timeLimit, timeLimitUnit]);

  const openTime = open
    ? format(new Date(open), "EEEE, dd MMMM yyyy, h:mm a")
    : null;
  const closeTime = close
    ? format(new Date(close), "EEEE, dd MMMM yyyy, h:mm a")
    : null;
  const gradeColor = getGradeColor(gradeToShow, fullMarkOfQuiz);

  return (
    <div className={cn(className)}>
      <div className="pb-4 space-y-2 border-b-[0.5px] border-gray-300 text-gray-700">
        {openTime && (
          <p>
            <span className="font-bold">Open: </span>
            <span className="text-gray-500">{openTime}</span>
          </p>
        )}
        {closeTime && (
          <p>
            <span className="font-bold">Close: </span>
            <span className="text-gray-500">{closeTime}</span>
          </p>
        )}
      </div>
      <EditorDisplay className="text-gray-500" htmlString={description} />
      <div className="space-y-4">
        <Button variant="cyan" className="w-fit" onClick={handleAttemptQuiz}>
          Attempt quiz
        </Button>

        {timeLimit && (
          <p className="text-sm text-slate-600">
            {`Time limit: ${timeLimitString}`}
          </p>
        )}
        {attemptAllowed !== attemptsAllowedOptions[0] && (
          <p className="text-sm text-gray-500">
            {`Attempts allowed: ${attemptAllowed}`}
          </p>
        )}
        <p className="text-sm text-gray-500">
          {`Grading method: ${gradingMethod}`}
        </p>
        {hasFinishedQuiz && (
          <div className="flex flex-col gap-4 mt-8">
            <h5
              className={cn("font-semibold", gradeColor)}
            >{`${gradeTitle} ${gradeToShow} / ${fullMarkOfQuiz}`}</h5>
            <h5 className="text-orange-500">Your attempt</h5>

            <div className="flex flex-col gap-4">
              {quizResponsesToShow.map((quizResponse, index) => (
                <QuizAttemptResult
                  key={index}
                  responseIndex={quizResponses.length - index - 1}
                  quizResponse={quizResponse}
                  onReview={() => handleReviewQuiz(index)}
                  onRemove={() => handleRemoveQuizResponse(index)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabStudentQuiz;
