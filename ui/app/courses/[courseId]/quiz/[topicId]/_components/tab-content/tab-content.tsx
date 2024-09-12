import { Separator } from "@/lib/shadcn/separator";
import React from "react";
import { Tab, TabInTab } from "../static-data";
import TabQuestionBank from "./tab-question-bank";
import TabQuiz from "./tab-quiz";
import TabSetting from "./tab-setting";
import TrueFalseQuestionTab from "./tab-in-tab/true-false-question-tab";
import { Button } from "@/lib/shadcn/button";
import { ArrowLeft } from "lucide-react";
import ShortAnswerQuestionTab from "./tab-in-tab/short-answer-question-tab";
import MultipleChoiceQuestionTab from "./tab-in-tab/multiple-choice-question-tab";
import TabQuestion from "./tab-question";

interface Props {
  selectedTab: string;
  className?: string;
}

const TabContent = ({ selectedTab, className }: Props) => {
  const [tabInTab, setTabInTab] = React.useState<TabInTab>(TabInTab.MAIN_TAB);

  const handleTabInTabChange = (tab: TabInTab) => {
    setTabInTab(tab);
  };

  switch (selectedTab) {
    case Tab.QUIZ:
      return (
        <div className={className}>
          <Separator />
          <div className="py-4">
            <TabQuiz />
          </div>
        </div>
      );
    case Tab.SETTING:
      return (
        <div className={className}>
          <Separator />
          <div className="p-4">
            <TabSetting />
          </div>
        </div>
      );
    case Tab.QUESTION_BANK:
      return (
        <>
          <Separator />
          <div className="relative p-4">
            {tabInTab !== TabInTab.MAIN_TAB && (
              <div className="absolute top-3 left-3">
                <Button
                  className="rounded-full group hover:shadow-lg"
                  variant="outline"
                  size="icon"
                  onClick={() => handleTabInTabChange(TabInTab.MAIN_TAB)}
                >
                  <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-1 transition-all duration-100"
                  />
                </Button>
              </div>
            )}
            {tabInTab === TabInTab.MAIN_TAB && (
              <TabQuestionBank onTabInTabChange={handleTabInTabChange} />
            )}
            <div className="mx-20">
              {tabInTab === TabInTab.TRUE_FALSE_QUESTION_TAB && (
                <TrueFalseQuestionTab />
              )}
              {tabInTab === TabInTab.SHORT_ANSWER_QUESTION_TAB && (
                <ShortAnswerQuestionTab />
              )}
              {tabInTab === TabInTab.MULTIPLE_CHOICE_QUESTION_TAB && (
                <MultipleChoiceQuestionTab />
              )}
            </div>
          </div>
        </>
      );
    case Tab.QUESTION:
      return (
        <div className={className}>
          <Separator />
          <div className="py-4">
            <TabQuestion />
          </div>
        </div>
      );
    case Tab.MORE:
      return <div></div>;
    default:
      return <div></div>;
  }
};

export default TabContent;
