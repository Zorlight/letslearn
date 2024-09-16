import { QuestionType } from "../static-data";

export const questionDescription = {
  MultipleChoice: "Select multiple answers: ",
  SingleChoice: "Select the correct answer: ",
  [QuestionType.TRUE_FALSE]: "Select the correct answer: ",
  [QuestionType.SHORT_ANSWER]: "Enter your answer: ",
};
