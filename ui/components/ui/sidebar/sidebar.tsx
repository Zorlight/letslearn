"use client";
import { cn } from "@/lib/utils";
import {
  Calendar,
  ClipboardList,
  GraduationCap,
  Home,
  ListCheck,
  Settings,
  Users,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SidebarCollapsibleItem from "./sidebar-colapsible-item";
import SidebarCourseItem from "./sidebar-course-item";
import SidebarItem from "./sidebar-item";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Role } from "@/models/user";
import { CldImage } from "next-cloudinary";
import { getPublicCourses, getTeacherCourses } from "@/services/course";
import { Course } from "@/models/course";
import { toast } from "react-toastify";
import { setCourses } from "@/redux/slices/course";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

interface Props {
  className?: string;
}
export default function Sidebar({ className }: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.profile.value);
  const courses = useAppSelector((state) => state.courses.value);
  const role = user ? user.role : Role.STUDENT;
  const studentCourseList = user ? user.courses : [];
  const handleGetTeacherCourseSuccess = (data: any) => {
    dispatch(setCourses(data));
  };
  const handleGetTeacherCourseFail = (error: any) => {
    toast.error(error);
  };
  const handleGetPublicCoursesSuccess = (data: Course[]) => {
    const joinedCourseIdList = user
      ? user.courses.map((course) => course.id)
      : [];
    // filter to get only public courses that user has not joined
    const filteredCourses = data.filter(
      (course) => !joinedCourseIdList.includes(course.id)
    );
    dispatch(setCourses(filteredCourses));
  };
  const handleGetPublicCoursesFail = (error: any) => {
    toast.error(error);
  };

  useEffect(() => {
    // for student
    if (!user) return;
    if (user.role !== Role.STUDENT) return;
    getPublicCourses(handleGetPublicCoursesSuccess, handleGetPublicCoursesFail);
  }, [user]);

  useEffect(() => {
    // for teacher
    if (!user) return;
    if (user.role !== Role.TEACHER) return;
    getTeacherCourses(
      user,
      handleGetTeacherCourseSuccess,
      handleGetTeacherCourseFail
    );
  }, [user]);
  return (
    <div
      className={cn(
        "w-[350px] h-[calc(100%-60px)] flex flex-col border-r-[0.5px] border-gray-400 bg-white",
        className
      )}
    >
      <Group hasBorder={false}>
        <SidebarItem title="Home" icon={<Home />} href="/home" />
        <SidebarItem title="Calendar" icon={<Calendar />} href="/calendar" />
        <SidebarItem title="Setting" icon={<Settings />} href="/setting" />
      </Group>
      <Group>
        {role === Role.TEACHER && (
          <SidebarCollapsibleItem
            trigger={<SidebarItem title="Teaching" icon={<Users />} />}
          >
            <SidebarItem
              title="To review"
              icon={<ClipboardList />}
              href="/to-review"
            />
            <div className="max-h-[calc(100vh-350px)] min-h-fit default-scrollbar">
              {courses.map((course) => (
                <SidebarCourseItem
                  key={course.id}
                  courseName={course.title}
                  category={course.category}
                  image={
                    course.imageUrl ? (
                      <CldImage
                        src={course.imageUrl}
                        alt={`${course.title} background`}
                        width={100}
                        height={100}
                        className="w-8 h-8 rounded-full object-fill"
                      />
                    ) : (
                      <Image
                        src="/astronomy-bg.jpg"
                        alt="Astronomy background"
                        width={100}
                        height={100}
                        className="w-8 h-8 rounded-full object-fill"
                      />
                    )
                  }
                />
              ))}
            </div>
          </SidebarCollapsibleItem>
        )}
        {role === Role.STUDENT && (
          <SidebarCollapsibleItem
            trigger={<SidebarItem title="Enrolled" icon={<GraduationCap />} />}
          >
            <SidebarItem title="To do" icon={<ListCheck />} href="/to-do" />
            <div className="max-h-[calc(100vh-350px)] min-h-fit default-scrollbar">
              {studentCourseList.map((course) => (
                <SidebarCourseItem
                  key={course.id}
                  courseName={course.title}
                  category={course.category}
                  href={`/course/${course.id}`}
                  image={
                    course.imageUrl ? (
                      <CldImage
                        src={course.imageUrl}
                        alt={`${course.title} background`}
                        width={100}
                        height={100}
                        className="w-8 h-8 rounded-full object-fill"
                      />
                    ) : (
                      <Image
                        src="/astronomy-bg.jpg"
                        alt="Astronomy background"
                        width={100}
                        height={100}
                        className="w-8 h-8 rounded-full object-fill"
                      />
                    )
                  }
                />
              ))}
            </div>
          </SidebarCollapsibleItem>
        )}
      </Group>
    </div>
  );
}

interface GroupProps {
  children: React.ReactNode;
  className?: string;
  hasBorder?: boolean;
}
const Group = ({ children, className, hasBorder = true }: GroupProps) => {
  return (
    <div
      className={cn(
        "w-full pr-5 py-3",
        hasBorder && "border-t-[0.5px] border-gray-400",
        className
      )}
    >
      {children}
    </div>
  );
};
