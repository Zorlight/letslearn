import React from "react";
import { TabInTab } from "../../static-data";
import TrueFalseQuestionTab from "./true-false-question-tab";
import ShortAnswerQuestionTab from "./short-answer-question-tab";
import ChoiceQuestionTab from "./choice-question-tab";
import {
  ChoiceQuestion,
  Question,
  ShortAnswerQuestion,
  TrueFalseQuestion,
} from "@/models/question";
import QuizAttemptingTab from "./quiz-attempting-tab";
import { QuizResponse } from "@/models/student-response";

interface BaseTabProps {
  tabInTabQuestion: Question | undefined;
  onSubmitQuestion?: (data: Question) => void;
}

interface TabQuizProps extends BaseTabProps {
  quizResponse: QuizResponse;
  className?: string;
  onTabInTabChange: (tab: TabInTab) => void;
  onTabInTabQuestionChange: (question: Question | undefined) => void;
  onQuizResponseChange: (quizResponse: QuizResponse) => void;
}
interface TabQuestionProps extends BaseTabProps {}
interface TabQuestionBankProps extends BaseTabProps {}

type TabProps = TabQuizProps | TabQuestionProps | TabQuestionBankProps;

interface Props {
  tabInTab: TabInTab;
  tabProps: TabProps;
}
const TabInTabContent = ({ tabInTab, tabProps }: Props) => {
  switch (tabInTab) {
    case TabInTab.QUIZ_ATTEMPTING_TAB:
      return (
        <QuizAttemptingTab
          className={(tabProps as TabQuizProps).className}
          onTabInTabChange={(tabProps as TabQuizProps).onTabInTabChange}
          onTabInTabQuestionChange={
            (tabProps as TabQuizProps).onTabInTabQuestionChange
          }
          quizResponse={(tabProps as TabQuizProps).quizResponse}
          onQuizResponseChange={(tabProps as TabQuizProps).onQuizResponseChange}
        />
      );
    case TabInTab.TRUE_FALSE_QUESTION_TAB:
      return (
        <div className="mx-20">
          <TrueFalseQuestionTab
            question={tabProps.tabInTabQuestion as TrueFalseQuestion}
            onSubmitQuestion={tabProps.onSubmitQuestion}
          />
        </div>
      );
    case TabInTab.SHORT_ANSWER_QUESTION_TAB:
      return (
        <div className="mx-20">
          <ShortAnswerQuestionTab
            question={tabProps.tabInTabQuestion as ShortAnswerQuestion}
            onSubmitQuestion={tabProps.onSubmitQuestion}
          />
        </div>
      );
    case TabInTab.CHOICE_QUESTION_TAB:
      return (
        <div className="mx-20">
          <ChoiceQuestionTab
            question={tabProps.tabInTabQuestion as ChoiceQuestion}
            onSubmitQuestion={tabProps.onSubmitQuestion}
          />
        </div>
      );
  }
};

export default TabInTabContent;
