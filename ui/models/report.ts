export type QuizReport = {
  name: string;
  maxDefaultMark: number;
  markDistributionByPercentage: object;
  questionCount: number;
  avgStudentMarkBase10: number;
  maxStudentMarkBase10: number;
  minStudentMarkBase10: number;
  attemptCount: number;
  avgTimeSpend: number; // in seconds
  completionRate: any;
  studentCount: number;
  trueFalseQuestionCount: number;
  multipleChoiceQuestionCount: number;
  shortAnswerQuestionCount: number;
};
