import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";

const PlatformInfo = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const swiperRef = useRef(null);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  function getLinkCss(isWatch) {
    return `px-4 hover:bg-secondary text-white py-2 ${
      isWatch
        ? "border border-white/50 hover:!text-white"
        : "bg-secondary"
    } rounded transition-custom`;
  }
  // function getLinkCss(isWatch) {
  //   return `px-4 hover:bg-black text-white py-2 ${
  //     isWatch
  //       ? "border border-black/10 !text-black hover:!text-white"
  //       : "bg-secondary"
  //   } rounded transition-custom`;
  // }

  return (
    <div
      className="custom-container bg-no-repeat bg-center bg-cover bg-background text-white"
      // style={{
      //   backgroundImage: `url("/assets/about/bgImage.svg")`,
      // }}
    >
      <div className="lg:max-w-[60%] mx-auto">
        <h1 className="text-2xl text-center font-semibold pb-2 md:pb-4">
          How to start learning with Platform?
        </h1>
        <div className="flex justify-between border-b border-gray-200 mb-4 lg:max-w-2xl mx-auto">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`flex-1 py-2 text-center text-lg font-semibold ${
                activeTab === index
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-200"
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <Swiper
          ref={swiperRef}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
        >
          {tabs.map(({ content }, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:gap-10 w-full gap-4 lg:py-4">
                {/* <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4 lg:py-4"> */}
                <div className="w-full">
                  <Image
                    src={content?.image}
                    alt={content?.title}
                    width={400}
                    height={400}
                    layout="responsive"
                    className="lg:h-[40vh]"
                  />
                </div>
                <div className="w-full flex items-start lg:items-center lg:gap-8 flex-col gap-4">
                  <h3 className="text-2xl font-bold capitalize">
                    {content?.title}
                  </h3>
                  <p className="text-white lg:text-center">{content?.des}</p>
                  <div className="w-full flex items-center justify-between lg:justify-center lg:gap-8">
                    <Link href={content?.link} className={`${getLinkCss()}`}>
                      Browse More
                    </Link>
                    <Link
                      href={content?.videoLink}
                      className={`${getLinkCss(true)}`}
                    >
                      Watch Video
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PlatformInfo;
