import React from "react";
import Guiding from "./guiding";
import GuidingItem from "./guiding-item";
export type PasswordRequirement = {
  length?: boolean;
};

interface Props {
  requirements: PasswordRequirement;
}
export default function PasswordGuiding({ requirements }: Props) {
  return (
    <Guiding className="w-full text-white p-4 flex flex-col gap-3">
      <div>
        <p className="font-bold text-sm">Password requirements</p>
        <p className="text-xs">Your password needs to have:</p>
      </div>
      <GuidingItem checked={requirements.length}>
        At least 8 characters
      </GuidingItem>
    </Guiding>
  );
}
