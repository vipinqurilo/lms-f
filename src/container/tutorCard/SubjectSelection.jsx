import React, { useState } from "react";
import { GoCheck } from "react-icons/go";

const SubjectSelection = ({ setSelectedItems, selectedItems, data }) => {
  // Helper function to check if all chapters are selected
  const areAllChaptersSelected = (subject) => {
    const subjectData = data.find((item) => item.subject === subject);
    return subjectData?.chapters.every((chapter) => selectedItems.includes(chapter));
  };

  // Toggle selection for subject or chapter
  const toggleSelection = (item, isSubject) => {
    setSelectedItems((prev) => {
      if (isSubject) {
        const subjectData = data.find((subject) => subject.subject === item);
        const subjectChapters = subjectData?.chapters || [];

        const isSubjectSelected = prev.includes(item);

        if (isSubjectSelected) {
          // Deselect subject and its chapters
          return prev.filter(
            (selected) => selected !== item && !subjectChapters.includes(selected)
          );
        } else {
          // Select subject and all its chapters
          return [...new Set([...prev, item, ...subjectChapters])];
        }
      } else {
        const chapter = item;
        const subjectData = data.find((subject) => subject.chapters.includes(chapter));
        const subjectName = subjectData?.subject;

        const isChapterSelected = prev.includes(chapter);

        if (isChapterSelected) {
          // Deselect chapter
          const updatedSelection = prev.filter((selected) => selected !== chapter);
          // If all chapters are deselected, remove the subject too
          if (updatedSelection.includes(subjectName) && !areAllChaptersSelected(subjectName)) {
            return updatedSelection.filter((selected) => selected !== subjectName);
          }
          return updatedSelection;
        } else {
          // Select chapter
          const updatedSelection = [...prev, chapter];
          // If all chapters are selected, add the subject
          if (areAllChaptersSelected(subjectName)) {
            return [...updatedSelection, subjectName];
          }
          return updatedSelection;
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
              selectedItems.includes(item.subject) ? "text-black" : "text-[#b4b4b4]"
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
                  key={chapter}
                  className={`flex items-center gap-2 justify-between pl-2 rounded-lg cursor-pointer ${
                    selectedItems.includes(chapter) ? "text-black" : "text-[#b4b4b4]"
                  }`}
                  onClick={() => toggleSelection(chapter, false)}
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
