"use client";
import React, { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { updateAvailabilityAsync } from "@/store/slices/instructor/availabilitySlice";
import { useDispatch } from "react-redux";
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TutorAvailabilityCalendar = ({ calendar }) => {
  const [selections, setSelections] = useState([
    { day: "sun", slots: Array(48).fill(false) },
    { day: "mon", slots: Array(48).fill(false) },
    { day: "tue", slots: Array(48).fill(false) },
    { day: "wed", slots: Array(48).fill(false) },
    { day: "thu", slots: Array(48).fill(false) },
    { day: "fri", slots: Array(48).fill(false) },
    { day: "sat", slots: Array(48).fill(false) },
  ]);
  console.log(calendar, "calendar");
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState(null);
  const [endCell, setEndCell] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartCell, setResizeStartCell] = useState(null);
  const dispatch = useDispatch(); 
  const [resizeDirection, setResizeDirection] = useState(null);
  const times = Array.from({ length: 48 }, (_, index) => { 
    const hours = Math.floor(index / 2)
      .toString()
      .padStart(2, "0");
    const minutes = index % 2 === 0 ? "00" : "30";
    return `${hours}:${minutes}`;
  });
  const handleSave = () => {
    dispatch(updateAvailabilityAsync(selections));
  };
  const handleMouseDown = (dayIndex, timeIndex, edge = null) => {
    if (edge) {
      setIsResizing(true);
      setResizeStartCell([dayIndex, timeIndex]);
      setResizeDirection(edge);
    } else if (selections[dayIndex].slots[timeIndex]) {
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
      const newSelections = [...selections];
      const [startDay, startTime] = startCell;
      const [endDay, endTime] = endCell;
      for (
        let d = Math.min(startDay, endDay);
        d <= Math.max(startDay, endDay);
        d++
      ) {
        for (
          let t = Math.min(startTime, endTime);
          t <= Math.max(startTime, endTime);
          t++
        ) {
          newSelections[d].slots[t] = true;
        }
      }
      setSelections(newSelections);
    } else if (isResizing && resizeStartCell && endCell) {
      const newSelections = [...selections];
      const [startDay, startTime] = resizeStartCell;
      const [endDay, endTime] = endCell;
      if (resizeDirection === "top") {
        const blockEnd = findBlockEnd(startDay, startTime);
        const newStart = Math.min(endTime, blockEnd);
        for (
          let t = Math.min(newStart, startTime);
          t <= Math.max(newStart, startTime);
          t++
        ) {
          newSelections[startDay].slots[t] = t >= newStart;
        }
      } else if (resizeDirection === "bottom") {
        const blockStart = findBlockStart(startDay, startTime);
        const newEnd = Math.max(endTime, blockStart);
        for (
          let t = Math.min(newEnd, startTime);
          t <= Math.max(newEnd, startTime);
          t++
        ) {
          newSelections[startDay].slots[t] = t <= newEnd;
        }
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
  useEffect(() => {
    if (calendar && Array.isArray(calendar)) {
      const newSelections = selections.map((dayObj) => {
        const calendarDay = calendar.find((item) => item.day === dayObj.day);
        return {
          day: dayObj.day,
          slots: calendarDay ? [...calendarDay.slots] : Array(48).fill(false),
        };
      });
      setSelections(newSelections);
    }
  }, [calendar]);
  const findBlockStart = (dayIndex, timeIndex) => {
    while (timeIndex > 0 && selections[dayIndex].slots[timeIndex - 1]) {
      timeIndex--;
    }
    return timeIndex;
  };
  const findBlockEnd = (dayIndex, timeIndex) => {
    while (timeIndex < 47 && selections[dayIndex].slots[timeIndex + 1]) {
      timeIndex++;
    }
    return timeIndex;
  };
  const removeBlockSelection = (dayIndex, startTimeIndex) => {
    const newSelections = [...selections];
    let endTimeIndex = startTimeIndex;
    while (newSelections[dayIndex].slots[endTimeIndex]) {
      newSelections[dayIndex].slots[endTimeIndex] = false;
      endTimeIndex++;
    }
    setSelections(newSelections);
  };
  const renderCell = (dayIndex, timeIndex) => {
    const isSelected = selections[dayIndex].slots[timeIndex];
    const isFirstInBlock =
      isSelected && !selections[dayIndex].slots[timeIndex - 1];
    const isLastInBlock =
      isSelected && !selections[dayIndex].slots[timeIndex + 1];
    const isMiddleOfBlock =
      isSelected &&
      selections[dayIndex].slots[timeIndex - 1] &&
      selections[dayIndex].slots[timeIndex + 1];
    let cellClass = "relative h-4 ";
    if (DAYS[dayIndex] === "Sat") cellClass += "border-r ";
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
        key={`${DAYS[dayIndex]}-${timeIndex}`}
        className={cellClass}
        onMouseDown={() => handleMouseDown(dayIndex, timeIndex)}
        onMouseEnter={() => handleMouseEnter(dayIndex, timeIndex)}
      >
        {isFirstInBlock && (
          <>
            <button
              className="absolute top-0 right-0 p-0.5"
              onClick={() => removeBlockSelection(dayIndex, timeIndex)}
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
      <button onClick={handleSave}>Save</button>
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
                {timeIndex % 2 === 0 ? time : ""}
              </div>
              {DAYS.map((day, dayIndex) => renderCell(dayIndex, timeIndex))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TutorAvailabilityCalendar;