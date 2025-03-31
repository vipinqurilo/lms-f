import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const LogoHeader = () => {
  const frontendSettings = useSelector((state) => state.admin.settings?.frontendSettings || {});

  return (
    <div className="w-full h-20 bg-white shadow-sm">
      <div className="custom-container h-full flex items-center justify-center">
        <Link href="/" className="relative w-40 h-20">
          <Image 
            src={frontendSettings?.logo || "/assets/common/logo.png"}
            alt={frontendSettings?.title || "logo"}
            fill={true}
            className="w-full h-full object-contain object-center"
          />
        </Link>
      </div>
    </div>
  );
};

export default LogoHeader;
