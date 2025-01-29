import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";

export default function Testimonial() {
  const testimonials = [
    {
      quote: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
											Lorem Ipsum has been the industry's standard dummy text ever since the
											1500s, when an unknown printer took a galley of type and scrambled it to
											make a type specimen book.`,
      name: "Daziy Millar",
      position: "Founder of Awesomemux Technology",
      image:
        "https://dreamslms.dreamstechnologies.com/html/assets/img/user/user1.jpg", // Replace with the real image URL
    },
    {
      quote: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
											Lorem Ipsum has been the industry's standard dummy text ever since the
											1500s, when an unknown printer took a galley of type and scrambled it to
											make a type specimen book.`,
      name: "Daziy Millar",
      position: "Founder of Awesomemux Technology",
      image:
        "https://dreamslms.dreamstechnologies.com/html/assets/img/user/user1.jpg", // Replace with the real image URL
    },
    {
      quote: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
											Lorem Ipsum has been the industry's standard dummy text ever since the
											1500s, when an unknown printer took a galley of type and scrambled it to
											make a type specimen book.`,
      name: "Daziy Millar",
      position: "Founder of Awesomemux Technology",
      image:
        "https://dreamslms.dreamstechnologies.com/html/assets/img/user/user1.jpg", // Replace with the real image URL
    },
    {
      quote: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
											Lorem Ipsum has been the industry's standard dummy text ever since the
											1500s, when an unknown printer took a galley of type and scrambled it to
											make a type specimen book.`,
      name: "Daziy Millar",
      position: "Founder of Awesomemux Technology",
      image:
        "https://dreamslms.dreamstechnologies.com/html/assets/img/user/user1.jpg", // Replace with the real image URL
    },
    {
      quote: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
											Lorem Ipsum has been the industry's standard dummy text ever since the
											1500s, when an unknown printer took a galley of type and scrambled it to
											make a type specimen book.`,
      name: "Daziy Millar",
      position: "Founder of Awesomemux Technology",
      image:
        "https://dreamslms.dreamstechnologies.com/html/assets/img/user/user1.jpg", // Replace with the real image URL
    },
    {
      quote: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
											Lorem Ipsum has been the industry's standard dummy text ever since the
											1500s, when an unknown printer took a galley of type and scrambled it to
											make a type specimen book.`,
      name: "Daziy Millar",
      position: "Founder of Awesomemux Technology",
      image:
        "https://dreamslms.dreamstechnologies.com/html/assets/img/user/user1.jpg", // Replace with the real image URL
    },
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;
    if (swiperInstance) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, []);

  const getButtonCss = (isRight) =>
    `absolute ${
      isRight ? "right-2" : "left-2"
    } top-[55%] -translate-y-1/2 bg-white !p-1 hover:bg-secondary transition-custom !z-[5] text-[#392c7d] hover:text-white`;

  return (
    <div className="flex justify-center items-center  md:py-10 mx-4 ">
      <div className="md:w-[60%] border-[12px] border-white outline-none w-full bg-gradient-to-b from-[#57504d] to-[#f2f3f6] rounded-[3rem] shadow p-6 relative">
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          // navigation={{
          //   prevEl: ".swiper-prev-custom",
          //   nextEl: ".swiper-next-custom",
          // }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          loop
          spaceBetween={20}
          slidesPerView={1}
          onInit={(swiper) => {
            if (prevRef.current && nextRef.current) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.update();
            }
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="text-center py-6">
                <div className="text-orange-500 text-5xl mb-4">
                  <img
                    width={50}
                    src="https://dreamslms.dreamstechnologies.com/html/assets/img/qute.png"
                    alt=""
                  />
                </div>
                <p className="text-white md:text-xl text-[15px] font-bold italic text-center md:mx-4">
                  {testimonial.quote}
                </p>
                <div className="flex justify-center mt-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full shadow-md"
                  />
                </div>
                <h4 className="mt-4 md:text-2xl text-xl font-bold">
                  {testimonial.name}
                </h4>
                <p className="text-gray-500 md:mt-4 font-normal md:text-xl text-base">
                  {testimonial.position}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button ref={prevRef} className={`${getButtonCss()}`}>
          <GrFormPreviousLink className="text-5xl " />
        </button>
        <button ref={nextRef} className={`${getButtonCss(true)}`}>
          <GrFormNextLink className="text-5xl" />
        </button>
   
      </div>
    </div>
  );
}
