"use client";
import React, { useRef } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

const SlideShow = () => {
  const slides = [
    {
      h6: "Approved",
      image: "/assets/login/login-img.webp",
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ab suscipit fuga iure omnis voluptas nulla vero dicta, deserunt aliquam ipsum reiciendis, aperiam dignissimos veritatis quam vel asperiores? Quas, sequi?",
    },
    {
      h6: "Attendence Tracking",
      image: "/assets/login/login-img.webp",
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ab suscipit fuga iure omnis voluptas nulla vero dicta, deserunt aliquam ipsum reiciendis, aperiam dignissimos veritatis quam vel asperiores? Quas, sequi?",
    },
    {
      h6: "Information Tracking",
      image: "/assets/login/login-img.webp",
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ab suscipit fuga iure omnis voluptas nulla vero dicta, deserunt aliquam ipsum reiciendis, aperiam dignissimos veritatis quam vel asperiores? Quas, sequi?",
    },
    {
      h6: "Payroll",
      image: "/assets/login/login-img.webp",
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ab suscipit fuga iure omnis voluptas nulla vero dicta, deserunt aliquam ipsum reiciendis, aperiam dignissimos veritatis quam vel asperiores? Quas, sequi?",
    },
    {
      h6: "Reports and Charts",
      image: "/assets/login/login-img.webp",
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ab suscipit fuga iure omnis voluptas nulla vero dicta, deserunt aliquam ipsum reiciendis, aperiam dignissimos veritatis quam vel asperiores? Quas, sequi?",
    },
    {
      h6: "Tracking",
      image: "/assets/login/login-img.webp",
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ab suscipit fuga iure omnis voluptas nulla vero dicta, deserunt aliquam ipsum reiciendis, aperiam dignissimos veritatis quam vel asperiores? Quas, sequi?",
    },
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="hidden lg:!block w-1/2 h-full bg-gradient-to-tr from-primary/20 to-primary/10 px-5">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        // navigation={{
        //   prevEl: prevRef.current,
        //   nextEl: nextRef.current,
        // }}
        autoplay={{ delay: 1500 }}
        loop={true}
        pagination={{
          clickable: true,
          enabled: true,
          renderBullet: (index, className) => {
            return `<span class="${className} !bg-primary !w-10 !h-2 !rounded-lg custom-bullet"></span>`;
          },
        }}
        modules={[Autoplay, Pagination]}
        onInit={(swiper) => {
          if (prevRef.current && nextRef.current) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.update();
          }
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="w-full flex flex-col items-center justify-center gap-2 h-screen p-10 ">
              <div className="relative w-[100%] h-[50vh]">
                <Image
                  src={slide?.image}
                  alt={slide?.h6}
                  fill={true}
                  className="object-contain object-center"
                />
              </div>
              <h6 className="mt-8 font-bold text-3xl capitalize">
                {slide.h6}
              </h6>
              <p className="text-center">{slide?.des}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div
                ref={prevRef}
                className="bg-zinc-100 w-fit p-1 rounded-full border-2 transition-all ease-in-out duration-200 text-primary-500 hover:bg-primary-500 hover:text-white border-primary-500 absolute top-1/2 left-0 -translate-x-1/2 cursor-pointer z-20"
            >
                <FaAngleLeft size={15} />
            </div>
            <div
                ref={nextRef}
                className="bg-zinc-100 w-fit p-1 rounded-full border-2 transition-all ease-in-out duration-200 text-primary-500 hover:bg-primary-500 hover:text-white border-primary-500 absolute top-1/2 right-0 -translate-x-1/2 cursor-pointer z-30"
            >
                <FaAngleRight size={15} />
            </div> */}
    </div>
  );
};

export default SlideShow;
