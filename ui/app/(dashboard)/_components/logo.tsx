import Image from "next/image";
import React from "react";
import svgLogo from "@/public/logo.svg";

const Logo = () => {
  return <Image src={svgLogo} alt="Logo" width={120} height={0} />;
};

export default Logo;
