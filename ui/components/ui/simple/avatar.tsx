import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface Props {
  className?: string;
}
export default function Avatar({ className }: Props) {
  return (
    <div className={cn("w-8 h-8 rounded-full overflow-hidden", className)}>
      <Image src="/JohnDoe.png" alt="avatar" width={100} height={100} />
    </div>
  );
}
