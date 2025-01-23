import React from "react";

export default function FeaturedCard() {
  return (
    <div className="flex gap-6 p-6 bg-gradient-to-r from-pink-50 to-blue-50">
      {/* Card 1 */}
      <div className="w-80 bg-white rounded-lg shadow-lg p-4">
        <img
          src="https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-01.jpg" // Replace with the actual image URL
          alt="UX/UI Design"
          className="rounded-md"
        />
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Nicole Brown</h3>
            <span className="text-sm font-medium text-gray-500">
              Instructor
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-700">
            Information About UI/UX Design Degree
          </p>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-sm text-gray-600">📚 12+ Lesson</span>
            <span className="text-sm text-gray-600">⏱ 9hr 30min</span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>
              <span className="text-xl font-semibold text-red-500">$300</span>
              <span className="ml-2 text-sm line-through text-gray-400">
                $99.00
              </span>
            </div>
            <button className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600">
              Buy Now
            </button>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <span className="text-yellow-500">⭐⭐⭐⭐</span>
              <span className="ml-1 text-sm text-gray-500">(15)</span>
            </div>
            <button className="text-gray-500 hover:text-red-500">❤️</button>
          </div>
        </div>
      </div>
    </div>
  );
}
