import AnswerDisplay from "../../quiz-attempting/answer-display";
import QuestionDisplay from "../../quiz-attempting/question-display";

const QuizAttemptingTab = () => {
  return (
    <div className="flex flex-col gap-2">
      <QuestionDisplay questionOrder={1} totalQuestions={10}>
        What is your name ?
      </QuestionDisplay>
      <AnswerDisplay answerIndex={0}>My name is John Doe</AnswerDisplay>
      <AnswerDisplay answerIndex={1} variant="selected">
        My name is John Doe
      </AnswerDisplay>
      <AnswerDisplay answerIndex={2} variant="correct">
        My name is John Doe
      </AnswerDisplay>
      <AnswerDisplay answerIndex={3} variant="incorrect">
        My name is John Doe
      </AnswerDisplay>
    </div>
  );
};

export default QuizAttemptingTab;
