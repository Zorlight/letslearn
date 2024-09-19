import { Separator } from "@/lib/shadcn/separator";
import { Tab } from "../static-data";
import TabChoice from "./tab-choice";
import TabResponses from "./tab-responses";
import TabSetting from "./tab-setting";
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
    case Tab.CHOICE:
      return (
        <TabContentLayout className={className}>
          <TabChoice />
        </TabContentLayout>
      );
    case Tab.SETTING:
      return (
        <TabContentLayout className={className}>
          <TabSetting />
        </TabContentLayout>
      );
    case Tab.RESPONSES:
      return (
        <TabContentLayout className={className} fullWidth>
          <TabResponses />
        </TabContentLayout>
      );
    case Tab.MORE:
      return <TabContentLayout></TabContentLayout>;
    default:
      return notFound();
  }
};

export default TabContent;
