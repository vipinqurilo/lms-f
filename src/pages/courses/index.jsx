import React from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import Pagination from "../../components/courses/Pagination";
import CourseCards from "../../components/courses/CourseCards";
import Ok from "../../components/courses/CoursesFilter";
import CoursesFilter from "../../components/courses/CoursesFilter";

const Courses = () => {
  return (
    <div className=" lg:p-5 bg-gray-100 flex  flex-wrap justify-center">
      <div className="w-full lg:px-20 gap-6 flex  mt-9 ">
        {/* Header Section */}  

        {/* Course Cards Section */}
        <div className="lg:w-9/12 ">
          <div className="lg:flex flex-wrap justify-between items-center mb-6       ">
            {/* Icon and Results Text */}
            <div className="flex items-center space-x-3">
              <div className="bg-[#FF6575] w-10 h-10 rounded flex justify-center items-center">
                <AiOutlineAppstore className="text-2xl text-white font-bold" />
              </div>
              <h2 className="text-lg font-semibold">
                Showing 1-9 of 50 results
              </h2>
            </div>

            {/* Search and Dropdown */}
            <div className="flex items-center space-x-4 flex-wrap">
              <input
                type="text"
                placeholder="Search our courses"
                className="border rounded-lg px-4 py-2 w-48"
              />
              <select className="border rounded-lg px-4 py-2 w-52">
                <option>Newly published</option>
                <option>Most popular</option>
              </select>
            </div>
          </div>
          <CourseCards />
        </div>
        <div className="lg:w-3/12">
          <div className="hidden lg:flex  w-64  h-10 justify-between items-center      ">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5M6.75 10.5h10.5M10.5 15.75h3"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">Filters</span>
            </div>
            <button className="text-sm font-medium text-gray-500 hover:text-gray-700">
              CLEAR
            </button>
          </div>
          <div className="hidden lg:block">
            <CoursesFilter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;

{
  /* Filter Section
          <div className="hidden lg:flex bg-white w-80 h-10 justify-between items-center px-4 border border-gray-300 rounded-md">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5M6.75 10.5h10.5M10.5 15.75h3"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">Filters</span>
            </div>
            <button className="text-sm font-medium text-gray-500 hover:text-gray-700">CLEAR</button>
          </div> */
}
