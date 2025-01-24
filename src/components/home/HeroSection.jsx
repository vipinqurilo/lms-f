import React from "react";

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-pink-100 to-blue-100 py-10 px-5">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center">
        {/* Text Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h3 className="text-xl font-medium text-gray-500 mb-2">
            The Leader in Online Learning
          </h3>
          <h1 className="text-5xl md:w-[80%] font-extrabold text-gray-900 mb-4 md:mt-6 mt-3 leading-[3.2rem]">
            Engaging & Accessible Online Courses For All
          </h1>
          <p className="text-lg text-gray-600 mb-6 md:mt-6">
            Own your future learning new skills online
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white rounded-full px-2 ">
            <div className="flex items-center bg-white  px-4 py-4 rounded-full flex-grow">
              <span className="text-gray-400 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16l-4-4m0 0l4-4m-4 4h16"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search School, Online educational centers, etc"
                className="flex-grow outline-none text-gray-600 placeholder-gray-400"
              />
            </div>
            <select className="bg-white rounded-full px-4 py-2  text-gray-600 outline-none">
              <option>Category</option>
              <option>Programming</option>
              <option>Design</option>
              <option>Marketing</option>
            </select>
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full shadow-md">
              Search
            </button>
          </div>

          {/* Stats */}
          <div className="w-1/2 md:mt-4 text-gray-500 font-bold text-xl">Trusted by over 15K Users worldwide since 2024</div>
          <div className="flex justify-center lg:justify-start items-center gap-8 mt-6">
            <div className="text-center">
              <h2 className="md:text-4xl text-3xl font-bold text-black">
                1000+
              </h2>
            </div>
            <div className="text-center">
              <h2 className="md:text-4xl text-2xl font-bold text-gray-900">
                4.4
              </h2>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center relative">
          <img
            src="https://dreamslms.dreamstechnologies.com/html/assets/img/object.png"
            alt="Hero"
            className="w-3/4 lg:w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
}
