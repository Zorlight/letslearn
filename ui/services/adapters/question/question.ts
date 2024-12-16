import {
  ChoiceQuestion,
  Question,
  QuestionType,
  ShortAnswerQuestion,
  TrueFalseQuestion,
} from "@/models/question";

export const convertQuestionFromResponseData = (data: any): Question => {
  let {
    id,
    topicQuizId,
    questionName,
    questionText,
    status,
    type,
    defaultMark,
    usage,
    feedbackOfTrue,
    feedbackOfFalse,
    correctAnswer,
    multiple,
    choices,
    createdAt,
    createdBy,
    modifiedBy,
    updatedAt,
    deletedAt,
  } = data;

  const choiceQuestion: ChoiceQuestion = {
    choices,
    multiple,
  };
  const shortAnswerQuestion: ShortAnswerQuestion = {
    choices,
  };
  const trueFalseQuestion: TrueFalseQuestion = {
    correctAnswer,
    feedbackOfTrue,
    feedbackOfFalse,
  };

  //Choice question default value
  const question: Question = {
    id,
    topicQuizId,
    questionName,
    questionText,
    status,
    type,
    defaultMark,
    usage,
    data: choiceQuestion,
    createdAt,
    modifiedAt: updatedAt,
    createdBy,
    modifiedBy,
  };

  if (type === QuestionType.SHORT_ANSWER) {
    question.data = shortAnswerQuestion;
  } else if (type === QuestionType.TRUE_FALSE) {
    question.data = trueFalseQuestion;
  }
  return question;
};
