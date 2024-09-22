import React from "react";

interface Props {
  htmlString: string;
  className?: string;
}
const EditorDisplay = ({ htmlString, className }: Props) => {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  );
};

export default EditorDisplay;
