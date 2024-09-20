import DraggableContainer from "@/lib/@hello-pangea/draggable-container";
import { Question } from "@/models/question";
import React from "react";
import CreateQuestionDialog from "../question-bank/create-question-dialog";
import { QuestionType } from "../static-data";
import QuestionAddButton from "./question-add-button";
import QuestionRow from "./question-row";

interface Props {
  questions: Question[];
  onReorderedQuestion: (data: Question[]) => void;
  onAddNewQuestion?: (type: QuestionType) => void;
  onRemoveQuestion?: (index: number) => void;
}
const QuestionList = ({
  questions,
  onAddNewQuestion,
  onRemoveQuestion,
  onReorderedQuestion,
}: Props) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  return (
    <div className="flex flex-col gap-2 bg-gray-50 rounded-md p-4">
      <DraggableContainer
        data={questions}
        onReordered={onReorderedQuestion}
        renderItem={(question, index) => (
          <QuestionRow
            key={index}
            data={question}
            rowIndex={index}
            onRemove={onRemoveQuestion}
          />
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
