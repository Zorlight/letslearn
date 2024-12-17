"use client";
import { BreadcrumbItem } from "@/components/ui/simple/breadcrumb";
import TabList from "@/components/ui/tab-list";
import PageLayout from "@/components/ui/util-layout/page-layout";
import { Course } from "@/models/course";
import { FileTopic, iconMap } from "@/models/topic";
import { TabProvider } from "@/provider/tab-provider";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/slices/breadcrumb";
import { getCourse } from "@/services/course";
import { getTopic } from "@/services/topic";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Tab } from "./_components/static-data";
import Loading from "./loading";
import TabContent from "./_components/tab-content/tab-content";

interface Props {
  params: {
    courseId: string;
    topicId: string;
  };
}
export default function FilePage({ params }: Props) {
  const { courseId, topicId } = params;
  const [course, setCourse] = useState<Course>();
  const user = useAppSelector((state) => state.profile.value);
  const [topic, setTopic] = useState<FileTopic>();
  const [initTab, setInitTab] = useState<string>(Tab.FILE);
  const dispatch = useAppDispatch();

  const handleGetCourseSuccess = (data: Course) => {
    setCourse(data);
  };
  const handleGetCourseFail = (error: any) => {
    toast.error(error);
  };

  useEffect(() => {
    if (!topic || !course) return;
    //this useEffect is used for setting breadcrumb when the page is loaded
    const breadcrumbItems: BreadcrumbItem[] = [
      {
        label: "Home",
        href: "/home",
      },
      {
        label: course.title,
        href: `/course/${courseId}`,
      },
      {
        label: topic.title,
        href: `/course/${courseId}/file/${topicId}`,
      },
    ];
    dispatch(setBreadcrumb(breadcrumbItems));
  }, [course, topic]);

  useEffect(() => {
    //this useEffect is used for updating tab based on local storage
    let storageTab = localStorage.getItem(`file-${topicId}`);
    if (storageTab) setInitTab(storageTab);
    getTopic(topicId, handleGetFileTopicSuccess, handleGetFileTopicFail);
  }, [topicId]);

  useEffect(() => {
    getCourse(courseId, handleGetCourseSuccess, handleGetCourseFail);
  }, [courseId]);

  const handleGetFileTopicSuccess = (data: FileTopic) => {
    setTopic(data);
  };
  const handleGetFileTopicFail = (error: any) => {
    toast.error(error);
  };
  const handleTopicChange = (data: FileTopic) => {
    setTopic(data);
  };
  const handleTabSelected = (tab: string) => {
    localStorage.setItem(`file-${topicId}`, tab);
  };

  const Icon = iconMap.file;

  const tabs = Object.values(Tab);

  if (!topic || !user) return <Loading />;

  return (
    <PageLayout className="relative bg-purple-50 !overflow-y-hidden">
      <TabProvider initTab={initTab}>
        <div className="z-0 absolute top-0 w-full h-[250px] px-5 py-10 justify-center bg-gradient-to-br from-assignment via-[#480373] via-75% to-[#480373] shadow-[inset_4px_4px_20px_0px_#480373] text-white">
          <div className="w-full space-y-8">
            <div className="w-full px-5 flex flex-row gap-4">
              <Icon size={32} />
              <h3>{topic.title}</h3>
            </div>
            <TabList
              tabs={tabs}
              variant="white-text"
              onTabSelected={handleTabSelected}
            />
          </div>
        </div>
        <div className="z-10 mt-[150px] flex w-full default-scrollbar p-5">
          <div className="w-full min-h-full h-fit bg-white rounded-md p-5 shadow-md">
            <TabContent
              user={user}
              topic={topic}
              onTopicChange={handleTopicChange}
            />
          </div>
        </div>
      </TabProvider>
    </PageLayout>
  );
}
