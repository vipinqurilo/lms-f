import React, { useState } from "react";
import { Search } from "lucide-react";
import { IoMdOptions } from "react-icons/io";

const TeacherFilter = ({ onApplyFilters, searchTerm, setSearchTerm }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);

  const isFilterApplied = startDate || endDate;

  const handleApplyFilters = () => {
    const filters = {};
    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;
    if (searchTerm) filters.search = searchTerm;

    if (typeof onApplyFilters === "function") {
      onApplyFilters(filters);
    } else {
      console.error("onApplyFilters is not a function");
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    if (typeof onApplyFilters === "function") {
      onApplyFilters({});
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 py-4">
      <div className="w-full relative flex">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4" />
        <input
          type="text"
          placeholder="Search"
          className="pl-10 pr-4 py-1 h-10 border rounded-full w-6/12 focus:border-gray-500 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="ml-3">
          <button
            className="border px-4 py-1 h-10 bg-white flex justify-center items-center gap-2 text-sm rounded-full text-gray-500"
            onClick={() => setFiltersVisible(!filtersVisible)}
          >
            More Filters <IoMdOptions />
          </button>
        </div>
      </div>

      {filtersVisible && (
        <div className="flex justify-between w-full">
          <div className="flex w-10/12 space-x-1 items-center flex-wrap">
            <div className="flex items-center border rounded-full px-4 py-1 text-gray-500 text-sm w-56 bg-white h-10">
              <span className="text-xs w-24">Start Date:</span>
              <input
                type="date"
                className="bg-transparent outline-none w-full font-semibold"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="flex items-center border rounded-full px-4 py-1 text-gray-500 text-sm w-56 bg-white h-10">
              <span className="text-xs w-24">End Date:</span>
              <input
                type="date"
                className="bg-transparent outline-none w-full font-semibold"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-center items-center">
            {isFilterApplied && (
              <button
                className="border py-1 w-28 h-10 rounded-full bg-[#f6f6f6] hover:bg-gray-300 text-sm"
                onClick={handleClearFilters}
              >
                Clear Filters
              </button>
            )}

            <button
              className="border py-1 w-28 h-10 rounded-full bg-black text-white hover:bg-[#4f4f4f] text-sm hover:text-white"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherFilter;
