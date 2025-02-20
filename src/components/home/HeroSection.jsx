import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function HeroSection() {
  const categories = useSelector((state) => state.courses?.categories);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?._id);
  const router = useRouter();

  const handleSearch = () => {
    const query = new URLSearchParams({
      // search: searchText,
      category: selectedCategory,
    }).toString();

    router.push(`/courses?${query}`);
  };

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

  return (
    <div
      id="HeroBg"
      className="relative  md:bg-cover bg-contain md:h-[80vh] bg-no-repeat bg-center text-black py-20 px-6"
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

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
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full shadow-md">
            Find a Course
          </button>
          <button className="bg-white text-orange-500 hover:bg-gray-100 px-6 py-2 rounded-full shadow-md">
            Find a Tutor
          </button>
        </div>

        <div className="md:relative absolute   lg:w-2/3 md:mt-10  -bottom-24 md:-bottom-0  md:py-8 ">
          <div className="flex items-center bg-white rounded-full px-4 md:py-3 shadow-lg">
            <IoSearchSharp className="text-2xl" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Trusted by over 15K Users worldwide since 2024"
              className="flex-grow outline-none text-gray-600 placeholder-gray-400 px-4 py-2"
            />
            <select
              value={selectedCategory}
              onClick={(e) => setSelectedCategory(e.target.value)}
              className="bg-orange-100 rounded-full md:px-4 md:py-2.5 py-1 text-xs text-center text-black outline-none mx-2"
            >
              <option disabled>Category</option>
              {categories?.map((category) => (
                <option value={category?._id}>{category?.name}</option>
              ))}
            </select>
            <button
              onClick={handleSearch}
              className="bg-orange-500 hover:bg-orange-600 text-white  md:p-3 p-1 rounded-full shadow-md"
            >
              <span className=" sm:inline">
                <FaArrowRight className="" />
              </span>
            </button>
          </div>
        </div>

        <div className="absolute -bottom-40 mt-12 hidden md:grid gr id-cols-2 sm:grid-cols-4 md:gap-20 gap-4">
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
