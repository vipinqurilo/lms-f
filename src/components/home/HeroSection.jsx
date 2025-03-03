"use client";

import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { VscWorkspaceTrusted } from "react-icons/vsc";

export default function HeroSection() {
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setselectedOption] = useState("course");
  const router = useRouter();

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
      results = courses?.filter(
        (course) =>
          course?.courseTitle
            ?.toLowerCase()
            ?.includes(debounceSearch?.toLowerCase()) ||
          course?.courseSubCategory?.name
            ?.toLowerCase()
            ?.includes(debounceSearch?.toLowerCase())
      );
    } else {
      results = tutors?.filter(
        (tutor) =>
          `${tutor?.user?.firstName} ${tutor?.user?.lastName}`
            ?.toLowerCase()
            ?.includes(debounceSearch?.toLowerCase()) ||
          tutor?.subjectsTaught?.filter((subject) =>
            subject?.name
              ?.toLowerCase()
              ?.includes(debounceSearch?.toLowerCase())
          )
      );
    }

    setFilteredResults(results);
  }, [debounceSearch, courses, tutors, selectedOption]);

  const handleSearch = () => {
    router.push(`/search?query=${searchText}&type=${selectedOption}`);
  };

  return (
    <div
      id="HeroBg"
      className="relative  md:bg-cover bg-cover min-h-[60vh]  lg:min-h-[80vh] bg-no-repeat bg-center text-black py-20"
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div
        data-aos="fade-up"
        className="relative max-w-5xl mx-auto flex flex-col items-center text-center"
      >
        <div className="flex items-start gap-2">
          <div className="w-10 md:w-7 h-8 md:h-7 lg:w-7 lg:h-7 flex items-center justify-center lg:text-base text-white bg-green-600 rounded md:text-lg">
            <VscWorkspaceTrusted />
          </div>
          <h3 className="md:text-xl text-base md:text-nowrap lg:font-semibold border-b text-white mb-4">
            Trusted by over 15K Users worldwide since 2024
          </h3>
        </div>
        <h1 className="text-2xl lg:text-5xl  font-bold pt-4 text-white leading-tight md:pt-2 pb-6">
          Unlock Knowledge,{" "}
          <span className="text-orange-500">Elevate Your </span>Future, Achieve
          Success
        </h1>
        <div className="flex gap-4 pt-6">
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
            className={`flex items-center bg-white rounded-full px-4 py-3 shadow-lg ${
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
            <button
              // onClick={handleSearch}
              className="bg-orange-500 hover:bg-orange-600 text-white  md:p-3 p-1 rounded-full shadow-md"
            >
              <span className=" sm:inline">
                <FaArrowRight className="" />
              </span>
            </button>
          </div>
          <div className="absolute top-full mt-0 lg:-mt-8 z-[20] w-full shadow-xl rounded-b-lg">
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
                    className="lg:text-lg hover:text-secondary transition-custom w-full text-start flex items-center gap-2"
                    key={index}
                  >
                    {selectedOption === "course" && (
                      <div className="!w-10 h-10 rounded-full relative flex-shrink-0">
                        <Image
                          src={result?.courseImage}
                          alt={result?.courseTitle}
                          fill={true}
                          className="rounded-full object-center object-cover"
                        />
                      </div>
                    )}
                    <p className="text-wrap">
                      {result?.courseTitle ||
                        `${result?.user?.firstName} ${result?.user?.lastName}`}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute hidden -bottom-10 lg:grid grid-cols-4 md:gap-16 gap-4 w-full px-20">
        {data.box.map((item) => (
          <div className="text-center shadow-md rounded-2xl w-full">
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
  );
}
