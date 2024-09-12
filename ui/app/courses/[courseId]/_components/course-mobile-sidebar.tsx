import { Sheet, SheetContent, SheetTrigger } from "@/lib/shadcn/sheet";
import { Menu } from "lucide-react";
import CourseSidebar from "./course-sidebar";
import { Course } from "@/models/course";

interface Props {
  course: Course;
}
const CourseMobileSidebar = ({ course }: Props) => {
  return (
    <Sheet>
      <SheetTrigger className="w-auto md:hidden pr-4 hover:opacity-75 transition-all">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="w-2/3 p-0 border-0 bg-white">
        <CourseSidebar course={course} />
      </SheetContent>
    </Sheet>
  );
};

export default CourseMobileSidebar;
