"use client";
import CollapsibleContent from "@/app/courses/[courseId]/_components/collapsible/collapsible-content";
import useCollapsibleList from "@/hooks/useCollapsibleList";
import { Accordion } from "@/lib/shadcn/accordion";
import { Button } from "@/lib/shadcn/button";
import { ReactNode, useEffect } from "react";

interface Props {
  titles: string[];
  initShowContent?: string[];
  children: ReactNode[];
}
const CollapsibleList = ({ children, titles, initShowContent }: Props) => {
  const { showContent, handleItemTrigger, collapseAll, setShowContent } =
    useCollapsibleList();

  useEffect(() => {
    if (initShowContent) setShowContent(initShowContent);
  }, []);

  return (
    <div>
      <div className="w-full flex justify-end">
        <Button variant="link" onClick={collapseAll}>
          Collapse all
        </Button>
      </div>
      <Accordion
        value={showContent}
        type="multiple"
        className="w-full flex flex-col gap-4"
      >
        {children.map((child, index) => (
          <CollapsibleContent
            key={index}
            title={titles[index]}
            value={titles[index]}
            showContent={showContent}
            onTrigger={handleItemTrigger}
          >
            {child}
          </CollapsibleContent>
        ))}
      </Accordion>
    </div>
  );
};

export default CollapsibleList;
