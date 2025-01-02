"use client";
import PageLayoutWithTab from "@/components/ui/util-layout/page-layout-with-tab";
import { Course } from "@/models/course";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBreadcrumb } from "@/redux/slices/breadcrumb";
import { getCourse } from "@/services/course";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Tab } from "./components/static/tabs";
import TabContent from "./components/tab-content/tab-content";
import { getCourseBreadcrumb } from "./components/utils";
import Loading from "./loading";
import { Role } from "@/models/user";
import { LogOut } from "lucide-react";
import { leaveCourse } from "@/services/user";
import CustomDialog from "@/components/ui/custom-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/lib/shadcn/tooltip";
import { useRouter } from "next/navigation";

interface Props {
  params: {
    courseId: string;
  };
}
export default function CoursePage({ params }: Props) {
  const { courseId } = params;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [course, setCourse] = useState<Course>();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState<{
    title: string;
    content: string;
    variant: string;
  }>({
    title: "Leave this course",
    content: "Are you sure you want to leave this course?",
    variant: "warning",
  });
  const user = useAppSelector((state) => state.profile.value);

  const handleCourseChange = (course: Course) => {
    setCourse(course);
  };

  const handleGetCourseSuccess = (data: Course) => {
    setCourse(data);
    dispatch(setBreadcrumb(getCourseBreadcrumb(data)));
  };
  const handleFail = (error: any) => {
    toast.error(error);
  };
  const handleConfirmDelete = () => {
    leaveCourse(courseId, handleLeaveCourseSuccess, handleFail);
  };
  const handleCancelConfirm = () => {
    setOpenConfirmDialog(false);
  };
  const handleLeaveCourseSuccess = () => {
    setOpenConfirmDialog(false);
    toast.success("You have left the course");
    router.replace("/home");
  };
  const handleLeaveCourse = () => {
    setOpenConfirmDialog(true);
  };
  useEffect(() => {
    getCourse(courseId, handleGetCourseSuccess, handleFail);
  }, [courseId]);
  const teacherTabs = Object.values(Tab);
  let tabs = [Tab.COURSE, Tab.PEOPLE, Tab.DASHBOARD];
  if (user?.role === Role.TEACHER) tabs = teacherTabs;
  let endIcon = null;
  if (user?.role === Role.STUDENT)
    endIcon = (
      <LogOut
        size={20}
        className="text-red-600 hover:text-red-500 cursor-pointer"
      />
    );

  if (!course) return <Loading />;
  return (
    <PageLayoutWithTab
      tabs={tabs}
      tabContentClassName="p-0"
      endIcon={
        <TooltipProvider delayDuration={50}>
          <Tooltip>
            <TooltipTrigger className="cursor-default">
              {endIcon}
            </TooltipTrigger>
            <TooltipContent
              className="w-fit px-2 py-1 bg-red-50 text-red-500 border-0 pointer-events-none"
              side="left"
            >
              Leave this course
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }
      onEndIconClick={handleLeaveCourse}
    >
      {course && (
        <TabContent course={course} onCourseChange={handleCourseChange} />
      )}
      <CustomDialog
        control={{ open: openConfirmDialog, setOpen: setOpenConfirmDialog }}
        variant="warning"
        title={dialogInfo.title}
        content={<span>{dialogInfo.content}</span>}
        onYes={handleConfirmDelete}
        onCancel={handleCancelConfirm}
      />
    </PageLayoutWithTab>
  );
}
