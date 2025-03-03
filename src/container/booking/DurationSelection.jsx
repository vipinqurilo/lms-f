"use client";

import { Check } from "lucide-react";

const durations = [
  { minutes: 15, label: "15 minutes lesson" },
  { minutes: 30, label: "30 minutes lesson" },
  { minutes: 45, label: "45 minutes lesson" },
  { minutes: 60, label: "60 minutes lesson" },
];

export function DurationSelection({ slots, selected, onSelect }) {
  const availableDurations = durations.filter((duration) =>
    slots?.includes(duration.minutes)
  );

  return (
    <div className="p-8 lg:w-1/2 mx-auto">
      <h2 className="text-lg font-semibold text-center mb-4">
        Select timeslot
      </h2>
      <div className="space-y-2">
        {availableDurations.map((duration) => (
          <button
            key={duration.minutes}
            onClick={() => onSelect(duration.minutes)}
            className={`
              w-full flex items-center justify-between p-4 rounded-lg border
              ${
                selected === duration.minutes
                  ? "border-secondary"
                  : "border-gray-200"
              }
              hover:border-secondary transition-colors
            `}
          >
            <div className="flex items-center gap-3">
              <span
                className={`${
                  selected === duration.minutes ? "text-secondary" : "text-gray-200"
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
