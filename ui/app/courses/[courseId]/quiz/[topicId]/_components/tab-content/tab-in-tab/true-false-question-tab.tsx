import CollapsibleList from "@/app/courses/[courseId]/_components/collapsible/collapsible-list";
import { useState } from "react";
import TrueFalseQuestionGeneralSetting, {
  TrueFalseQuestionGeneralForm,
} from "../../question-bank/true-false-question/general";
import { QuestionStatus } from "../../static-data";

const TrueFalseQuestionTab = () => {
  const [generalSetting, setGeneralSetting] =
    useState<TrueFalseQuestionGeneralForm>({
      questionName: "",
      questionText: "",
      questionStatus: QuestionStatus.READY,
      defaultMark: 1,
      correctAnswer: true,
      feedbackOfTrue: "",
      feedbackOfFalse: "",
    });

  const handleGeneralSettingChange = (data: TrueFalseQuestionGeneralForm) => {
    setGeneralSetting((prev) => ({ ...prev, ...data }));
  };

  const titles = ["General"];
  const initShowContent = ["General"];
  const collapsibleContent = [
    <TrueFalseQuestionGeneralSetting
      initValue={generalSetting}
      onChange={handleGeneralSettingChange}
    />,
  ];
  return (
    <div>
      <h1 className="font-bold text-2xl text-orange-600">
        Adding a True/False question
      </h1>
      <CollapsibleList titles={titles} initShowContent={initShowContent}>
        {collapsibleContent}
      </CollapsibleList>
    </div>
  );
};

export default TrueFalseQuestionTab;
