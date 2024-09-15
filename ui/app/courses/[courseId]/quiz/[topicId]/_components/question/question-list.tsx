import DraggableContainer from "@/lib/@hello-pangea/draggable-container";
import { Question } from "@/models/question";
import React from "react";
import { questions } from "../fake-data";
import CreateQuestionDialog from "../question-bank/create-question-dialog";
import { QuestionType } from "../static-data";
import QuestionAddButton from "./question-add-button";
import QuestionRow from "./question-row";

interface Props {
  onAddNewQuestion?: (type: QuestionType) => void;
}
const QuestionList = ({ onAddNewQuestion }: Props) => {
  const [data, setData] = React.useState<Question[]>(questions);
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <div className="flex flex-col gap-2 bg-gray-50 rounded-md p-4">
      <DraggableContainer
        data={data}
        onReordered={setData}
        renderItem={(question, index) => (
          <QuestionRow key={index} data={question} rowIndex={index} />
        )}
      />
      <div className="ml-auto">
        <QuestionAddButton onAddNewQuestion={() => setOpenDialog(true)} />
        <CreateQuestionDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          onAddQuestion={onAddNewQuestion}
        />
      </div>
    </div>
  );
};

export default QuestionList;
