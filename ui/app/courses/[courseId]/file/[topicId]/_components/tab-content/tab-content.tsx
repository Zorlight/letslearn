import React from "react";
import { Tab } from "../static-data";
import TabSetting from "./tab-setting";
import TabFile from "./tab-file";
import { useTab } from "@/hooks/useTab";
import TabContentLayout from "@/components/ui/tab-content-layout";
import { notFound } from "next/navigation";

interface Props {
  className?: string;
}
const TabContent = ({ className }: Props) => {
  const tabContext = useTab<string>();
  const { selectedTab } = tabContext;
  switch (selectedTab) {
    case Tab.FILE:
      return (
        <TabContentLayout className={className}>
          <TabFile />
        </TabContentLayout>
      );
    case Tab.SETTING:
      return (
        <TabContentLayout className={className}>
          <TabSetting />
        </TabContentLayout>
      );
    case Tab.MORE:
      return <TabContentLayout></TabContentLayout>;
    default:
      return notFound();
  }
};

export default TabContent;
