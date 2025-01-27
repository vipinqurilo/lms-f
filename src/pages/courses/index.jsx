import React from "react";
import { AiOutlineAppstore } from "react-icons/ai"; // Import React Icon
import Pagination from "../../components/courses/Pagination";
import Ok from "../../components/courses/ok";
import CourseCards from "../../components/courses/CourseCards";

const Courses = () => {
  return (
    <div className="p-6 bg-gray-100 flex justify-center   ">
      <div className="      ">
      <div className="lg:flex lg:justify-around items-center mb-6 px-3 mt-9 lg:px-16 ">
  {/* Icon and Results Text */}
  <div className="flex items-center space-x-2   w-full md:w-auto mb-4 lg:mb-0">
    <div className="bg-[#FF6575] w-10 h-10 rounded flex justify-center items-center">
      <AiOutlineAppstore className="text-2xl text-white font-bold" />
    </div>
    <h2 className="text-lg font-semibold">Showing 1-9 of 50 results</h2>
  </div>

  {/* Search and Dropdown */}
  <div className="flex flex-col sm:flex-row  lg:space-x-4 w-full lg:w-auto space-y-2 sm:space-y-0 lg:ml-20">
    <input
      type="text"
      placeholder="Search our courses"
      className="border rounded-lg px-4 py-2 w-full sm:w-52"
    />
    <div className="w-full sm:w-56 flex justify-center  ">
      <select className="border rounded-lg px-4 w-full py-2 mt-2">
        <option>Newly published</option>
        <option>Most popular</option>
      </select>
    </div>
  </div>

  {/* Filter Section */}
  <div className="hidden lg:flex bg-white w-72 h-10 justify-between items-center px-4 border border-gray-300 rounded-md">
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

  {/* Responsive Filter Button */}
  {/* <div className="lg:hidden bg-white w-full h-10 flex justify-between items-center px-4 border border-gray-300 rounded-md mt-4">
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
  </div> */}
</div>


        <div className="  flex justify-center ">
          <CourseCards />
        </div>
         
      </div>
    </div>
  );
};

export default Courses;
