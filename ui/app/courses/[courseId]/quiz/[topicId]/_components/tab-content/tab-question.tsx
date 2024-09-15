import Banner from "@/components/ui/banner";
import { questions } from "../fake-data";
import QuestionList from "../question/question-list";
import { QuestionType, TabInTab } from "../static-data";
import { tabInTabMapper } from "./tab-in-tab/tap-in-tab-mapper";

interface Props {
  onTabInTabChange: (tab: TabInTab) => void;
}
const TabQuestion = ({ onTabInTabChange }: Props) => {
  const attempts = 1;
  const totalMarks = 10;
  const isQuizOpen = true;

  const handleAddNewQuestion = (type: QuestionType) => {
    const tab = tabInTabMapper[type];
    onTabInTabChange(tab);
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="py-4 space-y-2">
        <h4 className="text-orange-600">Questions</h4>
        <Banner variant="warning">
          <div>
            <span>{`You cannot add or remove question because this quiz has been attempted (`}</span>
            <span className="text-indigo-700">{`Attempts: ` + attempts}</span>
            <span>{`)`}</span>
          </div>
        </Banner>
        <div className="flex flex-row items-center justify-between">
          <p className="my-4">
            {`Question: ${questions.length} | This quiz is ${
              isQuizOpen ? "open" : "close"
            }`}
            {``}
          </p>
          <p className="my-4">
            {`Total marks: ${totalMarks}`}
            {``}
          </p>
        </div>
        <QuestionList onAddNewQuestion={handleAddNewQuestion} />
      </div>
    </div>
  );
};

export default TabQuestion;
