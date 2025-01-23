import React from "react";

const AvailabilityCalendar = () => {
  const timeSlots = [
    "00 - 04",
    "04 - 08",
    "08 - 12",
    "12 - 16",
    "16 - 20",
    "20 - 24",
  ];

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
            {Array(7)
              .fill(null)
              .map((_, colIndex) => (
                <div
                  key={colIndex}
                  className={`w-8 h-[19px] mx-auto ${
                    colIndex !== 0 && colIndex !== 5
                      ? "bg-light_green"
                      : "bg-[#f2f2f2]"
                  } my-[6px]`}
                ></div>
              ))}
          </React.Fragment>
        ))}
      </div>
      <div className="h-6 relative ">
        <div className="text-primary cursor-pointer absolute left-[50%] -translate-y-3 -translate-x-[50%] hidden group-hover:inline-block text-sm underline  ">
          View full availability
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
