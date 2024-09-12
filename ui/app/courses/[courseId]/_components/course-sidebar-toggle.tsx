import { Sheet, SheetContent, SheetTrigger } from "@/lib/shadcn/sheet";
import { Menu } from "lucide-react";
import CourseSidebar from "./course-sidebar";
import { Course } from "@/models/course";

interface Props {
  course: Course;
}
const CourseSidebarToggle = ({ course }: Props) => {
  return (
    <Sheet>
      <SheetTrigger className="fixed left-0 top-24 w-auto p-4 bg-slate-100 rounded-r-full hover:pl-8 hover:bg-slate-200 transition-all">
        <Menu className="text-indigo-950" />
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0 border-0 bg-white pt-14">
        <CourseSidebar course={course} />
      </SheetContent>
    </Sheet>
  );
};

export default CourseSidebarToggle;
