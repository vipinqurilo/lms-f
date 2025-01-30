import React, { useState, useRef } from "react";
import { Play, Search, Book, Laptop } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const LearningPlatform = () => {
  const [activeStep, setActiveStep] = useState("01");
  const swiperRef = useRef(null); // Reference for Swiper

  const steps = [
    { number: "01", title: "Search", active: activeStep === "01" },
    { number: "02", title: "Book", active: activeStep === "02" },
    { number: "03", title: "Learn", active: activeStep === "03" },
  ];

  const contentData = {
    "01": {
      image: "/images/STEP-1.png",
      title: "Search through hundreds of best teachers",
      description: "Use filters like price, language, proficiency, subject, location, to search for your preferred teacher",
    },
    "02": {
      image: "/images/STEP-2.png",
      title: "Book your preferred time slots",
      description: "Choose from flexible scheduling options and book sessions that fit your calendar perfectly",
    },
    "03": {
      image: "/images/STEP-3.png",
      title: "Start learning and track progress",
      description: "Join interactive sessions and track your learning journey with detailed progress reports",
    },
  };

  const handleStepClick = (stepNumber) => {
    setActiveStep(stepNumber);
    if (swiperRef.current) {
      // Slide to the corresponding step
      swiperRef.current.swiper.slideTo(Number(stepNumber) - 1);
    }
  };

  return (
   <div className="w-full bg-[#F2F2F2]">
     <div className="container mx-auto px-4 py-12 max-w-6xl bg-[#F2F2F2]">
      {/* Main Heading */}
      <h1 className="text-3xl md:text-3xl font-medium text-center mb-12">
        How to start learning with Platform?
      </h1>

      {/* Steps */}
      <div className="w-full flex justify-center items-center">
        <div className="flex justify-around w-7/12 gap-8 md:gap-20  ">
          {steps.map((step) => (
            <div
              key={step.number}
              className="text-center font-semibold text-lg w-56 cursor-pointer"
              onClick={() => handleStepClick(step.number)}
            >
              <div
                className={`${
                  step.active
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-500"
                } pb-2 transition-all duration-300`}
              >
                {step.number}. {step.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-5 relative">
        {/* Swiper for Step Content */}
        <Swiper
          ref={swiperRef} // Set the reference for Swiper
          spaceBetween={50} 
          slidesPerView={1} 
          onSlideChange={(swiper) => setActiveStep(String(swiper.realIndex + 1))}
          loop={false}  // Disable infinite loop
        >
          {steps.map((step) => (
            <SwiperSlide key={step.number}>
              {/* Content for Active Step */}
              <div className="flex">
                {/* Left Side - Image */}
                <div className="flex justify-end items-center w-full">
                  <div>
                    <img
                      src={contentData[step.number].image}
                      alt="step-image"
                      className="object-contain w-11/12 ml-10"
                    />
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="mt-20 w-full">
                  <div className="space-y-6">
                    <div className="w-10/12">
                      <h2 className="text-2xl font-semibold">
                        {contentData[step.number].title}
                      </h2>
                    </div>
                    <div className="w-10/12">
                      <p className="text-gray-600 text-lg">
                        {contentData[step.number].description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 items-center justify-between mt-28 h-40 w-8/12">
                      <div>
                        <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                          Browse Tutors
                        </button>
                      </div>
                      <div>
                        <button className="border border-blue-800 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                          <Play size={20} />
                          Watch Video
                        </button>
                      </div>
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

export default LearningPlatform;
