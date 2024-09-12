import { questionBank } from "../fake-data";
import QuestionTable from "../question-bank/question-table";

const TabQuestion = () => {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="py-4 space-y-2">
        <h4 className="text-orange-600">Question bank</h4>
        <QuestionTable data={questionBank} />
      </div>
    </div>
  );
};

export default TabQuestion;
