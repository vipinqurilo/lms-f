import React, { useState } from "react";
import { GoCheck } from "react-icons/go";

const SubjectSelection = ({ setSelectedItems, selectedItems, data }) => {
  // Toggle selection of chapters
  const toggleSelection = (e, item) => {
    const subjectData = data.find((subject) => subject.subject === item);
    const selectedChapters = subjectData?.chapters || [];

    setSelectedItems((prev) => {
      const isSubjectSelected = prev.includes(item);
      const areAllChaptersSelected = selectedChapters.every((chapter) =>
        prev.includes(chapter)
      );

      if (isSubjectSelected || areAllChaptersSelected) {
        // Deselect the subject and its chapters
        return prev.filter(
          (selected) =>
            selected !== item && !selectedChapters.includes(selected)
        );
      } else {
        // Select the subject and only the missing chapters
        return [
          ...prev,
          item,
          ...selectedChapters.filter((chapter) => !prev.includes(chapter)),
        ];
      }
    });
  };

  return (
    <div className=" text-[14px] ">
      {data.map((item) => (
        <div key={item.subject} className="border-b px-4 py-2">
          {/* Subject Title */}
          <div
            className={`font-semibold cursor-pointer flex justify-between items-center ${
              selectedItems.includes(item.subject)
                ? "text-black"
                : "text-[#b4b4b4]"
            }`}
            onClick={(e) => toggleSelection(e, item.subject)}
          >
            {item.subject} <GoCheck />
          </div>

          {/* Chapters */}
          <div className="pl-3 relative">
            <div className="absolute w-[2px] h-[95%] top-[50%] -translate-y-[50%] left-[2px]   bg-[#b4b4b4] "></div>

            {item.chapters.length > 0 &&
              item.chapters.map((chapter) => (
                <div
                  key={chapter}
                  className={`flex items-center gap-2  justify-between   pl-2 rounded-lg cursor-pointer ${
                    selectedItems.includes(chapter)
                      ? " text-black"
                      : "  text-[#b4b4b4]"
                  }`}
                  onClick={(e) => toggleSelection(e, chapter)}
                >
                  {chapter} <GoCheck />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubjectSelection;
