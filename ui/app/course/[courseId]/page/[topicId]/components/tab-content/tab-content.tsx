import { useTab } from "@/hooks/useTab";
import { notFound } from "next/navigation";
import { Tab } from "../static-data";
import TabSetting from "./tab-settings";
import TabPage from "./tab-page";
import { PageTopic } from "@/models/topic";

interface Props {
  className?: string;
  page: PageTopic;
  courseId: string;
  onPageChange?: (data: PageTopic) => void;
}
export default function TabContent({
  courseId,
  page,
  onPageChange,
  className,
}: Props) {
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
          <TabSetting
            courseId={courseId}
            page={page}
            onPageChange={onPageChange}
          />
        </div>
      );
    default:
      return notFound();
  }
}
