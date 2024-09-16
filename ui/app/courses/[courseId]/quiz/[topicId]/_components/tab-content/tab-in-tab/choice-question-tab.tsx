import CollapsibleList from "@/app/courses/[courseId]/_components/collapsible/collapsible-list";
import { useState } from "react";
import ChoiceQuestionAnswerSetting, {
  ChoiceQuestionAnswerForm,
} from "../../question-bank/multiple-choice-question/answers";
import { BulletType, QuestionStatus } from "../../static-data";
import ChoiceQuestionGeneralSetting, {
  ChoiceQuestionGeneralForm,
} from "../../question-bank/multiple-choice-question/general";

const ChoiceQuestionTab = () => {
  const [generalSetting, setGeneralSetting] =
    useState<ChoiceQuestionGeneralForm>({
      questionName: "",
      questionText: "",
      questionStatus: QuestionStatus.READY,
      defaultMark: 1,
      multipleChoice: false,
      bulletType: BulletType.NO_ORDER,
    });
  const [answerSetting, setAnswerSetting] = useState<ChoiceQuestionAnswerForm>({
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

  const handleGeneralSettingChange = (data: ChoiceQuestionGeneralForm) => {
    setGeneralSetting((prev) => ({ ...prev, ...data }));
  };

  const handleAnswerSettingChange = (data: ChoiceQuestionAnswerForm) => {
    setAnswerSetting((prev) => ({ ...prev, ...data }));
  };

  const titles = ["General", "Answers"];
  const initShowContent = ["General", "Answers"];
  const collapsibleContent = [
    <ChoiceQuestionGeneralSetting
      key={0}
      initValue={generalSetting}
      onChange={handleGeneralSettingChange}
    />,
    <ChoiceQuestionAnswerSetting
      key={1}
      initValue={answerSetting}
      onChange={handleAnswerSettingChange}
    />,
  ];
  return (
    <div>
      <h1 className="font-bold text-2xl text-orange-600">
        Adding a Multiple or Single choice question
      </h1>
      <CollapsibleList titles={titles} initShowContent={initShowContent}>
        {collapsibleContent}
      </CollapsibleList>
    </div>
  );
};

export default ChoiceQuestionTab;
