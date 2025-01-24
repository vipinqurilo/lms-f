import React from "react";
import Image from "next/image";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function Mentor() {
  return (
    <div className="flex flex-col md:flex-row items-start bg-gradient-to-r from-white via-pink-50 to-blue-50 py-10 px-6 md:px-16">
      {/* Left Section - Image */}
      <div className="flex-shrink-0 md:w-1/2 mb-6 md:mb-0">
        <img
          src={`https://dreamslms.dreamstechnologies.com/html/assets/img/share.png`}
          alt="Mentor Illustration"
          className="w-full h-auto"
        />
      </div>

      {/* Right Section - Content */}
      <div className="md:w-1/2 text-center md:text-left md:mt-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Want to share your knowledge? <br /> Join us as a Mentor
        </h2>
        <p className="text-gray-600 mb-6 text-xl">
          High-definition video is video of higher resolution and quality than
          standard-definition. While there is no standardized meaning for
          high-definition, generally any video.
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-center text-xl text-black font-bold">
            <span className="text-[#f66962] text-2xl mr-2 ">
              <IoIosCheckmarkCircle />
            </span>{" "}
            Best Courses
          </li>
          <li className="flex items-center text-xl text-black font-bold">
            <span className="text-[#f66962] text-2xl mr-2">
              <IoIosCheckmarkCircle />
            </span>{" "}
            Top rated Instructors
          </li>
        </ul>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg">
          Read More
        </button>
      </div>
    </div>
  );
}
