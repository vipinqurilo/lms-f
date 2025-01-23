import Image from "next/image";
import React, { useState } from "react";
const TutorFilter = () => {
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);
  // State for toggles
  const [isActive, setIsActive] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const toggleMoreFilters = () => {
    setMoreFiltersOpen(!moreFiltersOpen);
  };
  return (
    <div className="p-4 bg-[#F2F2F2]  flex flex-col justify-center items-center">
      {/* Top Section */}
      <div className="flex items-center w-[80%] divide-x-2 ">
        <div className="flex flex-col justify-center px-4 py-2 w-full md:w-1/5 h-[72px] rounded-l-lg bg-white   ">
          <div className="text-[13px] leading-3 text-[#a6a6a6]">Search</div>
          <input
            type="text"
            placeholder="By tutor name"
            className="text-black placeholder:text-black text-[16px] outline-none"
          />
        </div>
        <div className="flex flex-col justify-center px-4 py-2 w-full md:w-1/5 h-[72px]  bg-white   ">
          <div className="text-[13px] leading-3 text-[#a6a6a6]">Search</div>
          All Subjects
        </div>

        <select className="  px-4 py-2 w-full md:w-1/5 h-[72px]">
          <option value="all">All Prices</option>
        </select>
        <select className="  px-4 py-2 w-full md:w-1/5 h-[72px]">
          <option value="select">Select Timing</option>
        </select>
        <div className="bg-white flex justify-center items-center  text-[#f89c03]   px-2 md:w-[15%] py-3 h-[72px] rounded-r-lg ">
          <button
            className="bg-[#FEF5E5] rounded-lg  px-6 py-2"
            onClick={toggleMoreFilters}
          >
            {/* <Image
              className="object-cover"
              width={16}
              height={16}
              alt="filter"
              src={"/assets/icons/filter.svg"}
            /> */}
            More Filters
          </button>
        </div>
      </div>
      {moreFiltersOpen && (
        <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-white">
          <p>Additional filter options go here...</p>
        </div>
      )}
      {/* Bottom Section */}
      <div className="flex flex-wrap items-center gap-4 mt-4">
        {/* Active Tutors Toggle */}
        <div className="flex items-center gap-2 bg-white rounded px-4 h-[40px]">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
          <span className="text-sm">Active Tutors</span>
        </div>
        {/* Offline Sessions Toggle */}
        <div className="flex items-center gap-2 bg-white rounded px-4 h-[40px]">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isOffline}
              onChange={() => setIsOffline(!isOffline)}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
          <span className="text-sm">Offline Sessions</span>
        </div>
        {/* Featured Toggle */}
        <div className="flex items-center gap-2 bg-white rounded px-4 h-[40px]">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isFeatured}
              onChange={() => setIsFeatured(!isFeatured)}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
          <span className="text-sm">Featured</span>
        </div>
        {/* Sort Dropdown */}
        <select className="border border-gray-300 rounded-lg px-4 py-2">
          <option value="popularity">Sort: By popularity</option>
        </select>
      </div>
    </div>
  );
};
export default TutorFilter;
