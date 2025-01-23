import React from "react";
import { FaRegHeart } from "react-icons/fa";

export default function FeaturedCard() {
  return (
    <div className="flex gap-6 p-6 bg-gradient-to-r from-pink-50 to-blue-50">
      <div className="w-96 group cursor-pointer hover:bg-[#413655] transition-colors duration-300 rounded-lg shadow-lg p-4 overflow-hidden relative">
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-md">
          <img
            src="https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-01.jpg"
            alt="UX/UI Design"
            className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-110"
          />
        </div>
        {/* Content Section */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            {/* Instructor Image */}
            <div className="flex">
              <img
                src="https://dreamslms.dreamstechnologies.com/html/assets/img/user/user1.jpg"
                alt="Instructor"
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <h3 className="text-lg font-semibold group-hover:text-white">
                  Nicole Brown
                </h3>
                <span className="text-sm group-hover:text-white font-medium text-gray-500">
                  Instructor
                </span>
              </div>
            </div>

            <div>
              <button className="  text-red-500 group-hover:text-white">
                <FaRegHeart className="text-xl" />
              </button>
            </div>
          </div>
          <p className="mt-2 text-xl group-hover:text-white text-gray-700">
            Information About UI/UX Design Degree
          </p>
          <div className="flex items-center justify-between gap-4 mt-4">
            <span className="text-sm text-gray-600 group-hover:text-white">
              📚 12+ Lesson
            </span>
            <span className="text-sm text-gray-600 group-hover:text-white">
              ⏱ 9hr 30min
            </span>
          </div>

          <div className="flex items-center justify-between mt-6 border-t pt-6 border-gray-300">
            <div className="flex items-center">
              {/* Rating */}
              <span className="flex text-yellow-500 ">⭐⭐⭐⭐</span>
              <span className="ml-1 text-sm text-gray-500 group-hover:text-white">
                {" "}
                <span>4.</span> (15)
              </span>
            </div>
            <button className="px-8 py-2 text-[#413655] bg-white group-hover:bg-[#413655] group-hover:text-white rounded-full border-2 border-[#917cf6] hover:bg-[#917cf6] ">
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
