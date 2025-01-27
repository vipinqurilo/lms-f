"use client";

import InstructorCard from "@/components/home/InstructorCard";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

export default function FeaturedInstructor() {
  const data = {
    heading: "Featured Instructor",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan bibendum gravida maecenas augue elementum et neque. Suspendisse imperdiet.",
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
      className="bg-no-repeat py-10"
      style={{
        backgroundImage:
          "url('https://dreamslms.dreamstechnologies.com/html/assets/img/bg-banner.png')",
      }}
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold">{data.heading}</h2>
        <p className="mt-4 font-semibold text-gray-500">{data.desc}</p>
      </div>
      <div className="mt-8 px-4">
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          loop={true}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {data.cardData.map((item) => (
            <SwiperSlide key={item.id} className="pb-12">
              <InstructorCard data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
