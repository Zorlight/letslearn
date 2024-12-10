import React from "react";
import Guiding from "./guiding";
import GuidingItem from "./guiding-item";

export default function ImageGuiding() {
  return (
    <Guiding className="w-full text-white p-4 flex flex-col gap-3">
      <div>
        <p className="font-semibold text-sm">Image requirements</p>
        <p className="text-xs">Your image needs to have:</p>
      </div>
      <GuidingItem>Max size of 2MB</GuidingItem>
      <GuidingItem>
        Only <b>.jpg</b>, <b>.jpeg</b>, <b>.png</b> or <b>.webp</b>
      </GuidingItem>
    </Guiding>
  );
}
