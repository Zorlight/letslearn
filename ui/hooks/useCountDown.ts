import { CountdownStatus } from "@/app/courses/[courseId]/quiz/[topicId]/_components/tab-content/_components/quiz-attempting-tab/quiz-countdown";
import { TimerStatus } from "@/app/courses/[courseId]/quiz/[topicId]/_components/tab-content/_components/quiz-attempting-tab/quiz-timer";
import { useEffect, useRef, useState } from "react";

interface Props {
  step?: number;
  countdown: number;
}
const useCountdown = ({ step = 1, countdown }: Props) => {
  const [countdownTimer, setCountdownTimer] = useState<number>(countdown);

  const [status, setStatus] = useState<CountdownStatus>(
    CountdownStatus.STOPPED
  );
  const countDownRef = useRef<NodeJS.Timeout | null>(null);

  const startCountdown = () => {
    if (countDownRef.current) return;
    const interval = setInterval(() => {
      setCountdownTimer((prev) => prev - step / 100);
    }, 10);
    setStatus(CountdownStatus.RUNNING);
    countDownRef.current = interval;
  };

  const stopCountdown = () => {
    if (countDownRef.current) {
      setCountdownTimer(0);
      setStatus(CountdownStatus.STOPPED);
      clearInterval(countDownRef.current);
    }
  };

  useEffect(() => {
    if (countdownTimer <= 0) stopCountdown();
  }, [countdownTimer]);

  return {
    countdownTimer,
    status,
    startCountdown,
    stopCountdown,
  };
};

export default useCountdown;
