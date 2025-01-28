import React from "react";
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

  return (
    <div className="flex justify-center items-center  md:py-10 mx-4 ">
      <div className="md:w-[60%] border-[12px] border-white outline-none w-full bg-gradient-to-b from-[#57504d] to-[#f2f3f6] rounded-[3rem] shadow p-6 relative">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".swiper-prev-custom",
            nextEl: ".swiper-next-custom",
          }}
          loop
          spaceBetween={20}
          slidesPerView={1}
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

        {/* Navigation Buttons */}
        {/* <div className=""> */}
        <button className="swiper-prev-custom cursor-pointer absolute left-2 top-[55%] -translate-y-1/2 bg-white">
          <GrFormPreviousLink className="text-5xl text-[#392c7d]" />
        </button>
        <button className="swiper-next-custom cursor-pointer absolute right-2 top-[55%] -translate-y-1/2 bg-white">
          <GrFormNextLink className="text-5xl text-[#392c7d]" />
        </button>
        {/* </div> */}
      </div>
    </div>
  );
}
