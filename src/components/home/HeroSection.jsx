import React from "react";
// import bgimage from "/assets/home/bgimage.png"

export default function HeroSection() {
  return (
    <div
      className="relative bg-cover bg-no-repeat bg-center text-black py-20 px-6"
      style={{
        backgroundImage: "url('/assets/home/bgimage.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Text Section */}
        <h3 className="text-xl font-semibold border-b-2 text-white mb-4">
          Trusted by over 15K Users worldwide since 2024
        </h3>
        <h1 className="text-4xl lg:text-5xl md:mx-40 font-bold text-white leading-tight mb-6">
          Unlock Knowledge,{" "}
          <span className="text-orange-500">Elevate Your </span>Future Achieve
          Success
        </h1>
        <div className="flex gap-4 mt-6">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full shadow-md">
            Join as Student
          </button>
          <button className="bg-white text-orange-500 hover:bg-gray-100 px-6 py-3 rounded-full shadow-md">
            Find a Tutor
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:block hidden lg:w-3/4 mt-10 ">
          <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-lg">
            <input
              type="text"
              placeholder="Trusted by over 15K Users worldwide since 2024"
              className="flex-grow outline-none text-gray-600 placeholder-gray-400 px-4 py-2"
            />
            <select className="bg-gray-100 rounded-full px-4 py-2 text-gray-600 outline-none mx-2">
              <option>Category</option>
              <option>Programming</option>
              <option>Design</option>
              <option>Marketing</option>
            </select>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full shadow-md">
              <span className="hidden sm:inline">Search</span>
              <span className="sm:hidden">→</span>
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="relative max-w-6xl mx-auto mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">3K</h2>
            <p className="text-gray-300">Online Classes</p>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">72+</h2>
            <p className="text-gray-300">Expert Tutors</p>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">2K+</h2>
            <p className="text-gray-300">Certified Courses</p>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">21K+</h2>
            <p className="text-gray-300">Online Students</p>
          </div>
        </div>
      </div>
    </div>
  );
}
