"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Calendar({ selectedDate, onDateSelect, minDate }) {
  const [currentDate, setCurrentDate] = useState(selectedDate);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    if (minDate && newDate < minDate) {
      return;
    }

    onDateSelect(newDate);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    onDateSelect(today);
  };

  const isDateDisabled = (date) => {
    if (!minDate) return false;
    return date < minDate;
  };

  const normalizeDate = (date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

  return (
    <div className="bg-white rounded-lg p-4 w-[320px]">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="p-1">
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex gap-2">
          <select
            value={months[currentDate.getMonth()]}
            onChange={(e) =>
              setCurrentDate(
                new Date(
                  currentDate.getFullYear(),
                  months.indexOf(e.target.value)
                )
              )
            }
            className="border rounded px-2 py-1"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          <select
            value={currentDate.getFullYear()}
            onChange={(e) =>
              setCurrentDate(
                new Date(
                  Number.parseInt(e.target.value),
                  currentDate.getMonth()
                )
              )
            }
            className="border rounded px-2 py-1"
          >
            {Array.from(
              { length: 10 },
              (_, i) => currentDate.getFullYear() - 5 + i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleNextMonth} className="p-1">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-1"
          >
            {day}
          </div>
        ))}

        {Array.from({ length: getFirstDayOfMonth(currentDate) }).map(
          (_, index) => (
            <div key={`empty-${index}`} />
          )
        )}

        {Array.from({ length: getDaysInMonth(currentDate) }).map((_, index) => {
          const day = index + 1;
          const currentDateObj = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
          );
          const isSelected =
            normalizeDate(selectedDate).getTime() ===
            normalizeDate(currentDateObj).getTime();

          const isDisabled = isDateDisabled(currentDateObj);

          return (
            <button
              key={day}
              onClick={() => handleDateSelect(day)}
              disabled={isDisabled}
              className={`px-2 text-center rounded
                ${isSelected ? "bg-gray-200" : ""}
                ${
                  isDisabled
                    ? "text-gray-300 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handleToday}
          className="px-4 py-2 bg-black text-white rounded-lg text-sm"
        >
          Today
        </button>
      </div>
    </div>
  );
}
