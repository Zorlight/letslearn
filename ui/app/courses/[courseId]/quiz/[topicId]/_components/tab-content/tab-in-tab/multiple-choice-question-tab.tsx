import CollapsibleList from "@/app/courses/[courseId]/_components/collapsible/collapsible-list";
import { useState } from "react";
import MultipleChoiceQuestionAnswerSetting, {
  MultipleChoiceQuestionAnswerForm,
} from "../../question-bank/multiple-choice-question/answers";
import MultipleChoiceQuestionGeneralSetting, {
  MultipleChoiceQuestionGeneralForm,
} from "../../question-bank/multiple-choice-question/general";
import { BulletType, QuestionStatus } from "../../static-data";

const MultipleChoiceQuestionTab = () => {
  const [generalSetting, setGeneralSetting] =
    useState<MultipleChoiceQuestionGeneralForm>({
      questionName: "",
      questionText: "",
      questionStatus: QuestionStatus.READY,
      defaultMark: 1,
      multipleChoice: false,
      bulletType: BulletType.NO_ORDER,
    });
  const [answerSetting, setAnswerSetting] =
    useState<MultipleChoiceQuestionAnswerForm>({
      choices: [
        {
          text: "Choice 1",
          gradePercent: 100,
          feedback: "",
        },
        {
          text: "Choice 2",
          gradePercent: 100,
          feedback: "",
        },
        {
          text: "Choice 3",
          gradePercent: 100,
          feedback: "",
        },
      ],
    });

  const handleGeneralSettingChange = (
    data: MultipleChoiceQuestionGeneralForm
  ) => {
    setGeneralSetting((prev) => ({ ...prev, ...data }));
  };

  const handleAnswerSettingChange = (
    data: MultipleChoiceQuestionAnswerForm
  ) => {
    setAnswerSetting((prev) => ({ ...prev, ...data }));
  };

  const titles = ["General", "Answers"];
  const initShowContent = ["General", "Answers"];
  const collapsibleContent = [
    <MultipleChoiceQuestionGeneralSetting
      initValue={generalSetting}
      onChange={handleGeneralSettingChange}
    />,
    <MultipleChoiceQuestionAnswerSetting
      initValue={answerSetting}
      onChange={handleAnswerSettingChange}
    />,
  ];
  return (
    <div>
      <h1 className="font-bold text-2xl text-orange-600">
        Adding a Multiple choice question
      </h1>
      <CollapsibleList titles={titles} initShowContent={initShowContent}>
        {collapsibleContent}
      </CollapsibleList>
    </div>
  );
};

export default MultipleChoiceQuestionTab;
