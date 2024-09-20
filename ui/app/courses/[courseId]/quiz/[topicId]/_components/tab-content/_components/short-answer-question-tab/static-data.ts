import { ShortAnswerQuestionAnswerForm } from "../../../question-bank/short-answer-question/answers";
import { ShortAnswerQuestionGeneralForm } from "../../../question-bank/short-answer-question/general";
import { QuestionStatus } from "../../../static-data";

export const dafaultGeneralSetting: ShortAnswerQuestionGeneralForm = {
  questionName: "",
  questionText: "",
  questionStatus: QuestionStatus.READY,
  defaultMark: 1,
};

export const defaultAnswerSetting: ShortAnswerQuestionAnswerForm = {
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
};
