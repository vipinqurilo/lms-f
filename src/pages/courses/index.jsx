import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineAppstore } from "react-icons/ai";
import { useSelector } from "react-redux";
import FeaturedCard from "@/components/common/FeaturedCard";
import { fetchCategories } from "@/store/slices/coursesSlice";
import { useDispatch } from "react-redux";

const Courses = () => {
  const courses = useSelector((state) => state?.courses?.courses || []);
  const categories = useSelector((state) => state?.courses?.categories || []);

  console.log(categories, "kd categories");

  const [showFilters, setShowFilters] = useState(false);
  const [clearTrigger, setClearTrigger] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="lg:p-5 bg-gray-100 md:px-20 flex flex-wrap justify-center custom-margin-top">
      <div className="gap-6 flex mt-9 w-full">
        {/* Course Cards Section */}
        <div className="w-full p-4 md:px-20">
          <div className="flex flex-wrap justify-between items-center mb-6">
            {/* Icon and Results Text */}
            <div className="flex items-center space-x-3">
              <div className="bg-[#FF6575] w-10 h-10 rounded flex justify-center items-center">
                <AiOutlineAppstore className="text-2xl text-white font-bold" />
              </div>
              <h2 className="text-lg font-semibold">
                Showing {indexOfFirstItem + 1}-
                {Math.min(indexOfLastItem, courses.length)} of {courses.length}{" "}
                results
              </h2>
            </div>

            {/* Search and Dropdown */}
            <div className="flex items-center lg:space-x-4 lg:w-auto w-full flex-wrap lg:mt-5 mt-3">
              {/* <input
                type="text"
                placeholder="Search our courses"
                className="border rounded-lg px-4 py-2 w-full sm:w-48"
              /> */}
              <select
                className="border bg-white rounded-lg lg:px-4 lg:py-2 px-3 py-2 w-full sm:w-52 lg:mt-auto mt-3"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                {categories.map((category) => (
                  <option className="text-black">{category?.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Course Cards Section */}
          <div className="mt-7 grid grid-cols-3 gap-6 ">
            {currentCourses.length > 0 ? (
              currentCourses.map((course, index) => (
                <FeaturedCard data={course} key={index} />
              ))
            ) : (
              <p>No courses found</p>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
