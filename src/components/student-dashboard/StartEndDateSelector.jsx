"use client";

import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "../common/Calendar";

export function StartEndDateSelector({
  selectedDate,
  onDateSelect,
  onClose,
  minDate,
  isError,
}) {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect = (date) => {
    onDateSelect(date);
    setShowCalendar(false);
  };

  return (
    <div className="relative bg-white rounded-lg">
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className={`w-full px-4 py-1 border text-sm rounded-lg text-left flex items-center justify-between
          ${isError ? "border-red-500" : "border-gray-300"}`}
      >
        {selectedDate instanceof Date ? selectedDate.toLocaleDateString("en-CA") : selectedDate}
        <span className="text-gray-800 mx-1">
          <CalendarIcon size={14} />
        </span>
      </button>

      {showCalendar && (
        <div className="absolute top-full left-0 mt-2 border rounded-lg shadow-lg z-50">
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            minDate={minDate}
          />
        </div>
      )}
    </div>
  );
}
