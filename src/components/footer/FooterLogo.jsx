import React from "react";
import Link from "next/link";
import Image from "next/image";

const FooterLogo = ({ icons, logo, description }) => {
  return (
    <div className="w-full lg:w-[30%] pr-10 flex flex-col items-start gap-4">
      <Link href="/" className="relative w-40 h-20">
        <Image
          src={logo}
          alt="Logo"
          layout="fill"
          objectFit="contain"
          className="p-2"
        />
      </Link>
      <p className="text-sm text-light">
        {description}
      </p>
      <div className="flex items-center gap-3">
        {icons?.map((data) => (
          <Link
            href={data?.link}
            key={data?.id}
            target="_blank"
            className={`${data?.color} w-8 h-8 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-custom`}
          >
            <data.Icon />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterLogo;
