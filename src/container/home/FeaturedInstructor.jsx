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
  const data = {
    heading: "Featured Instructor",
    desc: "Learn from experienced instructors who bring real-world expertise and industry knowledge. Gain valuable insights, practical skills, and hands-on experience to advance your learning journey.",
    cardData: [
      {
        id: 1,
        img: "https://dreamslms.dreamstechnologies.com/html/assets/img/user/user9.jpg",
        name: "Skyler Whites",
        designation: "UI Designer",
        numOfStudents: "50",
      },
      {
        id: 2,
        img: "https://dreamslms.dreamstechnologies.com/html/assets/img/user/user10.jpg",
        name: "Walter White",
        designation: "Web Developer",
        numOfStudents: "75",
      },
      {
        id: 3,
        img: "https://dreamslms.dreamstechnologies.com/html/assets/img/user/user7.jpg",
        name: "Jesse Pinkman",
        designation: "Backend Engineer",
        numOfStudents: "60",
      },
      {
        id: 4,
        img: "https://dreamslms.dreamstechnologies.com/html/assets/img/user/user8.jpg",
        name: "Hank Schrader",
        designation: "Project Manager",
        numOfStudents: "80",
      },
      {
        id: 5,
        img: "https://dreamslms.dreamstechnologies.com/html/assets/img/user/user8.jpg",
        name: "Hank Schrader",
        designation: "Project Manager",
        numOfStudents: "80",
      },
      {
        id: 6,
        img: "https://dreamslms.dreamstechnologies.com/html/assets/img/user/user8.jpg",
        name: "Hank Schrader",
        designation: "Project Manager",
        numOfStudents: "80",
      },
    ],
  };

  return (
    <div
      className="bg-no-repeat bg-cover bg-center custom-container"
      style={{
        backgroundImage:
          "url('https://dreamslms.dreamstechnologies.com/html/assets/img/bg-banner.png')",
      }}
    >
      {/* <div className="text-center">
        <h2 className="text-4xl font-bold">{data.heading}</h2>
        <p className="mt-4 font-semibold text-gray-500">{data.desc}</p>
      </div> */}
      <div data-aos="fade-up" className="flex justify-between md:mt-4">
        <Heading
          heading={data?.heading}
          position={"text-left"}
          desc={data?.desc}
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
            <p className="text-center col-span-3">No courses available</p>
          )}
        </Swiper>
      </div>
    </div>
  );
}
