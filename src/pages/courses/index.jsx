import React, { useEffect, useState } from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  fetchCategories,
  fetchCoursesAsync,
} from "@/store/slices/coursesSlice";
import FeaturedCard from "@/components/common/FeaturedCard";
import Loader from "@/components/common/Loader";

const Courses = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const query = router.query;

  const courses = useSelector((state) => state?.courses?.courses || []);
  const categories = useSelector((state) => state?.courses?.categories || []);
  const isLoading = useSelector(
    (state) => state?.courses.isLoading.fetchCoursesAsync
  );

  const [currentPage, setCurrentPage] = useState(parseInt(query.page) || 1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const category = query.category || "";
    dispatch(fetchCoursesAsync(category !== "all" ? category : ""));
  }, [dispatch, query.category]);

  useEffect(() => {
    if (query.page) {
      setCurrentPage(parseInt(query.page));
    }
  }, [query.page]);

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    router.push(
      { query: { ...query, category: newCategory, page: 1 } },
      undefined,
      { shallow: true }
    );
  };

  const paginate = (pageNumber) => {
    router.push({ query: { ...query, page: pageNumber } }, undefined, {
      shallow: true,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center h-screen w-full items-center">
        <Loader isBig={true} />
      </div>
    );
  }

  return (
    <div className="lg:p-5 bg-gray-100 md:px-20 flex flex-wrap justify-center custom-margin-top">
      <div className="gap-6 flex mt-9 w-full">
        <div className="w-full p-4 md:px-20">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-[#FF6575] w-10 h-10 rounded flex justify-center items-center">
                <AiOutlineAppstore className="text-2xl text-white font-bold" />
              </div>
              <h2 className="text-lg font-semibold">
                Showing {indexOfFirstItem + 1}-{" "}
                {Math.min(indexOfLastItem, courses.length)} of {courses.length}{" "}
                results
              </h2>
            </div>

            <div className="flex items-center lg:space-x-4 lg:w-auto w-full flex-wrap lg:mt-5 mt-3">
              <select
                className="border bg-white rounded-lg lg:px-4 lg:py-2 px-3 py-2 w-full sm:w-52 lg:mt-auto mt-3"
                value={query.category || "all"}
                onChange={handleCategoryChange}
              >
                <option value="all">ALL</option>
                {categories.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                    className="text-black"
                  >
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-6">
            {currentCourses.length > 0 ? (
              currentCourses.map((course, index) => (
                <FeaturedCard data={course} key={index} />
              ))
            ) : (
              <p>No courses found</p>
            )}
          </div>

          <div className="mt-8 flex justify-center items-center space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
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
              onClick={() => paginate(currentPage + 1)}
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
