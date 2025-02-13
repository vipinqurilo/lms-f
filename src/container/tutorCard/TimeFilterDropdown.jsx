import { setTimeRanges } from "@/store/slices/uiSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TimeFilterDropdown = ({ onClose }) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const timeRanges = [
    "00 - 04",
    "04 - 08",
    "08 - 12",
    "12 - 16",
    "16 - 20",
    "20 - 24",
  ];
  const dispatch = useDispatch();
  const { timeRanges: selectedTimeRanges } = useSelector((state) => state.ui);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const toggleTimeSelection = (time) => {
    setSelectedTimes(
      (prev) =>
        prev.includes(time)
          ? prev.filter((t) => t !== time) // Deselect if already selected
          : [...prev, time] // Add if not selected
    );
  };

  const toggleDaySelection = (day) => {
    setSelectedDays(
      (prev) =>
        prev.includes(day)
          ? prev.filter((d) => d !== day) // Deselect if already selected
          : [...prev, day] // Add if not selected
    );
  };

  const clearSelections = () => {
    setSelectedTimes([]);
    setSelectedDays([]);
    dispatch(setTimeRanges(""));
  };

  const applySelections = () => {
    dispatch(setTimeRanges(selectedTimes));
    console.log("Selected Time Ranges:", selectedTimes);
    console.log("Selected Days of the Week:", selectedDays);
    onClose();
  };
  useEffect(() => {
    if (selectedTimeRanges) {
      setSelectedTimes(selectedTimeRanges);
    }
  }, [selectedTimeRanges]);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="absolute bottom-0 right-3 translate-y-[100%] z-[1000]"
    >
      <div className="w-[435px] flex flex-col justify-between bg-white rounded-lg relative mt-[12.8px]">
        <div className="w-0 h-0 absolute top-0 right-10 -translate-y-[96%] border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[13px] border-b-white"></div>

        {/* Days of the Week */}
        <div className="px-4 py-2 relative flex gap-4">Days of the Week</div>
        <div className="px-4 py-2 flex justify-center items-center ">
          {daysOfWeek.map((day, index) => (
            <button
              key={index}
              onClick={() => toggleDaySelection(day)}
              className={`border-y border-[#F0F0F0] px-4 py-1 ${
                index === 6 && "rounded-r-full"
              } ${index === 0 && "rounded-l-full"}  ${
                selectedDays.includes(day)
                  ? " text-black bg-[#F0F0F0]"
                  : " text-gray-400"
              }`}
            >
              {day.substring(0, 3)} {/* Display first 3 letters */}
            </button>
          ))}
        </div>

        {/* Time Selection */}
        <div className="px-4 py-2 relative flex gap-4">
          Times of Day (24 Hours)
        </div>
        <div className="px-4 py-2 grid grid-flow-row grid-cols-3 gap-6">
          {timeRanges.map((range, index) => (
            <button
              key={index}
              onClick={() => toggleTimeSelection(range)}
              className={`px-4 border border-[#F0F0F0] py-[6px] rounded-lg ${
                selectedTimes.includes(range)
                  ? "text-black bg-[#F0F0F0]"
                  : "text-gray-400"
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        <hr />

        {/* Buttons */}
        <div className="py-2 px-4 relative flex justify-end gap-2">
          <button
            onClick={clearSelections}
            className="px-5 py-1 rounded-lg bg-[#E9E8EB] text-black"
          >
            Clear
          </button>
          <button
            onClick={applySelections}
            className="px-5 py-1 rounded-lg bg-black text-white"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeFilterDropdown;
