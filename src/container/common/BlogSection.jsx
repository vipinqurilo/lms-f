"use client";

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "@/components/common/BlogCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

export default function BlogSection() {
  const data = [
    {
      id: 1,
      heading: "An Overworked Newspaper Editor",
      img: "https://dreamslms.dreamstechnologies.com/html/assets/img/blog/blog-03.jpg",
      desc: "Design",
      date: "May 25, 2024",
    },
    {
      id: 2,
      heading: "An Overworked Newspaper Editor",
      img: "https://dreamslms.dreamstechnologies.com/html/assets/img/blog/blog-04.jpg",
      desc: "Design",
      date: "May 25, 2024",
    },
    {
      id: 3,
      heading: "An Overworked Newspaper Editor",
      img: "https://dreamslms.dreamstechnologies.com/html/assets/img/blog/blog-02.jpg",
      desc: "Design",
      date: "May 25, 2024",
    },
    {
      id: 4,
      heading: "An Overworked Newspaper Editor",
      img: "https://dreamslms.dreamstechnologies.com/html/assets/img/blog/blog-03.jpg",
      desc: "Design",
      date: "May 25, 2024",
    },
    {
      id: 5,
      heading: "An Overworked Newspaper Editor",
      img: "https://dreamslms.dreamstechnologies.com/html/assets/img/blog/blog-02.jpg",
      desc: "Design",
      date: "May 25, 2024",
    },
    {
      id: 6,
      heading: "An Overworked Newspaper Editor",
      img: "https://dreamslms.dreamstechnologies.com/html/assets/img/blog/blog-04.jpg",
      desc: "Design",
      date: "May 25, 2024",
    },
  ];

  return (
    <div
      className="bg-no-repeat md:py-16 py-6 my-8"
      style={{
        backgroundImage:
          "url('https://dreamslms.dreamstechnologies.com/html/assets/img/bg-banner.png')",
      }}
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold">Latest Blogs</h2>
        <p className="mt-4 font-semibold text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean
          accumsan bibendum gravida maecenas augue elementum et neque.
          Suspendisse imperdiet.
        </p>
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
          {data.map((item) => (
            <SwiperSlide className="pb-12" key={item.id}>
              <BlogCard data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
