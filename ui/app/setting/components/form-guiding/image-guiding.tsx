import React from "react";
import Guiding from "./guiding";
import GuidingItem from "./guiding-item";

export type ImageRequirement = {
  size?: boolean;
  extension?: boolean;
};

interface Props {
  requirements: ImageRequirement;
}
export default function ImageGuiding({ requirements }: Props) {
  return (
    <Guiding className="w-full text-white p-4 flex flex-col gap-3">
      <div>
        <p className="font-bold text-sm">Image requirements</p>
        <p className="text-xs">Your image needs to have:</p>
      </div>
      <GuidingItem checked={requirements.size}>Max size of 2MB</GuidingItem>
      <GuidingItem checked={requirements.extension}>
        Only <b>.jpg</b>, <b>.jpeg</b>, <b>.png</b> or <b>.webp</b>
      </GuidingItem>
    </Guiding>
  );
}
