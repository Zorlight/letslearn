import { useState } from "react";

const useCollapsibleList = () => {
  const [showContent, setShowContent] = useState<string[]>([]);

  const isShowContent = (value: string) => showContent.includes(value);

  const handleItemTrigger = (value: string) => {
    let newShowContent;
    if (isShowContent(value))
      newShowContent = showContent.filter((content) => content !== value);
    else newShowContent = [...showContent, value];
    setShowContent(newShowContent);
  };

  const collapseAll = () => {
    setShowContent([]);
  };

  return {
    showContent,
    setShowContent,
    collapseAll,
    handleItemTrigger,
  };
};

export default useCollapsibleList;
