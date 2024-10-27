import { ReactNode } from "react";
import { FileText, List, RectangleHorizontal } from "lucide-react";
import { TwoDot } from "@/components/icons/two-dot";

export enum Tab {
  QUIZ = "Quiz",
  SETTINGS = "Settings",
  QUESTION = "Question",
  QUESTION_BANK = "Question Bank",
  RESULTS = "Results",
}

export enum TimeLimitType {
  SECONDS = "Seconds",
  MINUTES = "Minutes",
  HOURS = "Hours",
  DAYS = "Days",
  WEEKS = "Weeks",
}

// function to get seconds from time limit value and unit
export const getSecondFromTimeLimitType = (
  value: number,
  unit: TimeLimitType | string,
  onUnitError?: () => void
) => {
  let second = 0;
  switch (unit) {
    case TimeLimitType.SECONDS:
      second = value;
      break;
    case TimeLimitType.MINUTES:
      second = value * 60;
      break;
    case TimeLimitType.HOURS:
      second = value * 60 * 60;
      break;
    case TimeLimitType.DAYS:
      second = value * 60 * 60 * 24;
      break;
    case TimeLimitType.WEEKS:
      second = value * 60 * 60 * 24 * 7;
      break;
    default:
      if (onUnitError) onUnitError();
      break;
  }
  return second;
};

export enum GradingMethod {
  HIGHEST_GRADE = "Highest Grade",
  AVERAGE_GRADE = "Average Grade",
  FIRST_GRADE = "First Grade",
  LAST_GRADE = "Last Grade",
}

export const gradingMethodOptions = Object.values(GradingMethod);

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
  CHOICE = "Choices Answer",
  ESSAY = "Essay",
}

export type QuestionTypeOption = {
  type: QuestionType;
  description: string;
};

export const questionIconMap = {
  [QuestionType.TRUE_FALSE]: <TwoDot />,
  [QuestionType.SHORT_ANSWER]: <RectangleHorizontal size={16} />,
  [QuestionType.CHOICE]: <List size={16} />,
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
    type: QuestionType.CHOICE,
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
  CHOICE_QUESTION_TAB = "New Choice Question",
  ESSAY_QUESTION_TAB = "New Essay Question",
  QUIZ_ATTEMPTING_TAB = "Quiz Attempting",
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

export const answerKeys = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export enum QuestionResult {
  NOT_SHOW = "Not Show",
  FULL_MARK = "Full mark",
  PARTIAL_MARK = "Partial mark",
  ZERO_MARK = "Zero mark",
}

export const getGradeColor = (grade: number, maxGrade: number) => {
  if (grade >= maxGrade * 0.8) return "text-green-500";
  if (grade >= maxGrade * 0.5) return "text-orange-500";
  return "text-red-500";
};
