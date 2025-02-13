import React from "react";
import FeaturedCard from "@/components/common/FeaturedCard";
import Heading from "@/components/common/Heading";

export default function FeaturedCourses({ cardData }) {


  return (
    <div
      className="bg-no-repeat h-full md:px-20 px-4 "
      style={{
        backgroundImage: `url('https://dreamslms.dreamstechnologies.com/html/assets/img/banner.png')`,
      }}
    >
      <div className="md:py-20 ">
        <div data-aos="fade-up" className="pt-8">
          <p className="text-xl font-bold text-orange-600">What's New</p>
        </div>
        <div data-aos="fade-up" className="flex justify-between md:mt-4">
          <Heading
            heading={"Featured Courses"}
            position={"text-left"}
            desc={` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean
        accumsan bibendum gravida maecenas augue elementum et neque. Suspendisse
        imperdiet.`}
            descWidth={"md:!w-2/3"}
          />
          <div className="md:block hidden">
            <button>All Courses</button>
          </div>
        </div>

        <div
          data-aos="fade-up"
          className="grid md:grid-cols-3 grid-cols-1 gap-2 lg:gap-10 md:mt-8 "
        >
          {cardData?.map((card, index) => (
            <FeaturedCard data={card} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
