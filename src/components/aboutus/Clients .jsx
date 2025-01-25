import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade"; // Import fade effect
import SwiperCore, { Navigation, EffectFade } from "swiper";

SwiperCore.use([Navigation, EffectFade]);

const testimonials = [
  {
    id: 1,
    number: "01",
    title: "Words of Appreciation",
    content:
      "Every solution was taking too much time with nothing less than 6–8 months, and it was time we did not have. That’s when Wale found FATbit’s Platform. We explored our vision around what Platform had to offer, and to our surprise, it fit exactly what we had in mind, and we had a live demo of the Platform. We took the chance of picking up a solution to run our vision on, and we haven’t regretted it any bit. So far, it’s been a good one for the team.",
    author: "Mr. Chin Wei Seong",
    company: "WTutors",
  },
  {
    id: 2,
    number: "02",
    title: "Words of Appreciation",
    content:
      "FATbit’s Platform exceeded our expectations. The support and customization provided by the team made it easy for us to adapt the solution to our specific needs. We are happy with the decision and continue to see growth in our operations.",
    author: "Ms. Jane Doe",
    company: "EdTech Solutions",
  },
  {
    id: 3,
    number: "03",
    title: "Words of Appreciation",
    content:
      "FATbit’s Platform exceeded our expectations. The support and customization provided by the team made it easy for us to adapt the solution to our specific needs. We are happy with the decision and continue to see growth in our operations.",
    author: "Ms. Jane Doe",
    company: "EdTech Solutions",
  },
];

const Clients = () => {
  const swiperRef = React.useRef(null);

  return (
    <div className="flex items-center h-auto justify-between bg-[#0F2239] pl-16">
      {/* Left Section */}
      <div className="w-3/12 h-96">
        <div className="text-left text-white w-full">
          <p className="text-sm uppercase font-semibold text-gray-400 mb-2">
            Our Core Values
          </p>
          <h1 className="text-3xl  mb-6 mt-7">
            We love clients who understand our values
          </h1>
          <div className="flex items-center gap-4 mt-12">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-16 h-16  flex items-center justify-center rounded-full bg-[#334455] hover:bg-[#334455]"
              aria-label="Previous"
            >
              <ChevronLeft className="text-white w-8 h-8" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-16 h-16 flex items-center justify-center rounded-full bg-[#334455] hover:bg-[#334455]"
              aria-label="Next"
            >
              <ChevronRight className="text-white w-8 h-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-7/12 mt-32">
        <div className="bg-[#0F2239] text-white p-6 flex rounded-lg shadow-lg">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={"1.2"} // Show 1.5 slides at a time
            spaceBetween={30} // Add spacing between slides
            centeredSlides={false} // Ensure slides are not fully centered
            loop={true} // Enable looping
            effect="fade" // Apply the fade effect
            fadeEffect={{
              crossFade: true, // Enable the crossfade effect
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="items-start gap-4 mb-4">
                  <div className="flex space-x-12">
                    <div className="w-20 h-20 flex justify-center items-center bg-yellow-500 text-black font-bold text-xl">
                      {testimonial.number}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold mb-2">
                        {testimonial.title}
                      </h2>
                    </div>
                  </div>
                  <div>
                    <p className="mt-10 text-gray-300 leading-10 text-base">
                      {testimonial.content}
                    </p>
                    <div className="w-full flex justify-end">
                      <div className="w-6/12 mt-10">
                        <p className="text-base font-medium text-gray-400 mt-2 leading-10">
                          - {testimonial.author} <br /> {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Clients;
