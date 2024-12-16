"use client";
import useCollapsibleList from "@/hooks/useCollapsibleList";
import { Accordion } from "@/lib/shadcn/accordion";
import { Button } from "@/lib/shadcn/button";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect } from "react";
import CollapsibleContent from "./collapsible-content";

interface Props {
  titles: string[];
  initShowContent?: string[];
  children: ReactNode[] | ReactNode;
  itemsPerGroup?: number[];
  listClassName?: string;
  contentClassName?: string;
  onItemTrigger?: (value: string) => void;
}
const CollapsibleList = ({
  children,
  titles,
  initShowContent,
  itemsPerGroup,
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

  const itemUIs = Array.isArray(children) ? children : [children];

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
        {itemUIs.map((child, index) => (
          <CollapsibleContent
            key={index}
            title={titles[index]}
            value={titles[index]}
            numOfItems={itemsPerGroup && itemsPerGroup[index]}
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
