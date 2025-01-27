"use client";

import { Check } from "lucide-react";

const durations = [
  { id: "15", minutes: 15, label: "15 minutes lesson" },
  { id: "30", minutes: 30, label: "30 minutes lesson" },
  { id: "45", minutes: 45, label: "45 minutes lesson" },
  { id: "60", minutes: 60, label: "60 minutes lesson" },
];

export function DurationSelection({ selected, onSelect }) {
  return (
    <div className="p-8 lg:w-1/2 mx-auto">
      <h2 className="text-lg font-semibold text-center mb-4">
        Select timeslot
      </h2>
      <div className="space-y-2">
        {durations.map((duration) => (
          <button
            key={duration.id}
            onClick={() => onSelect(duration.id)}
            className={`
              w-full flex items-center justify-between p-4 rounded-lg border
              ${
                selected === duration.id
                  ? "border-secondary"
                  : "border-gray-200"
              }
              hover:border-secondary transition-colors
            `}
          >
            <div className="flex items-center gap-3">
              <span
                className={`${
                  selected === duration.id ? "text-secondary" : "text-gray-200"
                }`}
              >
                <Check />
              </span>

              <span>{duration.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
