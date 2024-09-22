"use client";
import CollapsibleContent from "@/app/courses/[courseId]/_components/collapsible/collapsible-content";
import useCollapsibleList from "@/hooks/useCollapsibleList";
import { Accordion } from "@/lib/shadcn/accordion";
import { Button } from "@/lib/shadcn/button";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect } from "react";

interface Props {
  titles: string[];
  initShowContent?: string[];
  children: ReactNode[];
  listClassName?: string;
  contentClassName?: string;
  onItemTrigger?: (value: string) => void;
}
const CollapsibleList = ({
  children,
  titles,
  initShowContent,
  listClassName,
  contentClassName,
  onItemTrigger,
}: Props) => {
  const { showContent, handleItemTrigger, collapseAll, setShowContent } =
    useCollapsibleList();

  useEffect(() => {
    if (initShowContent) setShowContent(initShowContent);
  }, []);

  const handleTriggerClick = (value: string) => {
    if (onItemTrigger) onItemTrigger(value);
    handleItemTrigger(value);
  };

  return (
    <div>
      <div className="w-full flex justify-end">
        <Button type="button" variant="link" onClick={collapseAll}>
          Collapse all
        </Button>
      </div>
      <Accordion
        value={showContent}
        type="multiple"
        className={cn("w-full flex flex-col gap-4", listClassName)}
      >
        {children.map((child, index) => (
          <CollapsibleContent
            key={index}
            title={titles[index]}
            value={titles[index]}
            showContent={showContent}
            onTrigger={handleTriggerClick}
            className={contentClassName}
          >
            {child}
          </CollapsibleContent>
        ))}
      </Accordion>
    </div>
  );
};

export default CollapsibleList;
