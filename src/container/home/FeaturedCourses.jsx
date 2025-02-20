import React, { useState } from "react";
import FeaturedCard from "@/components/common/FeaturedCard";
import Heading from "@/components/common/Heading";
import { useSelector } from "react-redux";
import Loader from "@/components/common/Loader";

export default function FeaturedCourses({ cardData = [] }) {
  const isLoading = useSelector(
    (state) => state.courses.isLoading.fetchCoursesAsync
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className="bg-no-repeat h-full md:px-20 px-4 "
          style={{
            backgroundImage: `url('https://dreamslms.dreamstechnologies.com/html/assets/img/banner.png')`,
          }}
        >
          <div className="md:py-20">
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

            {/* Render Paginated Courses */}
            <div
              data-aos="fade-up"
              className="grid md:grid-cols-3 grid-cols-1 gap-2 lg:gap-16 md:mt-8"
            >
              {cardData?.length > 0 ? (
                cardData?.slice(0, 6)?.map((card, index) => (
                  <FeaturedCard data={card} isFull={true} key={index} />
                ))
              ) : (
                <p className="text-center col-span-3">No courses available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
