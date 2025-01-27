"use client";
import React, { useRef, useState } from "react";
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
      h6: "Advanced Learning Programs",
      image: "/assets/login/advance.jpg",
      des: "Our advanced courses are designed to equip students with the latest skills and knowledge in STEAM fields. Enhance your career prospects with specialized training in technology and engineering.",
    },
    {
      h6: "Experienced Faculty",
      image: "/assets/login/faculty.jpg",
      des: "Our faculty members are experts in their respective fields, bringing years of experience and practical knowledge to the classroom. They are dedicated to helping you succeed in your STEAM journey.",
    },
    {
      h6: "Student Support",
      image: "/assets/login/student.webp",
      des: "We offer a range of student support services, including career counseling, mentorship programs, and academic assistance to help you reach your full potential at Steam Institute.",
    },
    {
      h6: "Global Network",
      image: "/assets/login/global.jpg",
      des: "As a student at Steam Institute, you gain access to a global network of alumni, professionals, and industry leaders, providing valuable opportunities for career growth and collaboration.",
    },
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      className="hidden text-white w-1/2 h-full bg-cover bg-center bg-no-repeat lg:flex items-end justify-end px-5"
      // style={{
      //   backgroundImage: `url("/assets/about/bgImage.svg")`,
      // }}
      style={{
        backgroundImage: `linear-gradient(183deg, rgba(145,144,144,0.5887605042016807) 0%, rgba(0,0,0,0.6475840336134453) 100%), url(${slides[activeIndex]?.image})`, // Dynamically update background image
      }}
    >
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
            return `<span class="${className} !bg-secondary !w-10 !h-2 !rounded-lg custom-bullet"></span>`;
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
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="w-full flex flex-col items-start justify-center gap-2  p-10 ">
              {/* <div className="relative w-[100%] h-[50vh]">
                <Image
                  src={slide?.image}
                  alt={slide?.h6}
                  fill={true}
                  className="object-contain object-center"
                />
              </div> */}
              <h6 className="mt-8 font-bold text-3xl capitalize">{slide.h6}</h6>
              <p className="">{slide?.des}</p>
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
