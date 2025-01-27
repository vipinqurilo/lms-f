"use client";

import { Check } from "lucide-react";

const subjects = [
  { id: "accounting", name: "Accounting" },
  { id: "biology", name: "Biology" },
  { id: "geography", name: "Geography" },
  { id: "literary", name: "Literary Criticism" },
];

export function SubjectSelection({ selected, onSelect }) {
  return (
    <div className="p-8">
      <h2 className="text-lg font-semibold text-center mb-4">Select subject</h2>
      <div className="space-y-2  lg:w-1/2 mx-auto">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => onSelect(subject.id)}
            className={`
              w-full flex items-center justify-between p-4 rounded-lg border
              ${
                selected === subject.id ? "border-secondary" : "border-gray-200"
              }
              hover:border-secondary transition-colors
            `}
          >
            <span
              className={`text-base ${
                selected === subject.id && "text-secondary"
              }`}
            >
              {subject.name}
            </span>
            {selected === subject.id && (
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
