import MainLayout from "@/components/ui/util-layout/main-layout";
import React from "react";
interface Props {
  children: React.ReactNode;
}
export default function CousreLayout({ children }: Props) {
  return <MainLayout>{children}</MainLayout>;
}
