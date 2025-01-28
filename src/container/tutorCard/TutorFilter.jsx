import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { LiaAngleDownSolid } from "react-icons/lia";
import SubjectSelection from "./SubjectSelection";
import SubjectFilterDropdown from "./SubjectFilterDropdown";
import PriceFilterDropdown from "./PriceFilterDropdown";
import TimeFilterDropdown from "./TimeFilterDropdown";
import SortBy from "./SortBy";
import GenderSelector from "./GenderSelector";

const data = [
  {
    subject: "Mathematics",
    chapters: [
      "Arithmetic & Basic Math",
      "Algebra",
      "Geometry",
      "Calculus",
      "Statistics & Probability",
      "Linear Algebra",
      "Discrete Mathematics",
    ],
  },
  {
    subject: "Science",
    chapters: ["Physics", "Chemistry", "Biology", "Earth Sciences"],
  },
  {
    subject: "History",
    chapters: ["World History", "Regional History", "Philosophy"],
  },
  {
    subject: "Literature",
    chapters: [
      "English Literature",
      "World Literature",
      "Genres",
      "Literary Criticism",
    ],
  },
  {
    subject: "Social Studies",
    chapters: ["Geography", "Sociology", "Political Science", "Economics"],
  },
  {
    subject: "Foreign Languages",
    chapters: [
      "Spanish",
      "French",
      "English",
      "German",
      "Italian",
      "Portuguese",
    ],
  },
  {
    subject: "Philosophy",
    chapters: [
      "Ancient Philosophy",
      "Modern Philosophy",
      "Ethics & Moral Philosophy",
      "Political Philosophy",
      "Philosophy of Science",
    ],
  },
  {
    subject: "Art & Design",
    chapters: ["Fine Arts", "Design", "Art History", "Digital Art"],
  },
  {
    subject: "Technology & Computing",
    chapters: [
      "Computer Science",
      "Cybersecurity",
      "Artificial Intelligence",
      "Data Science",
      "Software Engineering",
      "Cloud Computing",
    ],
  },
  {
    subject: "Health & Medicine",
    chapters: [
      "Human Anatomy",
      "Physiology",
      "Medical Sciences",
      "Healthcare Professions",
      "Nutrition & Dietetics",
    ],
  },
  {
    subject: "Business & Economics",
    chapters: [
      "Accounting",
      "Marketing",
      "Business Management",
      "Entrepreneurship",
    ],
  },
  {
    subject: "Music",
    chapters: [],
  },
];

const TutorFilter = () => {
  const [isActive, setIsActive] = useState(false);
  const [gender, setGender] = useState("Any");
  const [sortBy, setSortBy] = useState("By popularity");
  const [filterOpened, setfilterOpened] = useState("");
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
    <div className="p-4 bg-[#F2F2F2] flex flex-col justify-center items-center">
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
        className={`hidden lg:flex items-center w-full px-20  divide-x-2 relative  ${
          filterOpened === "subject" ||
          filterOpened === "price" ||
          filterOpened === "availability"
            ? "z-20"
            : ""
        }`}
      >
        <div className="flex flex-col cursor-pointer justify-center px-4 py-2 w-full md:w-1/4 h-[72px] rounded-l-lg bg-white   ">
          <div className="text-[13px] leading-3 text-[#a6a6a6]">Search</div>
          <input
            type="text"
            placeholder="By tutor name"
            className="text-black placeholder:text-black text-[16px] outline-none"
          />
        </div>
        <div
          onClick={() => hancleSubjectClick()}
          className="flex relative flex-col cursor-pointer text-[16px] justify-center px-4 py-2 w-full md:w-1/4 h-[72px]  bg-white   "
        >
          <div className="text-[13px] leading-3 text-[#a6a6a6]">
            Teach subject
          </div>
          <div className="flex justify-between items-center">
            All Subjects
            <LiaAngleDownSolid />
          </div>
          {filterOpened === "subject" && <SubjectFilterDropdown />}
        </div>
        <div
          onClick={() => handlePriceClick()}
          className="flex relative flex-col cursor-pointer text-[16px] justify-center px-4 py-2 w-full md:w-1/4 h-[72px]  bg-white   "
        >
          <div className="text-[13px] leading-3 text-[#a6a6a6]">Price</div>
          <div className="flex justify-between items-center">
            All Prices
            <LiaAngleDownSolid />
          </div>
          {filterOpened === "price" && <PriceFilterDropdown />}
        </div>
        <div
          onClick={() => handleAvailabilityClick()}
          className="flex relative flex-col cursor-pointer text-[16px] justify-center rounded-r-lg px-4 py-2 w-full md:w-1/4 h-[72px]  bg-white   "
        >
          <div className="text-[13px] leading-3 text-[#a6a6a6]">
            Availability
          </div>
          <div className="flex justify-between items-center">
            Select timing
            <LiaAngleDownSolid />
          </div>
          {filterOpened === "availability" && <TimeFilterDropdown />}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex text-nowrap flex-wrap items-center gap-4 mt-4">
        {/* Active Tutors Toggle */}
        <div className="flex items-center gap-2 bg-white rounded px-4 h-[40px]">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary   after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
          <span className="text-sm">Active Tutors</span>
        </div>
        <div
          onClick={() => handleGenderSet()}
          className="flex relative flex-col cursor-pointer text-sm  min-w-[174px] text-[16px] justify-center px-4 py-2   h-[40px] rounded-lg bg-white   "
        >
          <div className="flex justify-between items-center gap-4">
            <span className="">
              <span className="font-semibold">Gender:</span> {gender}
            </span>
            <LiaAngleDownSolid />
          </div>
          {filterOpened === "gender" && (
            <GenderSelector setGender={setGender} selectedGender={gender} />
          )}
        </div>

        <div
          onClick={() => handleSortBy()}
          className="flex relative flex-col cursor-pointer text-sm  min-w-[174px] text-[16px] justify-center px-4 py-2   h-[40px] rounded-lg bg-white   "
        >
          <div className="flex justify-between items-center gap-4">
            <span className="">
              <span className="font-semibold">Sort :</span> {sortBy}
            </span>
            <LiaAngleDownSolid />
          </div>
          {filterOpened === "sort" && (
            <SortBy setSortBy={setSortBy} sortBy={sortBy} />
          )}
        </div>
      </div>
    </div>
  );
};
export default TutorFilter;
