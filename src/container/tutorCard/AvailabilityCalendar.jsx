import React, { useState } from "react";

const AvailabilityCalendar = ({ availability }) => {
  const [hoveredSlot, setHoveredSlot] = useState(null);

  const timeSlots = [
    "00 - 04",
    "04 - 08",
    "08 - 12",
    "12 - 16",
    "16 - 20",
    "20 - 24",
  ];

  // Function to convert 48 slots to 6 slots
  const convertSlots = (slots) => {
    const newSlots = [];
    for (let i = 0; i < slots.length; i += 8) {
      newSlots.push(slots.slice(i, i + 8).some((slot) => slot));
    }
    return newSlots;
  };

  // Function to calculate available time in hours and minutes
  const calculateAvailableTime = (slots) => {
    const availableMinutes = slots.filter(Boolean).length * 30;
    const hours = Math.floor(availableMinutes / 60);
    const minutes = availableMinutes % 60;
    return { hours, minutes };
  };

  return (
    <div className="">
      <div
        className="grid gap-1 p-6 text-center text-sm "
        style={{
          gridTemplateColumns: "1.5fr repeat(7, 1fr)", // 1.5 fraction for time slots, 1 fraction for each day
        }}
      >
        {/* Add an extra column for time slots */}
        <div></div>
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, i) => (
          <div key={i} className="text-gray-600 font-semibold">
            {day}
          </div>
        ))}
        {timeSlots.map((time, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {/* Time slot column */}
            <div className="text-[#999999] text-sm font-semibold text-nowrap flex items-center">
              {time}
            </div>
            {/* Calendar slots */}
            {availability.map((dayAvailability, colIndex) => {
              const convertedSlots = convertSlots(dayAvailability.slots);
              const { hours, minutes } = calculateAvailableTime(
                dayAvailability.slots.slice(rowIndex * 8, rowIndex * 8 + 8)
              );
              return (
                <div
                  key={colIndex}
                  className={`w-8  h-[19px] mx-auto ${
                    convertedSlots[rowIndex] ? "bg-light_green" : "bg-[#f2f2f2]"
                  } my-[6px] relative`}
                  onMouseEnter={() => setHoveredSlot(`${rowIndex}-${colIndex}`)}
                  onMouseLeave={() => setHoveredSlot(null)}
                >
                  {hoveredSlot === `${rowIndex}-${colIndex}` && (
                    <div className="absolute bottom-full mb-1 bg-black text-white text-xs rounded py-1 px-2">
                      Available: {hours}h {minutes}m
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AvailabilityCalendar;