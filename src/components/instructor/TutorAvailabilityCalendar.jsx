"use client"

import React, { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"



const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const AvailabilityCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(0)
  const [selections, setSelections] = useState({})
  const [isSelecting, setIsSelecting] = useState(false)
  const [startCell, setStartCell] = useState(null)
  const [endCell, setEndCell] = useState(null)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeStartCell, setResizeStartCell] = useState(null)
    console.log(selections,'selections')
  const times = Array.from({ length: 96 }, (_, index) => {
    const hours = Math.floor(index / 4)
      .toString()
      .padStart(2, "0")
    const minutes = ((index % 4) * 15).toString().padStart(2, "0")
    return `${hours}:${minutes}`
  })

  const handleMouseDown = (dayIndex, timeIndex) => {
    if (selections[DAYS[dayIndex]]?.[timeIndex]) {
      // Start resizing if clicking on an existing selection
      setIsResizing(true)
      setResizeStartCell([dayIndex, timeIndex])
    } else {
      setIsSelecting(true)
      setStartCell([dayIndex, timeIndex])
      setEndCell([dayIndex, timeIndex])
    }
  }

  const handleMouseEnter = (dayIndex, timeIndex) => {
    if (isSelecting && startCell) {
      setEndCell([dayIndex, timeIndex])
    } else if (isResizing && resizeStartCell) {
      setEndCell([dayIndex, timeIndex])
    }
  }

  const handleMouseUp = useCallback(() => {
    if (isSelecting && startCell && endCell) {
      const newSelections = { ...selections }
      const [startDay, startTime] = startCell
      const [endDay, endTime] = endCell

      for (let d = Math.min(startDay, endDay); d <= Math.max(startDay, endDay); d++) {
        const day = DAYS[d]
        if (!newSelections[day]) newSelections[day] = Array(96).fill(false)
        for (let t = Math.min(startTime, endTime); t <= Math.max(startTime, endTime); t++) {
          newSelections[day][t] = true
        }
      }

      setSelections(newSelections)
    } else if (isResizing && resizeStartCell && endCell) {
      const newSelections = { ...selections }
      const [startDay, startTime] = resizeStartCell
      const [endDay, endTime] = endCell

      const day = DAYS[startDay]
      for (let t = Math.min(startTime, endTime); t <= Math.max(startTime, endTime); t++) {
        newSelections[day][t] = true
      }

      setSelections(newSelections)
    }

    setIsSelecting(false)
    setIsResizing(false)
    setStartCell(null)
    setEndCell(null)
    setResizeStartCell(null)
  }, [isSelecting, isResizing, startCell, endCell, resizeStartCell, selections])

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp)
    return () => document.removeEventListener("mouseup", handleMouseUp)
  }, [handleMouseUp])

  const removeBlockSelection = (day, startTimeIndex, endTimeIndex) => {
    const newSelections = { ...selections }
    for (let t = startTimeIndex; t <= endTimeIndex; t++) {
      if (newSelections[day]) {
        newSelections[day][t] = false
      }
    }
    setSelections(newSelections)
  }

  const removeSelection = (day, timeIndex) => {
    const newSelections = { ...selections }
    let t = timeIndex
    while (newSelections[day]?.[t]) {
      newSelections[day][t] = false
      t++
    }
    setSelections(newSelections)
  }

  const renderCell = (day, dayIndex, timeIndex) => {
    const isSelected = selections[day]?.[timeIndex]
    const isPartOfBlock = isSelected && selections[day]?.[timeIndex - 1] && selections[day]?.[timeIndex + 1]

    if (isPartOfBlock && (timeIndex === 0 || !selections[day]?.[timeIndex - 1])) {
      // Find the end of the block
      let endTimeIndex = timeIndex
      while (selections[day]?.[endTimeIndex + 1]) {
        endTimeIndex++
      }

      return (
        <div
          key={`${day}-${timeIndex}`}
          className="relative h-4 bg-green-200"
          onMouseDown={() => handleMouseDown(dayIndex, timeIndex)}
          onMouseEnter={() => handleMouseEnter(dayIndex, timeIndex)}
        >
          <button
            className="absolute top-0 right-0 p-0.5"
            onClick={() => removeBlockSelection(day, timeIndex, endTimeIndex)}
          >
            <X size={8} />
          </button>
        </div>
      )
    }

    return (
      <div
        key={`${day}-${timeIndex}`}
        className={`relative h-4 ${isPartOfBlock ? "bg-green-200" : "border border-gray-200"} ${
          isSelected ? "bg-green-200" : "bg-white"
        }`}
        onMouseDown={() => handleMouseDown(dayIndex, timeIndex)}
        onMouseEnter={() => handleMouseEnter(dayIndex, timeIndex)}
      >
        {isSelected && !isPartOfBlock && (
          <button className="absolute top-0 right-0 p-0.5" onClick={() => removeSelection(day, timeIndex)}>
            <X size={8} />
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="w-full overflow-x-auto select-none">
      <div className="min-w-[800px]">
       
        <div className="grid grid-cols-[40px_repeat(7,_1fr)] gap-0">
          <div></div>
          {DAYS.map((day) => (
            <div key={day} className="font-semibold text-center">
              {day}
            </div>
          ))}
          {times.map((time, timeIndex) => (
            <React.Fragment key={time}>
              <div className="text-xs">{timeIndex % 4 === 0 ? time : ""}</div>
              {DAYS.map((day, dayIndex) => renderCell(day, dayIndex, timeIndex))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AvailabilityCalendar

