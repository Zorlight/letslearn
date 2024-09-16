import { fakeQuestions } from "@/fake-data/question";
import MultipleChoiceAnswer from "../../quiz-attempting/choice-answer";
import QuestionDisplay from "../../quiz-attempting/question-display";
import { Separator } from "@/lib/shadcn/separator";

const QuizAttemptingTab = () => {
  return (
    <div className="flex flex-col gap-6">
      <QuestionDisplay
        questionOrder={1}
        totalQuestions={10}
        question={fakeQuestions[0]}
      />
      <Separator />
      <QuestionDisplay
        questionOrder={2}
        totalQuestions={10}
        question={fakeQuestions[2]}
      />
    </div>
  );
};

export default QuizAttemptingTab;
