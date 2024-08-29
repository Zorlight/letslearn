"use client";
import useWindowSize from "@/hooks/useWindowSize";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeConfetti } from "@/redux/slices/confetti";
import ReactConfetti from "react-confetti";
const ConfettiProvider = () => {
  const { width, height } = useWindowSize();
  const open = useAppSelector((state) => state.confetti.open);
  const dispatch = useAppDispatch();

  if (!open) return null;
  return (
    <div className="pointer-events-none fixed z-[999] left-0 top-0 w-screen h-screen">
      <ReactConfetti
        width={width}
        height={height}
        numberOfPieces={500}
        recycle={false}
        onConfettiComplete={() => dispatch(closeConfetti())}
      />
    </div>
  );
};

export default ConfettiProvider;
