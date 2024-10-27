import { TrueFalseQuestionGeneralForm } from "../../../question-bank/true-false-question/general";
import { QuestionStatus } from "../../../static-data";

export const defaultGeneralSetting: TrueFalseQuestionGeneralForm = {
  questionName: "",
  questionText: "",
  questionStatus: QuestionStatus.READY,
  defaultMark: 1,
  correctAnswer: true,
  feedbackOfTrue: "",
  feedbackOfFalse: "",
};
