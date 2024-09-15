import { QuestionType, TabInTab } from "../../static-data";

export const tabInTabMapper = {
  [QuestionType.TRUE_FALSE]: TabInTab.TRUE_FALSE_QUESTION_TAB,
  [QuestionType.MULTIPLE_CHOICE]: TabInTab.MULTIPLE_CHOICE_QUESTION_TAB,
  [QuestionType.SHORT_ANSWER]: TabInTab.SHORT_ANSWER_QUESTION_TAB,
  [QuestionType.ESSAY]: TabInTab.ESSAY_QUESTION_TAB,
};
