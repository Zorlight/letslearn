import { StudentResponse } from "@/models/student-response";
import { QuizTopic } from "@/models/topic";
import QuizDashboardSummary from "@/components/dashboard/summary/summary";

interface Props {
  quiz: QuizTopic;
  quizResponses: StudentResponse[];
  onQuizResponsesChange?: (quizResponses: StudentResponse[]) => void;
  className?: string;
}
export default function TabDashboard({
  className,
  quiz,
  quizResponses,
  onQuizResponsesChange,
}: Props) {
  return (
    <div>
      <QuizDashboardSummary />
    </div>
  );
}
