import { QuestionStatus } from "@/app/course/[courseId]/quiz/[topicId]/components/static-data";
import { TrueFalseQuestionGeneralForm } from "./general";

export const defaultGeneralSetting: TrueFalseQuestionGeneralForm = {
  questionName: "",
  questionText: "",
  questionStatus: QuestionStatus.READY,
  defaultMark: 1,
  correctAnswer: true,
  feedbackOfTrue: "",
  feedbackOfFalse: "",
};
