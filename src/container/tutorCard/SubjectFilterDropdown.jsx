import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import SubjectSelection from "./SubjectSelection";
import { useSelector } from "react-redux";

const SubjectFilterDropdown = ({setfilterOpened, selectedSubjects, setSelectedSubjects, handleApplySubjects}) => {
  const { subjects } = useSelector((state) => state.category);

  // Transform subjects data to match required format
  const transformedData = subjects
    .filter((subject) => subject.courseSubCategory.length > 0)
    .map((subject) => ({
      _id: subject._id,
      subject: subject.name,
      chapters: subject.courseSubCategory.map((category) => ({
        _id: category._id,
        name: category.name,
      })),
    }));
  console.log(transformedData,'transformedData')
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="absolute bottom-0 left-3 translate-y-[100%] z-[1000]"
    >
      <div className="w-[260px] flex flex-col  justify-between h-[377px]  bg-white rounded-lg relative mt-[12.8px]">
        <div className="w-0 h-0 absolute top-0 left-5 -translate-y-[96%] border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[13px] border-b-white"></div>
        
        {/* subject selection */}
        <div  
          style={{
            scrollbarWidth: "thin" /* Firefox ke liye */,
            scrollbarColor: "#888 #f1f1f1" /* Firefox ke liye color */,
          }}
          className=" overflow-y-scroll"
        >
          <SubjectSelection
            data={transformedData}
            setSelectedSubjects={setSelectedSubjects}
            selectedSubjects={selectedSubjects}
          />
        </div>
        <hr />

        {/*btns */}
        <div className="py-2 px-4 relative flex justify-end gap-2">
          <button onClick={() => setSelectedSubjects([])} className="px-5 py-1 rounded-lg bg-[#E9E8EB] text-black  ">
            Clear
          </button>
          <button onClick={() => {
            handleApplySubjects();
            setfilterOpened('');
          }} className="px-5 py-1 rounded-lg bg-black text-white ">
            Apply
          </button>
        </div>
      </div>
    </div>  
  );
};

export default SubjectFilterDropdown;
