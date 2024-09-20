import { useState } from "react";
import styles from "./styles.module.css";

const useBubbleAnimation = () => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseOut = () => {
    setTimeout(() => {
      setIsHover(false);
    }, 200);
  };
  const bubbleClassName = isHover ? styles["bubble"] : "";

  return {
    isHover,
    bubbleClassName,
    handleMouseEnter,
    handleMouseOut,
  };
};

export default useBubbleAnimation;
