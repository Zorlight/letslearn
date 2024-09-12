import { Separator } from "@/lib/shadcn/separator";
import { Tab } from "../static-data";
import TabChoice from "./tab-choice";
import TabResponses from "./tab-responses";
import TabSetting from "./tab-setting";

interface Props {
  selectedTab: string;
  className?: string;
}
const TabContent = ({ selectedTab, className }: Props) => {
  switch (selectedTab) {
    case Tab.CHOICE:
      return (
        <div className={className}>
          <Separator />
          <div className="py-4">
            <TabChoice />
          </div>
        </div>
      );
    case Tab.SETTING:
      return (
        <div className={className}>
          <Separator />
          <div className="p-4">
            <TabSetting />
          </div>
        </div>
      );
    case Tab.RESPONSES:
      return (
        <>
          <Separator />
          <div className="p-4">
            <TabResponses />
          </div>
        </>
      );
    case Tab.MORE:
      return <div></div>;
    default:
      return <div></div>;
  }
};

export default TabContent;
