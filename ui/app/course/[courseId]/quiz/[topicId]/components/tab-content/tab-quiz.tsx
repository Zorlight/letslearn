import { StudentResponse } from "@/models/student-response";
import { QuizTopic } from "@/models/topic";
import { Role } from "@/models/user";
import { useAppSelector } from "@/redux/hooks";
import TabStudentQuiz from "../quiz/student/tab-student-quiz";
import TabTeacherQuiz from "../quiz/teacher/tab-teacher-quiz";

interface Props {
  courseId: string;
  quiz: QuizTopic;
  quizResponses: StudentResponse[];
  onQuizResponsesChange?: (quizResponses: StudentResponse[]) => void;
  className?: string;
}
const TabQuiz = ({
  className,
  courseId,
  quiz,
  quizResponses,
  onQuizResponsesChange,
}: Props) => {
  const user = useAppSelector((state) => state.profile.value);
  if (!user) return null;
  if (user.role === Role.TEACHER)
    return (
      <TabTeacherQuiz className={className} quiz={quiz} courseId={courseId} />
    );

  return (
    <TabStudentQuiz
      className={className}
      quiz={quiz}
      courseId={courseId}
      quizResponses={quizResponses}
      onQuizResponsesChange={onQuizResponsesChange}
    />
  );
};

export default TabQuiz;
