"use client";

import React, { useState, useEffect, useCallback } from "react";

import { X } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TutorAvailabilityCalendar = () => {
  const [selections, setSelections] = useState({});
  console.log(selections, "selections");
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState(null);
  const [endCell, setEndCell] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartCell, setResizeStartCell] = useState(null);

  const [resizeDirection, setResizeDirection] = useState(null);

  const times = Array.from({ length: 96 }, (_, index) => {
    const hours = Math.floor(index / 4)
      .toString()
      .padStart(2, "0");
    const minutes = ((index % 4) * 15).toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  });

  const handleMouseDown = (dayIndex, timeIndex, edge = null) => {
    if (edge) {
      setIsResizing(true);
      setResizeStartCell([dayIndex, timeIndex]);
      setResizeDirection(edge);
    } else if (selections[DAYS[dayIndex]]?.includes(times[timeIndex])) {
      setIsResizing(true);
      setResizeStartCell([dayIndex, timeIndex]);
    } else {
      setIsSelecting(true);
      setStartCell([dayIndex, timeIndex]);
      setEndCell([dayIndex, timeIndex]);
    }
  };

  const handleMouseEnter = (dayIndex, timeIndex) => {
    if (isSelecting && startCell) {
      setEndCell([dayIndex, timeIndex]);
    } else if (isResizing && resizeStartCell) {
      setEndCell([dayIndex, timeIndex]);
    }
  };

  const handleMouseUp = useCallback(() => {
    if (isSelecting && startCell && endCell) {
      const newSelections = { ...selections };
      const [startDay, startTime] = startCell;
      const [endDay, endTime] = endCell;

      for (
        let d = Math.min(startDay, endDay);
        d <= Math.max(startDay, endDay);
        d++
      ) {
        const day = DAYS[d];
        if (!newSelections[day]) newSelections[day] = []; // Initialize as an array

        for (
          let t = Math.min(startTime, endTime);
          t <= Math.max(startTime, endTime);
          t++
        ) {
          const timeSlot = times[t]; // Get time string like "11:00"
          if (!newSelections[day].includes(timeSlot)) {
            newSelections[day].push(timeSlot); // Only push unique time slots
          }
        }
      }

      setSelections(newSelections);
    }
    // Handle Resizing
    else if (isResizing && resizeStartCell && endCell) {
      const newSelections = { ...selections };
      const [startDay, startTime] = resizeStartCell;
      const [endDay, endTime] = endCell;
      const day = DAYS[startDay];

      if (!newSelections[day]) return;

      if (resizeDirection === "top") {
        // Find where the block currently starts
        const blockEnd = findBlockEnd(day, startTime);
        const newStart = Math.min(endTime, blockEnd);
        newSelections[day] = newSelections[day]
          .filter((time) => times.indexOf(time) >= newStart)
          .sort((a, b) => times.indexOf(a) - times.indexOf(b));
      } else if (resizeDirection === "bottom") {
        // Find where the block currently ends
        const blockStart = findBlockStart(day, startTime);
        const newEnd = Math.max(endTime, blockStart);
        newSelections[day] = newSelections[day]
          .filter((time) => times.indexOf(time) <= newEnd)
          .sort((a, b) => times.indexOf(a) - times.indexOf(b));
      }

      setSelections(newSelections);
    }

    setIsSelecting(false);
    setIsResizing(false);
    setStartCell(null);
    setEndCell(null);
    setResizeStartCell(null);
    setResizeDirection(null);
  }, [
    isSelecting,
    isResizing,
    startCell,
    endCell,
    resizeStartCell,
    resizeDirection,
    selections,
  ]);

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseUp]);

  const findBlockStart = (day, timeIndex) => {
    while (timeIndex > 0 && selections[day][timeIndex - 1]) {
      timeIndex--;
    }
    return timeIndex;
  };

  const findBlockEnd = (day, timeIndex) => {
    while (timeIndex < 95 && selections[day][timeIndex + 1]) {
      timeIndex++;
    }
    return timeIndex;
  };

  const removeBlockSelection = (day, startTime) => {
    const res = confirm("Do you want to remove?");
    if (res) {
      if (!selections[day]) return;
      const newSelections = { ...selections };
      newSelections[day] = newSelections[day].filter(
        (time) => time !== times[startTime]
      );
      if (newSelections[day].length === 0) {
        delete newSelections[day];
      }
      setSelections(newSelections);
    } else {
      return;
    }
  };

  const renderCell = (day, dayIndex, timeIndex) => {
    const timeSlot = times[timeIndex]; // Get time as "HH:MM"
    const isSelected = selections[day]?.includes(timeSlot); // Check if time exists in array

    const isFirstInBlock =
      isSelected &&
      (!selections[day]?.includes(times[timeIndex - 1]) || timeIndex === 0);
    const isLastInBlock =
      isSelected &&
      (!selections[day]?.includes(times[timeIndex + 1]) ||
        timeIndex === times.length - 1);
    const isMiddleOfBlock =
      isSelected &&
      selections[day]?.includes(times[timeIndex - 1]) &&
      selections[day]?.includes(times[timeIndex + 1]);

    let cellClass = "relative h-4 ";
    if (day === "Sat") cellClass += "border-r ";
    if (isSelected) {
      cellClass += "bg-green-200 ";
      if (isFirstInBlock) cellClass += "border-t border-l border-r ";
      else if (isLastInBlock) cellClass += "border-b border-l border-r ";
      else if (isMiddleOfBlock) cellClass += "border-l border-r ";
    } else {
      cellClass += "bg-white border-l border-b ";
    }
    cellClass += "border-gray-200";

    return (
      <div
        key={`${day}-${timeIndex}`}
        className={cellClass}
        onMouseDown={() => handleMouseDown(dayIndex, timeIndex)}
        onMouseEnter={() => handleMouseEnter(dayIndex, timeIndex)}
      >
        {isSelected && (
          <span className="text-[10px] absolute -top-0.5 left-1 p-0.5">
            {timeSlot}
          </span>
        )}

        {isFirstInBlock && (
          <>
            <button
              className="absolute top-0 right-0 p-0.5"
              onClick={() => removeBlockSelection(day, timeIndex)}
            >
              <X size={8} />
            </button>
            <div
              className="absolute top-0 left-0 right-0 h-1 cursor-ns-resize"
              onMouseDown={(e) => {
                e.stopPropagation();
                handleMouseDown(dayIndex, timeIndex, "top");
              }}
            />
          </>
        )}

        {isLastInBlock && (
          <div
            className="absolute bottom-0 left-0 right-0 h-1 cursor-ns-resize"
            onMouseDown={(e) => {
              e.stopPropagation();
              handleMouseDown(dayIndex, timeIndex, "bottom");
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="w-full overflow-x-auto select-none bg-white rounded-lg border border-gray-200 shadow-sm p-4">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-[40px_repeat(7,_1fr)] gap-0">
          <div className="border-l border-y py-2 border-gray-200"></div>
          {DAYS.map((day) => (
            <div
              key={day}
              className={`font-semibold text-center border-l border-y py-2 border-gray-200 ${
                day === "Sat" ? "border-r" : ""
              }`}
            >
              {day}
            </div>
          ))}
          {times.map((time, timeIndex) => (
            <React.Fragment key={time}>
              <div className="text-[12px] leading-3 border-l border-b text-center border-gray-200">
                {/* {time} */}
                {timeIndex % 2 === 0 ? time : ""}
              </div>

              {DAYS.map((day, dayIndex) =>
                renderCell(day, dayIndex, timeIndex)
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorAvailabilityCalendar;
