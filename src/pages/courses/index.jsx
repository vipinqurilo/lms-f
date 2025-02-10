import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineAppstore } from "react-icons/ai";
import Pagination from "../../components/courses/Pagination";
import CourseCards from "../../components/courses/CourseCards";
import CoursesFilter from "../../components/courses/CoursesFilter";
import CoursesFilterCards from "../../components/courses/CoursesFilterCards";
import CoursesFilterPrices from "../../components/courses/CoursesFilterPrices";
import { useSelector } from "react-redux";
import FeaturedCard from "@/components/common/FeaturedCard";

const Courses = () => {
  const courses = useSelector((state) => state?.courses?.courses || []);

  // console.log(courses, "newttt course");
  const [showFilters, setShowFilters] = useState(false);
  const [clearTrigger, setClearTrigger] = useState(false);
  const [selectedOption, setSelectedOption] = useState(""); // State for select option

  const clearFilters = () => {
    setClearTrigger((prev) => !prev);
    setSelectedOption("");
  };

  console.log("courses in main page", courses);

  return (
    <div className="lg:p-5 bg-gray-100 flex flex-wrap justify-center custom-margin-top">
      <div className="w-full lg:px-20 gap-6 flex mt-9">
        {/* Course Cards Section */}
        <div className="lg:w-9/12 w-full mx-auto p-4">
          <div className="flex flex-wrap justify-between items-center mb-6">
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
            <div className="flex items-center lg:space-x-4 lg:w-auto w-full flex-wrap lg:mt-5 mt-3">
              <input
                type="text"
                placeholder="Search our courses"
                className="border rounded-lg px-4 py-2 w-full sm:w-48"
              />
              <select
                className="border bg-white rounded-lg lg:px-4 lg:py-2  px-3  py-2 w-full sm:w-52 lg:mt-auto mt-3"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option>Newly published</option>
                <option>Most popular</option>
              </select>
            </div>
          </div>

          {/* Mobile Filter Section (Dropdown on Mobile) */}
          <div className="block lg:hidden w-full lg:mt-6  -mt-2   relative">
            <div className="flex justify-between items-center bg-white shadow lg:p-3 px-3  py-2 rounded-lg">
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
                <span className="text-sm font-medium text-gray-700">
                  Filters
                </span>
              </div>
              <button
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? "CLOSE" : "SHOW"}
              </button>
            </div>

            {/* Animated Dropdown Filter Panel */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={
                showFilters
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute left-0 w-full bg-white shadow-lg rounded-lg overflow-hidden z-50"
            >
              {/* {showFilters && <CoursesFilter />} */}
            </motion.div>
          </div>

          {/* Course Cards Section */}
          <div className="mt-7 grid grid-cols-2">
            {Array.isArray(courses) && courses.length > 0 ? (
              courses.map((course, index) => {
                console.log("Course data:", course);
                return <FeaturedCard data={course} key={index} />;
              })
            ) : (
              <p>No courses found</p>
            )}
          </div>
        </div>

        {/* Desktop Filter Section */}
        <div className="hidden lg:block lg:w-3/12 mt-9 sticky top-0 h-screen  overflow-y-auto">
          <div className="w-64 h-10 flex justify-between items-center px-1">
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
            <button
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
              onClick={clearFilters} // Trigger clear function
            >
              CLEAR
            </button>
          </div>
          {/* filter part */}
          <div className="lg:mt-7">
            {/* <CoursesFilterCards clearTrigger={clearTrigger} />
            <CoursesFilterPrices clearTrigger={clearTrigger} /> */}
          </div>
        </div>
      </div>

      <div className="w-11/12 lg:px-10">
        <Pagination />
      </div>
    </div>
  );
};

export default Courses;
