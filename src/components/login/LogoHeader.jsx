import Image from "next/image";
import Link from "next/link";
import React from "react";

const LogoHeader = () => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="relative w-[184px] h-16">
        <Image
          src={"/assets/common/logo.png"}
          alt="logo"
          fill={true}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <Link
        href={"/"}
        className="text-light text-sm font-medium hover:text-black/80 hover:underline transition-custom"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default LogoHeader;
