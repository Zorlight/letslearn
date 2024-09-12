import React from "react";
import { Tab } from "../static-data";
import TabSetting from "./tab-setting";
import TabAssignment from "./tab-assignment";
import TabResponses from "../../../../choice/[topicId]/_components/tab-content/tab-responses";
import { cn } from "@/lib/utils";
import { Separator } from "@/lib/shadcn/separator";

interface Props {
  selectedTab: string;
  className?: string;
}
const TabContent = ({ selectedTab, className }: Props) => {
  switch (selectedTab) {
    case Tab.ASSIGNMENT:
      return (
        <div className={className}>
          <Separator />
          <div className="py-4">
            <TabAssignment />;
          </div>
        </div>
      );
    case Tab.SETTING:
      return (
        <div className={className}>
          <Separator />
          <div className="p-4">
            <TabSetting />;
          </div>
        </div>
      );
    case Tab.MORE:
      return <div></div>;
    default:
      return <div></div>;
  }
};

export default TabContent;
