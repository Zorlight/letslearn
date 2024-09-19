export const scrollToQuestion = (index: number) => {
  if (typeof window === undefined) return;
  const id = `question-${index + 1}`;
  console.log(id);
  const questionToScroll = document.getElementById(id);
  if (!questionToScroll) return;
  const topPositionOfQuestion = questionToScroll.offsetTop;

  // Scroll with adjustment for the navbar height
  window.scrollTo({
    top: topPositionOfQuestion + 160,
    behavior: "smooth",
  });
};
