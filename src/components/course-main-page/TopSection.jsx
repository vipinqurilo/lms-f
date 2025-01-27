import Image from "next/image";
import React from "react";
import { RatingStars } from "./RatingStars";

const TopSection = ({ data }) => {
  return (
    <div
      className="w-full bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.5887605042016807) 0%, rgba(0,0,0,0.6475840336134453) 100%), url(${data?.courseimage})`,
      }}
    >
      <div className="w-full backdrop-blur-sm">
        <div className="w-full lg:max-w-[60%] h-full custom-container space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 border-4 border-black/10 relative">
              <Image
                src={data?.instructor?.profileImage}
                alt={data?.instructor?.name}
                fill={true}
                className="object-cover rounded-full"
              />
            </div>
            <div className="">
              <p className="text-lg font-semibold">{data?.instructor?.name}</p>
              <p className="font-medium">{data?.instructor?.role}</p>
            </div>
          </div>
          <div className="flex items-center text-xl gap-1">
            <RatingStars rating={data?.instructor?.rating} />(
            {data?.reviews?.length})
          </div>
          <h1 className="text-2xl lg:text-3xl lg:font-extrabold font-bold">
            {data?.title}
          </h1>
          <p className="text-white/90 lg:text-lg">{data?.subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
