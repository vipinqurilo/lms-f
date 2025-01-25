import React from "react";
import { MdPeopleAlt } from "react-icons/md";

export default function InstructorCard() {
  return (
    <div className="relative flex w-80 flex-col rounded-xl bg-white shadow-md">
      {/* Image Container */}
      <div className="relative flex justify-center mt-4 h-80 overflow-hidden rounded-t-xl">
        <img
          src="https://dreamslms.dreamstechnologies.com/html/assets/img/user/user9.jpg"
          alt="profile-picture"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 text-center">
        <h4 className="mb-1 text-2xl font-semibold text-blue-gray-900">
          Natalie Paisley
        </h4>
        <p className="text-base font-medium text-gray-700">Web Developer</p>
      </div>

      {/* Students Info */}
      <div className="flex justify-center pb-4">
        <div className="flex items-center gap-x-2 text-gray-700">
          <MdPeopleAlt className="text-xl" />
          <p>50 Students</p>
        </div>
      </div>
    </div>
  );
}
