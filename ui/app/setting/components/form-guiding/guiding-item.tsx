import React from "react";
import Tick from "./tick";

interface Props {
  children: React.ReactNode;
  checked?: boolean;
}
export default function GuidingItem({ children, checked }: Props) {
  return (
    <div className="flex flex-row items-center gap-2">
      <Tick checked={checked} />
      <p className="text-xs">{children}</p>
    </div>
  );
}
