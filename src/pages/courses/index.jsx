import React, { useEffect, useState } from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { useSelector } from "react-redux";
import FeaturedCard from "@/components/common/FeaturedCard";
import { fetchCoursesAsync } from "@/store/slices/coursesSlice";
import { useDispatch } from "react-redux";
import Loader from "@/components/common/Loader";
import PaginationComponent from "@/container/common/PaginationComponent";

const Courses = () => {
  const { courses, totalPages } = useSelector((state) => state?.courses);
  const categories = useSelector((state) => state?.category?.subSubjects || []);
  const loading = useSelector(
    (state) => state?.courses?.isLoading?.fetchCoursesAsync
  );

  const [selectedOption, setSelectedOption] = useState("");
  const [currentPage, setcurrentPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    const categoryId = selectedOption === "all" ? undefined : selectedOption;
    const requestData = {
      page: currentPage,
      limit: 6,
    };
    if (categoryId) {
      requestData.categoryId = categoryId;
    }
    dispatch(fetchCoursesAsync(requestData));
  }, [dispatch, currentPage, selectedOption]);

  return (
    <div className="custom-container !py-5 bg-white custom-margin-top">
      <div className=" flex flex-wrap justify-center font-nunito">
        <div className="gap-6 flex w-full">
          {/* Course Cards Section */}
          <div className="w-full">
            <div className="flex flex-wrap justify-between items-center mb-6">
              {/* Icon and Results Text */}
              <div className="flex items-center space-x-3">
                <div className="bg-[#FF6575] w-10 h-10 rounded flex justify-center items-center">
                  <AiOutlineAppstore className="text-2xl text-white font-bold" />
                </div>
                <h2 className="text-lg font-semibold">
                  Showing results
                  {/* Showing {indexOfFirstItem + 1}-
                {Math.min(indexOfLastItem, courses.length)} of {courses.length}{" "}
                results */}
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
                  <option value={"all"}>ALL</option>
                  {categories.map((category) => (
                    <option value={category._id} className="text-black">
                      {category?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="w-full flex items-center justify-center pb-8">
                <Loader color={"text-secondary"} isBig={true} />
              </div>
            ) : (
              <div className="mt-7 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
                {courses?.length > 0 ? (
                  courses?.map((course, index) => (
                    <FeaturedCard data={course} isFull={true} key={index} />
                  ))
                ) : (
                  <p className="text-center w-full lg:col-span-3">
                    No courses found
                  </p>
                )}
              </div>
            )}

            {/* Pagination */}
            <div className="pt-4">
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                setcurrentPage={setcurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
