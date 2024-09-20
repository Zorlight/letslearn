import TabContentLayout from "@/components/ui/tab-content-layout";
import { useTab } from "@/hooks/useTab";
import { Question } from "@/models/question";
import { QuizResponse } from "@/models/student-response";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";
import { QuestionType, Tab, TabInTab } from "../static-data";
import BackwardButtonIcon from "./_components/backward-button-icon";
import TabInTabContent from "./tab-in-tab/tab-in-tab-content";
import { tabInTabMapper } from "./tab-in-tab/tap-in-tab-mapper";
import TabQuestion from "./tab-question";
import TabQuestionBank from "./tab-question-bank";
import TabQuiz from "./tab-quiz";
import TabSetting from "./tab-setting";
import { Quiz } from "@/models/quiz";

interface Props {
  className?: string;
  quiz: Quiz;
  onQuizChange?: (quiz: Quiz) => void;
}

const TabContent = ({ className, quiz, onQuizChange }: Props) => {
  const tabContext = useTab<string>();
  const { selectedTab } = tabContext;
  const { questions } = quiz;
  const [tabInTab, setTabInTab] = useState<TabInTab>(TabInTab.MAIN_TAB);
  const [tabInTabQuestion, setTabInTabQuestion] = useState<
    Question | undefined
  >();
  const [quizResponses, setQuizResponses] = useState<QuizResponse[]>([]);
  const [selectedQuizResponse, setSelectedQuizResponse] = useState<
    QuizResponse | undefined
  >();

  // Reset tabInTab to MAIN_TAB when selectedTab changes
  useEffect(() => {
    setTabInTab(TabInTab.MAIN_TAB);
  }, [selectedTab]);

  const handleTabInTabChange = (tab: TabInTab) => {
    setTabInTab(tab);
    setTabInTabQuestion(undefined);
  };
  //TODO: add function to handle tabInTabQuestion change
  const handleTabInTabQuestionChange = (question: Question | undefined) => {
    setTabInTabQuestion(question);
    if (question) setTabInTab(tabInTabMapper[question.type]);
  };

  const handleQuizResponseChange = (quizResponse: QuizResponse) => {
    const newQuizResponses = quizResponses.map((response) =>
      response.id === quizResponse.id ? quizResponse : response
    );
    setQuizResponses(newQuizResponses);

    // Update selectedQuizResponse if it is the same as the updated quizResponse
    if (selectedQuizResponse?.id === quizResponse.id)
      setSelectedQuizResponse(quizResponse);
  };

  const handleAddNewQuestion = (type: QuestionType) => {
    const tab = tabInTabMapper[type];
    handleTabInTabChange(tab);
  };

  const handleSubmitQuestion = (question: Question) => {
    console.log("submit question", question);
    const newQuestions = [...questions];
    const index = newQuestions.findIndex((q) => q.id === question.id);
    if (index === -1) newQuestions.push(question);
    else newQuestions[index] = question;

    if (onQuizChange) onQuizChange({ ...quiz, questions: newQuestions });
    handleTabInTabChange(TabInTab.MAIN_TAB);
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    if (onQuizChange) onQuizChange({ ...quiz, questions: newQuestions });
  };

  const handleReorderedQuestion = (questions: Question[]) => {
    if (onQuizChange) onQuizChange({ ...quiz, questions });
  };

  switch (selectedTab) {
    case Tab.QUIZ:
      return (
        <TabContentLayout className={className} fullWidth>
          {tabInTab === TabInTab.MAIN_TAB && (
            <TabQuiz
              quiz={quiz}
              quizResponses={quizResponses}
              onQuizResponsesChange={setQuizResponses}
              onTabInTabChange={handleTabInTabChange}
              onSelectQuizResponse={setSelectedQuizResponse}
              className={className}
            />
          )}
          {tabInTab !== TabInTab.MAIN_TAB &&
            tabInTab !== TabInTab.QUIZ_ATTEMPTING_TAB && (
              <BackwardButtonIcon
                onClick={() => setTabInTab(TabInTab.QUIZ_ATTEMPTING_TAB)}
                className="absolute top-3 left-3"
              />
            )}
          <TabInTabContent
            tabInTab={tabInTab}
            tabProps={{
              tabInTabQuestion: tabInTabQuestion,
              quizResponse: selectedQuizResponse,
              className: className,
              onTabInTabChange: handleTabInTabChange,
              onTabInTabQuestionChange: handleTabInTabQuestionChange,
              onQuizResponseChange: handleQuizResponseChange,
              onSubmitQuestion: handleSubmitQuestion,
            }}
          />
        </TabContentLayout>
      );
    case Tab.SETTING:
      return (
        <TabContentLayout className={className}>
          <TabSetting />
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
            <div className="mx-20">
              <TabQuestion
                questions={questions}
                onAddNewQuestion={handleAddNewQuestion}
                onRemoveQuestion={handleRemoveQuestion}
                onReorderedQuestion={handleReorderedQuestion}
                onTabInTabChange={handleTabInTabChange}
              />
            </div>
          )}
          <TabInTabContent
            tabInTab={tabInTab}
            tabProps={{
              tabInTabQuestion: tabInTabQuestion,
              onSubmitQuestion: handleSubmitQuestion,
            }}
          />
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
            <TabQuestionBank
              questions={questions}
              onTabInTabChange={handleTabInTabChange}
              onTabInTabQuestionChange={handleTabInTabQuestionChange}
            />
          )}
          <div className="mx-20">
            <TabInTabContent
              tabInTab={tabInTab}
              tabProps={{
                tabInTabQuestion: tabInTabQuestion,
                onSubmitQuestion: handleSubmitQuestion,
              }}
            />
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
