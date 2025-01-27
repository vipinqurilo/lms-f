"use client";

const subjects = [
  { id: "accounting", name: "Accounting" },
  { id: "biology", name: "Biology" },
  { id: "geography", name: "Geography" },
  { id: "literary", name: "Literary Criticism" },
];

export function SubjectSelection({ selected, onSelect }) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Select subject</h2>
      <div className="space-y-2">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => onSelect(subject.id)}
            className={`
              w-full flex items-center justify-between p-4 rounded-lg border
              ${
                selected === subject.id
                  ? "border-orange-500"
                  : "border-gray-200"
              }
              hover:border-orange-500 transition-colors
            `}
          >
            <span className="text-base">{subject.name}</span>
            {selected === subject.id && (
              <span className="text-orange-500">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
