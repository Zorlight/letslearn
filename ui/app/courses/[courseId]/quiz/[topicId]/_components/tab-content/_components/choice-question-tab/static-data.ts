import { ChoiceQuestionAnswerForm } from "../../../question-bank/multiple-choice-question/answers";
import { ChoiceQuestionGeneralForm } from "../../../question-bank/multiple-choice-question/general";
import { QuestionStatus } from "../../../static-data";

export const defaultGeneralSetting: ChoiceQuestionGeneralForm = {
  questionName: "",
  questionText: "",
  questionStatus: QuestionStatus.READY,
  defaultMark: 1,
  multipleChoice: false,
};

export const defaultAnswerSetting: ChoiceQuestionAnswerForm = {
  choices: [
    {
      text: "Choice 1",
      gradePercent: 100,
      feedback: "",
    },
    {
      text: "Choice 2",
      gradePercent: 100,
      feedback: "",
    },
    {
      text: "Choice 3",
      gradePercent: 100,
      feedback: "",
    },
  ],
};
