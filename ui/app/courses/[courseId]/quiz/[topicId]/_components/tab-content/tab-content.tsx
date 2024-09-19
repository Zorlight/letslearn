import { useTab } from "@/hooks/useTab";
import { Separator } from "@/lib/shadcn/separator";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { Tab, TabInTab } from "../static-data";
import BackwardButtonIcon from "./_components/backward-button-icon";
import ChoiceQuestionTab from "./tab-in-tab/choice-question-tab";
import QuizAttemptingTab from "./tab-in-tab/quiz-attempting-tab";
import ShortAnswerQuestionTab from "./tab-in-tab/short-answer-question-tab";
import TrueFalseQuestionTab from "./tab-in-tab/true-false-question-tab";
import TabQuestion from "./tab-question";
import TabQuestionBank from "./tab-question-bank";
import TabQuiz from "./tab-quiz";
import TabSetting from "./tab-setting";
import TabContentLayout from "@/components/ui/tab-content-layout";
import { notFound } from "next/navigation";

interface Props {
  className?: string;
}

const TabContent = ({ className }: Props) => {
  const tabContext = useTab<string>();
  const [tabInTab, setTabInTab] = React.useState<TabInTab>(TabInTab.MAIN_TAB);
  const { selectedTab } = tabContext;

  // Reset tabInTab to MAIN_TAB when selectedTab changes
  useEffect(() => {
    setTabInTab(TabInTab.MAIN_TAB);
  }, [selectedTab]);

  const handleTabInTabChange = (tab: TabInTab) => {
    setTabInTab(tab);
  };

  switch (selectedTab) {
    case Tab.QUIZ:
      return (
        <TabContentLayout className={className}>
          {tabInTab === TabInTab.MAIN_TAB && (
            <TabQuiz
              onTabInTabChange={handleTabInTabChange}
              className={className}
            />
          )}
          {tabInTab === TabInTab.QUIZ_ATTEMPTING_TAB && (
            <QuizAttemptingTab
              className={className}
              onTabInTabChange={handleTabInTabChange}
            />
          )}
        </TabContentLayout>
      );
    case Tab.SETTING:
      return (
        <TabContentLayout className={className}>
          <TabSetting />
        </TabContentLayout>
      );
    case Tab.QUESTION_BANK:
      return (
        <TabContentLayout className={className} fullWidth>
          {tabInTab !== TabInTab.MAIN_TAB && (
            <BackwardButtonIcon
              onClick={() => setTabInTab(TabInTab.MAIN_TAB)}
              className="absolute top-3 left-3"
            />
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
            {tabInTab === TabInTab.CHOICE_QUESTION_TAB && <ChoiceQuestionTab />}
          </div>
        </TabContentLayout>
      );
    case Tab.QUESTION:
      return (
        <TabContentLayout className={className} fullWidth>
          {tabInTab !== TabInTab.MAIN_TAB && (
            <BackwardButtonIcon
              onClick={() => setTabInTab(TabInTab.MAIN_TAB)}
              className="absolute top-3 left-3"
            />
          )}
          {tabInTab === TabInTab.MAIN_TAB && (
            <TabQuestion onTabInTabChange={handleTabInTabChange} />
          )}
          <div className="mx-20">
            {tabInTab === TabInTab.TRUE_FALSE_QUESTION_TAB && (
              <TrueFalseQuestionTab />
            )}
            {tabInTab === TabInTab.SHORT_ANSWER_QUESTION_TAB && (
              <ShortAnswerQuestionTab />
            )}
            {tabInTab === TabInTab.CHOICE_QUESTION_TAB && <ChoiceQuestionTab />}
          </div>
        </TabContentLayout>
      );
    case Tab.MORE:
      return <TabContentLayout></TabContentLayout>;
    default:
      return notFound();
  }
};

export default TabContent;
