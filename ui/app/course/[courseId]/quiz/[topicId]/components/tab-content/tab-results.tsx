import { StudentResponse } from "@/models/student-response";
import ResultTable from "../results/table/result-table";
import { useRouter } from "next/navigation";
import { QuizTopic } from "@/models/topic";

interface Props {
  quiz: QuizTopic;
  studentResponses: StudentResponse[];
}
const TabResults = ({ studentResponses, quiz }: Props) => {
  const router = useRouter();

  const handleViewResponse = (responseId: string) => {
    router.push(`/quiz-attempting/${quiz.id}/review/${responseId}`);
  };
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="space-y-2">
        <h4 className="text-orange-500">Results</h4>
        <ResultTable
          data={studentResponses}
          otherFunctions={{
            onView: handleViewResponse,
          }}
        />
      </div>
    </div>
  );
};

export default TabResults;
