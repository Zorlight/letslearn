import { ReactNode } from "react";
import { TwoDot } from "./icons";
import { FileText, List, RectangleHorizontal } from "lucide-react";

export enum Tab {
  QUIZ = "Quiz",
  SETTING = "Setting",
  QUESTION = "Question",
  QUESTION_BANK = "Question Bank",
  MORE = "More",
}

export enum TimeLimitType {
  MINUTES = "Minutes",
  HOURS = "Hours",
  DAYS = "Days",
  WEEKs = "Weeks",
}

export enum GradingMethod {
  HIGHEST_GRADE = "Highest Grade",
  AVERAGE_GRADE = "Average Grade",
  FIRST_GRADE = "First Grade",
  LAST_GRADE = "Last Grade",
}

export const attemptsAllowedOptions = [
  "Unlimited",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
];

export enum QuestionType {
  TRUE_FALSE = "True/False",
  SHORT_ANSWER = "Short Answer",
  MULTIPLE_CHOICE = "Multiple Choice",
  ESSAY = "Essay",
}

export type QuestionTypeOption = {
  type: QuestionType;
  description: string;
};

export const questionIconMap = {
  [QuestionType.TRUE_FALSE]: <TwoDot />,
  [QuestionType.SHORT_ANSWER]: <RectangleHorizontal size={16} />,
  [QuestionType.MULTIPLE_CHOICE]: <List size={16} />,
  [QuestionType.ESSAY]: <FileText size={16} />,
};

export const questionTypeOptions: QuestionTypeOption[] = [
  {
    type: QuestionType.TRUE_FALSE,
    description:
      "A simple form of multiple choice question with just the two choices 'True' and 'False'.",
  },
  {
    type: QuestionType.SHORT_ANSWER,
    description:
      "A question that requires a short text answer, typically a single word or a few words.",
  },
  {
    type: QuestionType.MULTIPLE_CHOICE,
    description:
      "A question that provides a list of options for the user to choose from.",
  },
  {
    type: QuestionType.ESSAY,
    description:
      "A question that requires a long text answer, typically a paragraph or more.",
  },
];

export enum TabInTab {
  MAIN_TAB = "Main Tab",
  TRUE_FALSE_QUESTION_TAB = "New True/False Question",
  SHORT_ANSWER_QUESTION_TAB = "New Short Answer Question",
  MULTIPLE_CHOICE_QUESTION_TAB = "New Multiple Choice Question",
  ESSAY_QUESTION_TAB = "New Essay Question",
}

export enum QuestionStatus {
  READY = "Ready",
  DRAFT = "Draft",
}

export const gradePercentOptions = [
  "100",
  "90",
  "80.33",
  "80",
  "75",
  "70",
  "66.67",
  "60",
  "50",
  "40",
  "33.33",
  "30",
  "25",
  "20",
  "16.67",
  "12.5",
  "11.11",
  "10",
  "5",
  "0",
];

export enum BulletType {
  NO_ORDER = "No order",
  LOWERCASE = "a. b. c., ...",
  UPPERCASE = "A. B. C., ...",
  ROMAN_LOWERCASE = "i. ii. iii., ...",
  ROMAN_UPPERCASE = "I. II. III., ...",
  NUMBERING = "1. 2. 3., ...",
}
