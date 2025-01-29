import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import SubjectSelection from "./SubjectSelection";
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

const SubjectFilterDropdown = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="absolute bottom-0 left-3 translate-y-[100%] z-[1000]"
    >
      <div className="w-[260px] flex flex-col  justify-between h-[377px]  bg-white rounded-lg relative mt-[12.8px]">
        <div className="w-0 h-0 absolute top-0 left-5 -translate-y-[96%] border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[13px] border-b-white"></div>
        {/* search  */}
        <div className="p-4 relative">
          <FiSearch
            className="absolute left-7 top-[50%] -translate-y-[50%]"
            size={16}
          />
          <input
            type="text"
            className="w-full rounded-lg shadow border px-3 pl-10 py-[6px] focus:outline-none"
            placeholder="Search subject"
          />
        </div>
        <hr />
        {/* subject selection */}
        <div
          style={{
            scrollbarWidth: "thin" /* Firefox ke liye */,
            scrollbarColor: "#888 #f1f1f1" /* Firefox ke liye color */,
          }}
          className=" overflow-y-scroll"
        >
          <SubjectSelection
            data={data}
            setSelectedItems={setSelectedItems}
            selectedItems={selectedItems}
          />
        </div>
        <hr />

        {/*btns */}
        <div className="py-2 px-4 relative flex justify-end gap-2">
          <button className="px-5 py-1 rounded-lg bg-[#E9E8EB] text-black  ">
            Clear
          </button>
          <button className="px-5 py-1 rounded-lg bg-black text-white ">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectFilterDropdown;
