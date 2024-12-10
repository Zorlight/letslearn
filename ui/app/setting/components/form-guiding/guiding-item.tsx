import React from "react";
import Tick from "./tick";

interface Props {
  children: React.ReactNode;
}
export default function GuidingItem({ children }: Props) {
  return (
    <div className="flex flex-row items-center gap-2">
      <Tick />
      <p className="text-xs">{children}</p>
    </div>
  );
}
