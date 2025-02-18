import React, { useState } from "react";
import FeaturedCard from "@/components/common/FeaturedCard";
import Heading from "@/components/common/Heading";
import { useSelector } from "react-redux";
import Loader from "@/components/common/Loader";

export default function FeaturedCourses({ cardData = [] }) {
  const isLoading = useSelector(
    (state) => state.courses.isLoading.fetchCoursesAsync
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(cardData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = cardData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className="bg-no-repeat h-full md:px-20 px-4 "
          style={{
            backgroundImage: `url('https://dreamslms.dreamstechnologies.com/html/assets/img/banner.png')`,
          }}
        >
          <div className="md:py-20">
            <div data-aos="fade-up" className="pt-8">
              <p className="text-xl font-bold text-orange-600">What's New</p>
            </div>
            <div data-aos="fade-up" className="flex justify-between md:mt-4">
              <Heading
                heading={"Featured Courses"}
                position={"text-left"}
                desc={` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean
        accumsan bibendum gravida maecenas augue elementum et neque. Suspendisse
        imperdiet.`}
                descWidth={"md:!w-2/3"}
              />
              <div className="md:block hidden">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md shadow-md">
                  All Courses
                </button>
              </div>
            </div>

            {/* Render Paginated Courses */}
            <div
              data-aos="fade-up"
              className="grid md:grid-cols-3 grid-cols-1 gap-2 lg:gap-10 md:mt-8"
            >
              {currentCourses.length > 0 ? (
                currentCourses.map((card, index) => (
                  <FeaturedCard data={card} key={index} />
                ))
              ) : (
                <p className="text-center col-span-3">No courses available</p>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
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
            )}
          </div>
        </div>
      )}
    </>
  );
}
