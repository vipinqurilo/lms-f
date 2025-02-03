import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { fetchCoursesByCategory, fetchCourses } from "@/store/slices/coursesSlice";
import { useDispatch, useSelector } from "react-redux";

const FeaturedCard = ({ categoryId }) => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);

  // This state can track if we're fetching all courses or filtered ones
  const [filterApplied, setFilterApplied] = useState(false);

  useEffect(() => {
    if (categoryId) {
      // Fetch courses by category if categoryId is present
      dispatch(fetchCoursesByCategory(categoryId));
      setFilterApplied(true); // Filter applied
    } else {
      // Otherwise, fetch all courses
      dispatch(fetchCourses());
      setFilterApplied(false); // No filter
    }
  }, [categoryId, dispatch]);

  return (
    <div className="flex">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          courses.map((data, index) => (
            <div
              key={index}
              className="w-full group bg-white cursor-pointer hover:bg-[#413655] transition-colors duration-300 rounded-xl shadow-lg p-4 overflow-hidden relative"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden rounded-md lg:h-auto">
                <img
                  src={data.courseImage || "/default-image.jpg"}
                  alt={data.courseContent && data.courseContent[0] ? data.courseContent[0].title : "Course Image"}
                  className="w-full lg:h-48 object-cover transform transition-transform duration-300 hover:scale-110"
                />
              </div>

              {/* Content Section */}
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex">
                    <img
                      src={data.instructorImage}
                      alt="Instructor"
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <h3 className="text-lg font-semibold group-hover:text-gray-300">
                        {data.courseContent && data.courseContent[0] ? data.courseContent[0].title : "No Course Title"}
                      </h3>
                      <span className="text-sm group-hover:text-gray-300 font-medium text-gray-500">
                        {data.courseContent && data.courseContent[0] ? data.courseContent[0].description : "No Description"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <button className="text-red-500 group-hover:text-white">
                      <FaRegHeart className="text-xl" />
                    </button>
                  </div>
                </div>

                <p className="mt-2 text-xl group-hover:text-gray-300 text-gray-700">
                  {data.courseTitle}
                </p>
                <div className="flex items-center justify-between gap-4 mt-4">
                  <span className="text-sm text-gray-600 group-hover:text-white">
                    📚 {data.lessons} Lessons
                  </span>
                  <span className="text-sm text-gray-600 group-hover:text-white">
                    ⏱ {data.duration} Duration
                  </span>
                </div>

                <div className="flex items-center justify-between mt-6 border-t pt-4 border-gray-300">
                  <div className="flex items-center">
                    <span className="flex text-yellow-500 ">⭐⭐⭐⭐</span>
                    <span className="ml-1 text-sm text-gray-500 group-hover:text-white">
                      {data.rating} Rating
                    </span>
                  </div>
                </div>

                <button className="px-8 py-2 text-[#413655] bg-white mt-7 group-hover:text-gray-300 rounded-full border-2 border-[#917cf6] hover:bg-[#917cf6]">
                  BUY NOW
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedCard;
