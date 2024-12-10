import React from "react";
import Guiding from "./guiding";
import GuidingItem from "./guiding-item";

export default function PasswordGuiding() {
  return (
    <Guiding className="text-white p-5">
      <p className="font-semibold">Password requirements</p>
      <p className="text-sm">Your password needs to have:</p>
      <ul className="mt-3 font-normal">
        <GuidingItem>At least 8 characters</GuidingItem>
      </ul>
    </Guiding>
  );
}
