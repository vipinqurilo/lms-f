"use client";

const durations = [
  { id: "15", minutes: 15, label: "15 minutes lesson" },
  { id: "30", minutes: 30, label: "30 minutes lesson" },
  { id: "45", minutes: 45, label: "45 minutes lesson" },
  { id: "60", minutes: 60, label: "60 minutes lesson" },
];

export function DurationSelection({ selected, onSelect }) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Select timeslot</h2>
      <div className="space-y-2">
        {durations.map((duration) => (
          <button
            key={duration.id}
            onClick={() => onSelect(duration.id)}
            className={`
              w-full flex items-center justify-between p-4 rounded-lg border
              ${
                selected === duration.id
                  ? "border-orange-500"
                  : "border-gray-200"
              }
              hover:border-orange-500 transition-colors
            `}
          >
            <div className="flex items-center gap-3">
              <span className="text-orange-500">⏰</span>
              <span>{duration.label}</span>
            </div>
            {selected === duration.id && (
              <span className="text-orange-500">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
