import Image from "next/image";
import Link from "next/link";
import React from "react";

const FooterLogo = ({ icons }) => {
  return (
    <div className=" w-full space-y-4 lg:w-[22%] h-full">
      <Image
        src={"/assets/common/logo.png"}
        alt="logo"
        width={200}
        height={100}
        className="!object-cover object-center"
      />
      <p>
        STEAM Institute empowers learners with innovative tools, fostering
        creativity and curiosity for a strong foundation in future innovation.
      </p>
      <div className=" flex items-center justify-start gap-2">
        {icons.map(({ id, link, Icon, color }) => (
          <div
            key={id}
            className={`w-8 h-8  flex items-center justify-center rounded-full ${color} hover:border hover:border-black/10 transition-custom`}
          >
            <Link href={link}>
              <Icon className={`text-[18px] text-white `} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterLogo;
