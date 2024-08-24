"use client";
import React from "react";
import UserButton from "./user-button";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

const NavRoutes = () => {
  const path = usePathname();
  const isTeacherPage = path.includes("/teacher");
  const isStudentPage = path.includes("/chapter");
  return (
    <div className="ml-auto flex flex-row items-center gap-2">
      {isTeacherPage || isStudentPage ? (
        <Link href="/">
          <Button variant="indigo">
            <LogOut className="w-4 h-4 mr-2" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button variant="indigo">Teacher mode</Button>
        </Link>
      )}
      <UserButton />
    </div>
  );
};

export default NavRoutes;
