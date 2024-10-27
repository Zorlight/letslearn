import { useTab } from "@/hooks/useTab";
import { Page } from "@/models/page";
import { notFound } from "next/navigation";
import { Tab } from "../static-data";
import TabSetting from "./tab-settings";
import TabPage from "./tab-page";

interface Props {
  className?: string;
  page: Page;
  onPageChange?: (data: Page) => void;
}
export default function TabContent({ page, onPageChange, className }: Props) {
  const tabContext = useTab<string>();
  const { selectedTab } = tabContext;

  switch (selectedTab) {
    case Tab.PAGE:
      return (
        <div className={className}>
          <TabPage page={page} />
        </div>
      );
    case Tab.SETTINGS:
      return (
        <div className={className}>
          <TabSetting page={page} onPageChange={onPageChange} />
        </div>
      );
    default:
      return notFound();
  }
}
