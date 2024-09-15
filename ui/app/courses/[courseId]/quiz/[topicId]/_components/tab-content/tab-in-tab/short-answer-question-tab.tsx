import CollapsibleList from "@/app/courses/[courseId]/_components/collapsible/collapsible-list";
import { useState } from "react";
import ShortAnswerQuestionGeneralSetting, {
  ShortAnswerQuestionGeneralForm,
} from "../../question-bank/short-answer-question/general";
import { QuestionStatus } from "../../static-data";
import ShortAnswerQuestionAnswerSetting, {
  ShortAnswerQuestionAnswerForm,
} from "../../question-bank/short-answer-question/answers";

const ShortAnswerQuestionTab = () => {
  const [generalSetting, setGeneralSetting] =
    useState<ShortAnswerQuestionGeneralForm>({
      questionName: "",
      questionText: "",
      questionStatus: QuestionStatus.READY,
      defaultMark: 1,
    });
  const [answerSetting, setAnswerSetting] =
    useState<ShortAnswerQuestionAnswerForm>({
      answers: [
        {
          text: "Answer",
          gradePercent: 100,
          feedback: "",
        },
        {
          text: "answer",
          gradePercent: 100,
          feedback: "",
        },
        {
          text: "ANSWER",
          gradePercent: 100,
          feedback: "",
        },
      ],
    });

  const handleGeneralSettingChange = (data: ShortAnswerQuestionGeneralForm) => {
    setGeneralSetting((prev) => ({ ...prev, ...data }));
  };

  const handleAnswerSettingChange = (data: ShortAnswerQuestionAnswerForm) => {
    setAnswerSetting((prev) => ({ ...prev, ...data }));
  };

  const titles = ["General", "Answers"];
  const initShowContent = ["General", "Answers"];
  const collapsibleContent = [
    <ShortAnswerQuestionGeneralSetting
      key={0}
      initValue={generalSetting}
      onChange={handleGeneralSettingChange}
    />,
    <ShortAnswerQuestionAnswerSetting
      key={1}
      initValue={answerSetting}
      onChange={handleAnswerSettingChange}
    />,
  ];
  return (
    <div>
      <h1 className="font-bold text-2xl text-orange-600">
        Adding a Short answer question
      </h1>
      <CollapsibleList titles={titles} initShowContent={initShowContent}>
        {collapsibleContent}
      </CollapsibleList>
    </div>
  );
};

export default ShortAnswerQuestionTab;
