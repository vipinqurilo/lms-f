import Image from "next/image";
import React from "react";
import { RatingStars } from "./RatingStars";

const TopSection = ({ data }) => {
  return (
    <div
      className="w-full bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.5887605042016807) 0%, rgba(0,0,0,0.6475840336134453) 100%), url(${data?.course?.courseImage})`,
      }}
    >
      <div className="w-full backdrop-blur-sm">
        <div
          data-aos="fade-up"
          className="w-full lg:max-w-[60%] h-full custom-container space-y-5"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 border-4 border-black/10 relative flex items-center justify-center bg-gray-300 rounded-full overflow-hidden">
              {data?.course?.courseInstructor?.profileImage ? (
                <Image
                  src={data?.course?.courseInstructor?.profileImage}
                  alt={data?.course?.courseInstructor?.name}
                  fill={true}
                  className="object-cover rounded-full"
                />
              ) : (
                <span className="text-black font-semibold text-lg">
                  {data?.course?.courseInstructor?.firstName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase() || "?"}
                </span>
              )}
            </div>

            <div className="">
              <p className="text-lg font-bold">{data?.course?.courseInstructor?.firstName} {data?.course?.courseInstructor?.lastName}</p>
              <p className="">{data?.course?.courseInstructor?.role}</p>
            </div>
          </div>
          <div className="flex items-center text-xl gap-1">
            {data?.course?.ratings && (
              <>
                <RatingStars rating={data?.course?.instructor?.rating} />
                <span className="text-base">({data?.course?.reviews?.length})</span>
              </>
            )}
          </div>
          <h1 className="text-2xl lg:text-3xl lg:font-extrabold font-bold">
            {data?.course?.courseTitle}
          </h1>
          <p className="text-white/90 lg:text-lg line-clamp-2">{data?.course?.courseDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
