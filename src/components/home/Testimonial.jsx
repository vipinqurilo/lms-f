import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

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
    <div className="flex justify-center items-center  py-10">
      <div className="md:w-[60%]  w-full bg-gradient-to-b from-[#57504d] to-[#f2f3f6] rounded-2xl shadow-md p-6 relative">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          loop
          spaceBetween={20}
          slidesPerView={1}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="text-center">
                <div className="text-orange-500 text-5xl mb-4">
                  <img
                    width={50}
                    src="https://dreamslms.dreamstechnologies.com/html/assets/img/qute.png"
                    alt=""
                  />
                </div>
                <p className="text-white text-lg italic text-center">
                  {testimonial.quote}
                </p>
                <div className="flex justify-center mt-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full shadow-md"
                  />
                </div>
                <h4 className="mt-4 text-lg font-bold">{testimonial.name}</h4>
                <p className="text-gray-500 text-sm">{testimonial.position}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button className="swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 text-red-700">
          
        </button>
        <button className="swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 text-red-700">
          
        </button>
      </div>
    </div>
  );
}
