import React from "react";
import { MdPeopleAlt } from "react-icons/md";
import { SlCalender } from "react-icons/sl";

export default function BlogCard({ data }) {
  // heading: "An Overworked Newspaper Editor",
  // img: "https://dreamslms.dreamstechnologies.com/html/assets/img/blog/blog-03.jpg",
  // desc: "Design",
  // date: "May 25, 2024",

  return (
    <div className="relative flex flex-col rounded-xl bg-white shadow-md">
      {/* Image Container */}
      <div className="relative flex justify-center  h-80 overflow-hidden rounded-t-xl">
        <img
          src={data?.img}
          alt="profile-picture"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Content Section */}
      <div className="p-2 text-center ">
        <h4 className=" text-xl text-black md:mx-4 font-semibold text-blue-gray-900">
          {data?.heading}
        </h4>
        <p className="text-base font-medium text-gray-700 mt-4">{data?.desc}</p>
      </div>

      {/* Students Info */}
      <div className="flex justify-center pb-4">
        <div className="flex items-center gap-x-2 text-gray-700">
          <SlCalender className="text-base space-x-4 text-red-600" />
          <p>{data?.date} Students</p>
        </div>
      </div>
    </div>
  );
}
