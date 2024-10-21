import Image from "next/image";
import React from "react";

export default function Avatar() {
  return (
    <div className="w-8 h-8 rounded-full overflow-hidden">
      <Image src="/JohnDoe.png" alt="avatar" width={100} height={100} />
    </div>
  );
}
