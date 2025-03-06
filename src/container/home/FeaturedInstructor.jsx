"use client";

import InstructorCard from "@/components/common/InstructorCard";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import Heading from "@/components/common/Heading";
import NavigationLink from "@/components/home/NavigationLink";
import { useSelector } from "react-redux";

export default function FeaturedInstructor() {
  const { allTutorProfile } = useSelector((state) => state.tutors);

  return (
    <div
      className="bg-no-repeat bg-cover bg-center custom-container"
      style={{
        backgroundImage:
          "url('https://dreamslms.dreamstechnologies.com/html/assets/img/bg-banner.png')",
      }}
    >
      <div data-aos="fade-up" className="flex justify-between md:mt-4">
        <Heading
          heading={"Featured Instructor"}
          position={"text-left"}
          desc={
            "Learn from experienced instructors who bring real-world expertise and industry knowledge. Gain valuable insights, practical skills, and hands-on experience to advance your learning journey."
          }
          descWidth={"md:!w-2/3"}
        />
        <div className="md:block hidden">
          <NavigationLink path={"/tutors"} text={"View All"} />
        </div>
      </div>
      <div data-aos="fade-up" className="mt-8">
        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 3000 }}
          spaceBetween={30}
          loop={true}
          slidesPerView={1}
          pagination={{
            clickable: true,
            enabled: true,
            renderBullet: (index, className) => {
              return `<span class="${className} !bg-secondary !w-10 !h-2 !rounded-lg custom-bullet"></span>`;
            },
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3, spaceBetween: 90 },
          }}
        >
          {allTutorProfile?.length > 0 ? (
            allTutorProfile?.map((item, index) => (
              <SwiperSlide key={index} className="pb-12">
                <InstructorCard data={item} />
              </SwiperSlide>
            ))
          ) : (
            <p className="text-center col-span-3">No Instructor available</p>
          )}
        </Swiper>
      </div>
    </div>
  );
}
