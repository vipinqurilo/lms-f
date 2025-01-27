import Link from "next/link";
import React from "react";

const FooterLinks = ({ data }) => {
  return (
    <div className="w-full flex flex-col items-start gap-4">
      <h4 className="text-2xl text-black font-bold">{data?.title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-2 lg:gap-2 w-full">
        {data?.linksArray.map((item, i) => (
          <Link
            href={item.link}
            key={i}
            className={`text-nowrap relative group ${
              i === data?.linksArray.length - 1 && "border-b-0"
            } 
              ${i === 6 && "md:border-b-0"}
              `}
          >
            <span className="text-black group-hover:!text-secondary transition-custom">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterLinks;
