import TabContentLayout from "@/components/ui/tab-content-layout";
import { useTab } from "@/hooks/useTab";
import { notFound } from "next/navigation";
import { Tab } from "../static-data";
import TabAssignment from "./tab-assignment";
import TabSetting from "./tab-setting";

interface Props {
  className?: string;
}
const TabContent = ({ className }: Props) => {
  const tabContext = useTab<string>();
  const { selectedTab } = tabContext;
  switch (selectedTab) {
    case Tab.ASSIGNMENT:
      return (
        <TabContentLayout className={className}>
          <TabAssignment />
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
