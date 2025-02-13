"use client";

import { Check } from "lucide-react";

export function SubjectSelection({ selected, onSelect, sub: subjects }) {
  console.log(selected, "selected");
  if (!subjects?.length) {
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-lg font-semibold text-center mb-4">Select subject</h2>
      <div className="space-y-2  lg:w-1/2 mx-auto">
        {subjects?.map((subject) => (
          <button
            key={subject?._id}
            onClick={() => onSelect(subject)}
            className={`
              w-full flex items-center justify-between p-4 rounded-lg border
              ${
                selected?._id === subject?._id
                  ? "border-secondary"
                  : "border-gray-200"
              }
              hover:border-secondary transition-colors

            `}
          >
            <span
              className={`text-base ${
                selected?._id === subject?._id && "text-secondary"
              }`}
            >
              {subject?.name}
            </span>
            {selected?._id === subject?._id && (
              <span className="text-secondary">
                <Check size={20} />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
