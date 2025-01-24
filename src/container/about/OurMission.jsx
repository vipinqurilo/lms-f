import Image from "next/image";
import Link from "next/link";
import React from "react";

const OurMission = ({ data }) => {
  return (
    <div
      className="custom-container flex flex-col lg:flex-row gap-10 lg:mt-10 relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("/assets/about/bgImage.svg")`,
      }}
    >
      <div className="w-full lg:w-[40%] lg:h-fit lg:sticky lg:top-20 flex flex-col gap-6">
        <div className="space-y-2">
          <h2 className="font-bold text-secondary capitalize">{data?.tag}</h2>
          <p className="text-2xl lg:text-3xl font-bold">{data?.heading}</p>
        </div>
        <Link
          href={"/contact"}
          className="px-4 py-2 w-fit rounded bg-secondary text-white font-semibold"
        >
          Contact us
        </Link>
      </div>
      <div className="flex flex-col gap-6 lg:w-[60%]">
        {data?.cardsData?.map((card, index) => (
          <div
            className="p-6 bg-white flex items-start flex-col gap-2 border border-black/10 hover:shadow-md transition-custom rounded"
            key={index}
          >
            <Image
              src={card?.icon}
              alt={card?.title}
              width={50}
              height={50}
              className="object-contain"
            />
            <h3 className="font-bold text-xl capitalize">{card?.title}</h3>
            <p>{card?.des}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurMission;
