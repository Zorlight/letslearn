"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/lib/shadcn/sheet";
import { Menu } from "lucide-react";
import CourseSidebar from "./course-sidebar";
import { Course } from "@/models/course";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface Props {
  course: Course;
  className?: string;
}
const CourseSidebarToggle = ({ course, className }: Props) => {
  // const [top, setTop] = useState(0);
  // const [dragging, setDragging] = useState(false);

  // const handleMouseDown = (e: any) => {
  //   setDragging(true);
  // };

  // const handleMouseMove = (e: any) => {
  //   if (dragging) {
  //     const newTop = e.clientY;
  //     setTop(newTop);
  //   }
  // };

  // const handleMouseUp = () => {
  //   setDragging(false);
  // };

  // useEffect(() => {
  //   if (dragging) {
  //     window.addEventListener("mousemove", handleMouseMove);
  //     window.addEventListener("mouseup", handleMouseUp);
  //     console.log("dragging");
  //   } else {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //     window.removeEventListener("mouseup", handleMouseUp);
  //     console.log("not dragging");
  //   }
  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, [dragging]);
  return (
    // <div onMouseDown={handleMouseDown}>

    // </div>
    <Sheet>
      <SheetTrigger
        className={cn(
          "fixed left-0 z-50 top-44 w-auto p-4 bg-slate-100 rounded-r-full hover:pl-8 hover:bg-slate-200 transition-all opacity-70 hover:opacity-100",
          className
        )}
        // style={{ top: `${top}px` }}
      >
        <Menu className="text-indigo-950" />
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0 border-0 bg-white pt-14">
        <CourseSidebar course={course} />
      </SheetContent>
    </Sheet>
  );
};

export default CourseSidebarToggle;
