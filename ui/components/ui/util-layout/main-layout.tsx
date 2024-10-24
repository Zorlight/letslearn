import Navbar from "@/components/ui/navbar/navbar";
import Sidebar from "@/components/ui/sidebar/sidebar";
import React from "react";
interface Props {
  children: React.ReactNode;
}
export default function MainLayout({ children }: Props) {
  return (
    <div className="relative w-screen h-screen">
      <Navbar className="absolute top-0 left-0 right-0" />
      <Sidebar className="absolute left-0 top-[60px]" />
      <div className="pt-[60px] pl-[350px] flex w-full h-full">{children}</div>
    </div>
  );
}
