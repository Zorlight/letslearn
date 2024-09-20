import DraggableContainer from "@/lib/@hello-pangea/draggable-container";
import { Question } from "@/models/question";
import React, { useEffect, useState } from "react";
import CreateQuestionDialog from "../question-bank/dialog/create-question-dialog";
import { QuestionType } from "../static-data";
import QuestionAddButton from "./question-add-button";
import QuestionRow from "./question-row";
import GetQuestionFromBankDialog from "../question-bank/dialog/get-question-from-bank-dialog";

interface Props {
  questions: Question[];
  questionsBank: Question[];
  onReorderedQuestion: (data: Question[]) => void;
  onAddNewQuestion?: (type: QuestionType) => void;
  onAddQuestionFromBank?: (question: Question[]) => void;
  onRemoveQuestion?: (index: number) => void;
}
const QuestionList = ({
  questions,
  questionsBank,
  onAddNewQuestion,
  onAddQuestionFromBank,
  onRemoveQuestion,
  onReorderedQuestion,
}: Props) => {
  const [openAddNewQuestionDialog, setOpenAddNewQuestionDialog] =
    useState(false);

  const [openAddQuestionFromBankDialog, setOpenAddQuestionFromBankDialog] =
    useState(false);

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
        <QuestionAddButton
          onAddNewQuestion={() => setOpenAddNewQuestionDialog(true)}
          onAddQuestionFromBank={() => setOpenAddQuestionFromBankDialog(true)}
        />
        <CreateQuestionDialog
          open={openAddNewQuestionDialog}
          onOpenChange={setOpenAddNewQuestionDialog}
          onAddQuestion={onAddNewQuestion}
        />
        <GetQuestionFromBankDialog
          questions={questions}
          questionsBank={questionsBank}
          open={openAddQuestionFromBankDialog}
          onOpenChange={setOpenAddQuestionFromBankDialog}
          onAddQuestionFromBank={onAddQuestionFromBank}
        />
      </div>
    </div>
  );
};

export default QuestionList;
