"use client";
import TabList from "@/components/ui/tab-list";
import PageLayout from "@/components/ui/util-layout/page-layout";
import { TabProvider } from "@/provider/tab-provider";
import { ScrollText } from "lucide-react";
import TabContent from "./components/tab-content/tab-content";
import { useState } from "react";
import { Page } from "@/models/page";
import { fakePage } from "@/fake-data/page";

export default function TopicPage() {
  const TABS = ["Page", "Settings"];
  const [page, setPage] = useState<Page>(fakePage);
  const handlePageChange = (data: Page) => {
    setPage(data);
  };
  return (
    <PageLayout className="relative bg-pink-50">
      <TabProvider initTab={TABS[0]}>
        <div className="z-0 absolute top-0 w-full h-[250px] px-5 py-10 justify-center bg-gradient-to-br from-page via-[#823690] via-75% to-[#823690] shadow-[inset_4px_4px_20px_0px_#823690] text-white">
          <div className="w-full space-y-8">
            <div className="w-full px-5 flex flex-row gap-4">
              <ScrollText size={32} />
              <h3>Astronomy conception</h3>
            </div>
            <TabList tabs={TABS} variant="white-text" />
          </div>
        </div>
        <div className="z-10 mt-[150px] flex w-full overflow-y-scroll default-scrollbar p-5">
          <div className="w-full min-h-[600px] h-fit bg-white rounded-md p-5">
            <TabContent page={page} onPageChange={handlePageChange} />
          </div>
        </div>
      </TabProvider>
    </PageLayout>
  );
}
