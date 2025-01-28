import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";

export default function HeroSection() {
  const data = {
    box: [
      {
        id: 1,
        img: `/assets/home/first_icon.png`,
        heading: "3K",
        desc: "Online Classes",
      },
      {
        id: 2,
        img: `/assets/home/second_icon.png`,
        heading: "72+",
        desc: "Expert Tutors",
      },
      {
        id: 3,
        img: `/assets/home/third_icon.png`,
        heading: "2k+",
        desc: "Certified Courses",
      },
      {
        id: 4,
        img: `/assets/home/fourth_icon.png`,
        heading: "21k",
        desc: "Online Students",
      },
    ],
  };

  return (
    <div
      className="relative bg-cover h-[80vh] bg-no-repeat bg-center text-black py-20 px-6"
      style={{
        backgroundImage: "url('/assets/home/bgimage.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Text Section */}
        <h3 className="md:text-xl text-base font-semibold border-b-2 text-white mb-4">
          Trusted by over 15K Users worldwide since 2024
        </h3> 
        <h1 className="text-2xl lg:text-5xl md:mx-40 font-bold mt-4 text-white leading-tight md:mt-2 mb-6">
          Unlock Knowledge,{" "}
          <span className="text-orange-500">Elevate Your </span>Future, Achieve
          Success
        </h1>
        <div className="flex gap-4 mt-6">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full shadow-md">
            Join as Student
          </button>
          <button className="bg-white text-orange-500 hover:bg-gray-100 px-6 py-2 rounded-full shadow-md">
            Find a Tutor
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:block hidden lg:w-2/3 mt-10 md:py-8 ">
          <div className="flex items-center bg-white rounded-full px-4 py-3 shadow-lg">
            <IoSearchSharp className="text-2xl" />
            <input
              type="text"
              placeholder="Trusted by over 15K Users worldwide since 2024"
              className="flex-grow outline-none text-gray-600 placeholder-gray-400 px-4 py-2"
            />
            <select className="bg-orange-100 rounded-full px-4 py-2.5 text-black outline-none mx-2">
              <option>Category</option>
              <option>Programming</option>
              <option>Design</option>
              <option>Marketing</option>
            </select>
            <button className="bg-orange-500 hover:bg-orange-600 text-white  p-3 rounded-full shadow-md">
              <span className="hidden sm:inline">
                <FaArrowRight />
              </span>
              <span className="sm:hidden">→</span>
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="absolute -bottom-40 mt-12 grid grid-cols-2 sm:grid-cols-4 md:gap-20 gap-4">
          {data.box.map((item) => (
            <div className="text-center shadow-md rounded-2xl w-full md:w-[280px]">
              <div className="flex items-center space-x-4 md:p-4 p-2 rounded-2xl px-8 text-left bg-white">
                <div className="bg-white rounded-md">
                  {/* Icon */}
                  <span className="text-xl font-bold text-orange-500">
                    <img src={`${item.img}`} alt={item.desc} />
                  </span>
                </div>
                <div>
                  <p className="text-xl font-bold text-black">{item.heading}</p>
                  <p className="text-xs  text-black font-bold">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
