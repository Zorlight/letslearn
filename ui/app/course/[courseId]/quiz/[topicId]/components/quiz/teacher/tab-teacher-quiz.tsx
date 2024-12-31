import { Button } from "@/lib/shadcn/button";
import EditorDisplay from "@/lib/tinymce/editor-display";
import { cn, getTimeStringByDuration } from "@/lib/utils";
import {
  attemptsAllowedOptions,
  getSecondFromTimeLimitType,
} from "@/models/quiz";
import { QuizTopic } from "@/models/topic";
import { format } from "date-fns";
import { SearchCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "react-toastify";

interface Props {
  quiz: QuizTopic;
  className?: string;
}
const TabTeacherQuiz = ({ className, quiz }: Props) => {
  const router = useRouter();
  const { data } = quiz;
  const {
    open,
    close,
    description,
    attemptAllowed,
    gradingMethod,
    timeLimit,
    timeLimitUnit,
    questions,
  } = data;

  const handlePreviewQuiz = () => {
    if (questions.length === 0) {
      toast.info("This quiz has no questions yet.");
      return;
    }
    router.push(`/quiz-attempting/${quiz.id}`);
  };

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
        {!openTime && !closeTime && (
          <p className="font-bold">
            This quiz is always open for student to attempt.
          </p>
        )}
      </div>
      <EditorDisplay className="text-gray-500" htmlString={description} />
      <div className="space-y-4">
        <Button variant="cyan" className="w-fit" onClick={handlePreviewQuiz}>
          <SearchCheck size={16} />
          Preview quiz
        </Button>

        {!!timeLimit && (
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
      </div>
    </div>
  );
};

export default TabTeacherQuiz;
