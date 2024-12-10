import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface Props {
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
}
export default function Guiding({ children, className }: Props) {
  return (
    <div
      className={cn(
        "relative w-[400px] min-w-[350px] rounded-md overflow-hidden z-0",
        className
      )}
    >
      <Image
        src="/3d-cube-bg.png"
        alt="Guiding background"
        className="absolute -bottom-12 right-0 z-[-1]"
        width={1080}
        height={500}
      />
      {children}
    </div>
  );
}
