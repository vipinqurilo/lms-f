import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { LiaAngleDownSolid } from "react-icons/lia";
import SubjectSelection from "./SubjectSelection";
import SubjectFilterDropdown from "./SubjectFilterDropdown";
import PriceFilterDropdown from "./PriceFilterDropdown";
import TimeFilterDropdown from "./TimeFilterDropdown";
import SortBy from "./SortBy";
import GenderSelector from "./GenderSelector";
import { useSelector } from "react-redux";

const TutorFilter = ({ handleApplySubjects, search, setSearch, selectedSubjects, setSelectedSubjects, disabled }) => {
  const [filterOpened, setfilterOpened] = useState("");
  const { timeRanges } = useSelector((state) => state.ui);
  const {gender, sortByRating, minPrice, maxPrice}=useSelector((state)=>state.tutors);
  // Add useEffect to handle body scroll
  useEffect(() => {
    if (filterOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [filterOpened]);

  const hancleSubjectClick = () => {
    if (filterOpened === "subject") {
      setfilterOpened("");
    } else {
      setfilterOpened("subject");
    }
  };
  const handlePriceClick = () => {
    if (filterOpened === "price") {
      setfilterOpened("");
    } else {
      setfilterOpened("price");
    }
  };
  const handleAvailabilityClick = () => {
    if (filterOpened === "availability") {
      setfilterOpened("");
    } else {
      setfilterOpened("availability");
    }
  };
  const toggleMoreFilters = () => {
    if (filterOpened === "more") {
      setfilterOpened("");
    } else {
      setfilterOpened("more");
    }
  };
  const handleSortBy = () => {
    if (filterOpened === "sort") {
      setfilterOpened("");
    } else {
      setfilterOpened("sort");
    }
  };
  const handleGenderSet = () => {
    if (filterOpened === "gender") {
      setfilterOpened("");
    } else {
      setfilterOpened("gender");
    }
  };
  const handleClickOutside = () => {
    setfilterOpened("");
  };

  return (
    <div className="p-4 bg-[#F2F2F2] flex flex-col px-20 justify-center items-center">
      {(filterOpened === "subject" ||
        filterOpened === "price" ||
        filterOpened === "availability" ||
        filterOpened === "more" ||
        filterOpened === "sort" ||
        filterOpened === "gender") && (
        <div
          onClick={() => handleClickOutside()}
          className="w-screen h-screen absolute inset-0 bg-black bg-opacity-50 z-10"
        ></div>
      )}
      {/* Top Section */}
      <div
        className={`hidden lg:flex items-center w-full divide-x-2 relative ${
          filterOpened === "subject" ||
          filterOpened === "price" ||
          filterOpened === "availability"
            ? "z-20"
            : ""
        } ${disabled ? "opacity-60 pointer-events-none" : ""}`}
      >
        <div className="flex flex-col cursor-pointer justify-center px-4 py-2 w-full md:w-1/4 h-[72px] rounded-l-lg bg-white">
          <div className="text-[13px] leading-3 text-[#a6a6a6]">Search</div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="By tutor name"
            className="text-black placeholder:text-black text-[16px] outline-none"
            disabled={disabled}
          />
        </div>
        <div
          onClick={() => !disabled && hancleSubjectClick()}
          className={`flex relative flex-col cursor-pointer text-[16px] justify-center px-4 py-2 w-full md:w-1/4 h-[72px] bg-white ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <div className="text-[13px] leading-3 text-[#a6a6a6]">
            Teach subject
          </div>
          <div className="flex justify-between items-center">
            All Subjects
            <LiaAngleDownSolid />
          </div>
          {!disabled && filterOpened === "subject" && <SubjectFilterDropdown setfilterOpened={setfilterOpened} selectedSubjects={selectedSubjects} setSelectedSubjects={setSelectedSubjects} handleApplySubjects={handleApplySubjects} />}
        </div>
        <div
          onClick={() => !disabled && handlePriceClick()}
          className={`flex relative flex-col cursor-pointer text-[16px] justify-center px-4 py-2 w-full md:w-1/4 h-[72px] bg-white ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <div className="text-[13px] leading-3 text-[#a6a6a6]">Price</div>
          <div className="flex justify-between items-center">
            {minPrice} - {maxPrice}
            <LiaAngleDownSolid />
          </div>
          {!disabled && filterOpened === "price" && <PriceFilterDropdown onClose={() => setfilterOpened("")}/>}
        </div>
        <div
          onClick={() => !disabled && handleAvailabilityClick()}
          className={`flex relative flex-col cursor-pointer text-[16px] justify-center rounded-r-lg px-4 py-2 w-full md:w-1/4 h-[72px] bg-white ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <div className="text-[13px] leading-3 text-[#a6a6a6]">
            Availability
          </div>
          <div className="flex justify-between items-center">
            {timeRanges
              ? timeRanges.length > 3
                ? `${timeRanges[0]}, ${timeRanges[1]}, ${timeRanges[2]}...`
                : timeRanges.join(", ")
              : "Select timing"}
            <LiaAngleDownSolid />
          </div>
          {!disabled && filterOpened === "availability" && (
            <TimeFilterDropdown onClose={() => setfilterOpened("")} />
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className={`flex text-nowrap flex-wrap items-center gap-4 mt-4 justify-end w-full ${disabled ? "opacity-60 pointer-events-none" : ""}`}>
        <div
          onClick={() => !disabled && handleGenderSet()}
          className={`flex relative flex-col cursor-pointer text-sm min-w-[174px] text-[16px] justify-center px-4 py-2 h-[40px] rounded-lg bg-white ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <div className="flex justify-between items-center gap-4">
            <span className="">
              <span className="font-semibold">Gender:</span> {gender}
            </span>
            <LiaAngleDownSolid />
          </div>
          {!disabled && filterOpened === "gender" && (
            <GenderSelector />
          )}
        </div>

        <div
          onClick={() => !disabled && handleSortBy()}
          className={`flex relative flex-col cursor-pointer text-sm min-w-[174px] text-[16px] justify-center px-4 py-2 h-[40px] rounded-lg bg-white ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <div className="flex justify-between items-center gap-4">
            <span className="capitalize">
              <span className="font-semibold">Sort by :</span> {sortByRating}
            </span>
            <LiaAngleDownSolid />
          </div>
          {!disabled && filterOpened === "sort" && (
            <SortBy onClose={() => setfilterOpened("")} />
          )}
        </div>
      </div>
    </div>
  );
};
export default TutorFilter;
