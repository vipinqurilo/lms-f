"use client";

import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

export default function HeroSection() {
  const categories = useSelector((state) => state.courses?.categories);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?._id);

  const [selectedOption, setselectedOption] = useState("course");

  const router = useRouter();

  // const handleSearch = () => {
  //   const query = new URLSearchParams({
  //     category: selectedCategory,
  //   }).toString();

  //   router.push(`/courses?${query}`);
  // };

  const data = {
    box: [
      {
        id: 1,
        img: `/assets/home/first_icon.png`,
        heading: "3K",
        desc: "Online Classes",
      },
      {
        id: 2,
        img: `/assets/home/second_icon.png`,
        heading: "72+",
        desc: "Expert Tutors",
      },
      {
        id: 3,
        img: `/assets/home/third_icon.png`,
        heading: "2k+",
        desc: "Certified Courses",
      },
      {
        id: 4,
        img: `/assets/home/fourth_icon.png`,
        heading: "21k",
        desc: "Online Students",
      },
    ],
  };

  const getButtonCss = (value) =>
    `${
      selectedOption === value
        ? "bg-orange-500 hover:bg-orange-600 text-white"
        : "bg-white text-orange-500 hover:bg-gray-100"
    } px-6 py-2 rounded-full shadow-md transition-all ease-in-out duration-300`;

  const { courses } = useSelector((state) => state.courses);
  const { allTutorProfile: tutors } = useSelector((state) => state.tutors);

  const [filteredResults, setFilteredResults] = useState([]);
  const [debounceSearch, setDebounceSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(searchText);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    if (!debounceSearch) {
      setFilteredResults([]);
      return;
    }

    let results = [];
    if (selectedOption === "course") {
      results = courses?.filter((course) =>
        course?.courseTitle
          ?.toLowerCase()
          ?.includes(debounceSearch?.toLowerCase())
      );
    } else {
      results = tutors?.filter((tutor) =>
        `${tutor?.user?.firstName} ${tutor?.user?.lastName}`
          ?.toLowerCase()
          ?.includes(debounceSearch?.toLowerCase())
      );
    }

    setFilteredResults(results);
  }, [debounceSearch, courses, tutors, selectedOption]);

  const handleSearch = () => {
    router.push(`/search?query=${searchText}&type=${selectedOption}`);
  };

  console.log("filteredResults", filteredResults);

  return (
    <div
      id="HeroBg"
      className="relative  md:bg-cover bg-contain md:h-[80vh] bg-no-repeat bg-center text-black py-20 px-6"
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div
        data-aos="fade-up"
        className="relative max-w-6xl mx-auto flex flex-col items-center text-center"
      >
        <h3 className="md:text-xl text-base font-semibold border-b-2 text-white mb-4">
          Trusted by over 15K Users worldwide since 2024
        </h3>
        <h1 className="text-2xl lg:text-5xl md:mx-40 font-bold mt-4 text-white leading-tight md:mt-2 mb-6">
          Unlock Knowledge,{" "}
          <span className="text-orange-500">Elevate Your </span>Future, Achieve
          Success
        </h1>
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setselectedOption("course")}
            className={getButtonCss("course")}
          >
            Find a Course
          </button>
          <button
            onClick={() => setselectedOption("tutor")}
            className={getButtonCss("tutor")}
          >
            Find a Tutor
          </button>
        </div>

        <div className="md:relative absolute   lg:w-2/3 md:mt-10  -bottom-24 md:-bottom-0  md:py-8 ">
          <div
            className={`flex items-center bg-white rounded-full px-4 md:py-3 shadow-lg ${
              (filteredResults?.length > 0 ||
                (debounceSearch !== "" && filteredResults?.length === 0)) &&
              "!rounded-xl !rounded-b-none"
            }`}
          >
            <div className="bg-blue-50 p-2 rounded-full text-background">
              <IoSearchSharp size={20} />
            </div>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder={
                selectedOption === "course"
                  ? "Search By Course Name"
                  : "Search By Tutor Name"
              }
              className="flex-grow outline-none text-gray-600 placeholder-gray-400 px-4 py-2"
            />
            {/* <select
              value={selectedCategory}
              onClick={(e) => setSelectedCategory(e.target.value)}
              className="bg-orange-100 rounded-full md:px-4 md:py-2.5 py-1 text-xs text-center text-black outline-none mx-2"
            >
              <option disabled>Category</option>
              {categories?.map((category) => (
                <option value={category?._id}>{category?.name}</option>
              ))}
            </select> */}
            <button
              // onClick={handleSearch}
              className="bg-orange-500 hover:bg-orange-600 text-white  md:p-3 p-1 rounded-full shadow-md"
            >
              <span className=" sm:inline">
                <FaArrowRight className="" />
              </span>
            </button>
          </div>
          <div className="absolute top-full -mt-5 lg:-mt-8 z-[20] lg:w-full shadow-xl rounded-b-lg">
            {debounceSearch !== "" && filteredResults?.length === 0 && (
              <div className="w-full rounded-b-xl bg-white flex items-center justify-start gap-2 px-4 pb-4">
                No Results Found
              </div>
            )}
            {filteredResults?.length > 0 && (
              <div className="w-full rounded-b-xl bg-white flex flex-col items-start justify-start gap-2 px-4 pb-4">
                {filteredResults?.map((result, index) => (
                  <Link
                    href={
                      selectedOption === "course"
                        ? `/courses/${result?._id}`
                        : `/tutors/${result?.user?.firstName?.toLowerCase()}-${result?.user?.lastName?.toLowerCase()}`
                    }
                    className="lg:text-lg block hover:text-secondary transition-custom w-full text-start"
                    key={index}
                  >
                    {result?.courseTitle ||
                      `${result?.user?.firstName} ${result?.user?.lastName}`}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="absolute -bottom-32 !-mt-10 hidden md:grid grid-cols-4 md:gap-20 gap-4">
          {data.box.map((item) => (
            <div className="text-center shadow-md rounded-2xl w-full md:w-[280px]">
              <div className="flex items-center space-x-4 md:p-4 p-2 rounded-2xl px-8 text-left bg-white">
                <div className="bg-white rounded-md">
                  <span className="text-xl font-bold text-orange-500">
                    <img src={`${item.img}`} alt={item.desc} />
                  </span>
                </div>
                <div>
                  <p className="text-xl font-bold text-black">{item.heading}</p>
                  <p className="text-xs  text-black font-bold">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
