import { QuestionStatus } from "@/models/question";
import { TrueFalseQuestionGeneralForm } from "./general";

export const defaultGeneralSetting: TrueFalseQuestionGeneralForm = {
  questionName: "",
  questionText: "",
  questionStatus: QuestionStatus.READY,
  defaultMark: 1,
};

export const defaultAnswerSetting = {
  correctAnswer: true,
  feedbackOfTrue: "",
  feedbackOfFalse: "",
};
