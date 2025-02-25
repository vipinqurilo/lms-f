import React, { useState } from "react";
import { GoCheck } from "react-icons/go";

const SubjectSelection = ({ setSelectedSubjects, selectedSubjects, data }) => {
  // console.log(selectedSubjects,data, "selectedSubjects and data");
  
  // Helper function to check if all chapters are selected
  const areAllChaptersSelected = (subject) => {
    const subjectData = data.find((item) => item.subject === subject);
    const subjectChapterIds = subjectData?.chapters.map(ch => ch._id) || [];
    const selectedChapterIds = selectedSubjects.map(ch => ch._id);
    return subjectChapterIds.every(id => selectedChapterIds.includes(id));
  };

  // Toggle selection for subject or chapter
  const toggleSelection = (item, isSubject) => {
    setSelectedSubjects((prev) => {
      if (isSubject) {
        const subjectData = data.find((subject) => subject.subject === item);
        const subjectChapters = subjectData?.chapters || [];
        
        // Check if all chapters of this subject are already selected
        const allChaptersSelected = areAllChaptersSelected(item);

        if (allChaptersSelected) {
          // Deselect all chapters of this subject
          return prev.filter(selected => !subjectChapters.some(ch => ch._id === selected._id));
        } else {
          // Select all chapters of this subject
          const currentSelectedIds = prev.map(ch => ch._id);
          const chaptersToAdd = subjectChapters.filter(ch => !currentSelectedIds.includes(ch._id));
          return [...prev, ...chaptersToAdd];
        }
      } else {
        // For chapter selection
        const isChapterSelected = prev.some(ch => ch._id === item._id);
        
        if (isChapterSelected) {
          // Deselect chapter
          return prev.filter(ch => ch._id !== item._id);
        } else {
          // Select chapter
          return [...prev, item];
        }
      }
    });
  };

  return (
    <div className="text-[14px]">
      {data.map((item) => (
        <div key={item.subject} className="border-b px-4 py-2">
          {/* Subject Title */}
          <div
            className={`font-semibold cursor-pointer flex justify-between items-center ${
              areAllChaptersSelected(item.subject) ? "text-black" : "text-[#b4b4b4]"
            }`}
            onClick={() => toggleSelection(item.subject, true)}
          >
            {item.subject} <GoCheck />
          </div>

          {/* Chapters */}
          <div className="pl-3 relative">
            <div className="absolute w-[2px] h-[95%] top-[50%] -translate-y-[50%] left-[2px] bg-[#b4b4b4]"></div>

            {item.chapters.length > 0 &&
              item.chapters.map((chapter) => (
                <div
                  key={chapter._id}
                  className={`flex items-center gap-2 justify-between pl-2 rounded-lg cursor-pointer ${
                    selectedSubjects.some(ch => ch._id === chapter._id) ? "text-black" : "text-[#b4b4b4]"
                  }`}
                  onClick={() => toggleSelection(chapter, false)}
                >
                  {chapter.name} <GoCheck />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubjectSelection;
