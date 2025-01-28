import React, { useState, useEffect } from "react";
import { FaCaretRight } from "react-icons/fa";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";

const data = {
  Sun: [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ],
  Mon: [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
  ],
  Tue: [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    false,
    true,
    true,
    true,
    true,
  ],
  Wed: [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    false,
  ],
  Thu: [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ],
  Fri: [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
  ],
  Sat: [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ],
};

const bookings = [
  {
    date: "2025-01-26", // ISO 8601 format (YYYY-MM-DD)
    startTime: "20:00", // 24-hour format (HH:mm)
    endTime: "21:00", // 24-hour format (HH:mm)
  },
  {
    date: "2025-01-27",
    startTime: "10:00",
    endTime: "11:30",
  },
  {
    date: "2025-01-28",
    startTime: "15:00",
    endTime: "16:00",
  },
  {
    date: "2025-01-29",
    startTime: "14:00",
    endTime: "15:30",
  },
];

const AvailabilityCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [currentTime, setCurrentTime] = useState(null);
  const [days, setDays] = useState([]);
  const [formattedDateRange, setFormattedDateRange] = useState("");

  useEffect(() => {
    const calculateDays = () => {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() + currentWeek * 7);

      const weekDays = Array.from({ length: 7 }, (_, i) => {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);

        const weekday = day.toLocaleDateString("en-US", { weekday: "short" }); // Short weekday name (e.g., "Mon")
        const date = day.getDate(); // Day of the month (e.g., 26)
        const month = day.toLocaleDateString("en-US", { month: "short" }); // Short month name (e.g., "Jan")
        const year = day.getFullYear(); // Full year (e.g., 2025)

        return {
          label: `${weekday} ${date}`, // Label with only weekday and date
          month: month, // Month (e.g., "Jan")
          year: year, // Year (e.g., 2025)
          isToday: today.toDateString() === day.toDateString(), // Check if it's today
        };
      });

      setDays(weekDays);
    };

    const calculateDateRange = () => {
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() + currentWeek * 7);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      setFormattedDateRange(
        `${startOfWeek.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })} – ${endOfWeek.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}`
      );
    };

    calculateDays();
    calculateDateRange();
  }, [currentWeek]);

  const times = Array.from({ length: 96 }, (_, index) => {
    const hours = Math.floor(index / 4)
      .toString()
      .padStart(2, "0");
    const minutes = (index % 4) * 15;
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  });
  const isBooked = (dayIndex, timeIndex) => {
    if (!days[dayIndex]) return false;

    const selectedDate = new Date();
    selectedDate.setDate(selectedDate.getDate() + currentWeek * 7 + dayIndex);
    selectedDate.setHours(0, 0, 0, 0);

    const timeSlot = times[timeIndex]; // Time in "HH:mm" format

    return bookings.some((booking) => {
      const bookingDate = new Date(booking.date);
      const bookingStart = new Date(`${booking.date}T${booking.startTime}`);
      const bookingEnd = new Date(`${booking.date}T${booking.endTime}`);

      // Adjust the selected time slot into the same date format as booking start and end
      const [hours, minutes] = timeSlot.split(":");
      const slotTime = new Date(selectedDate);
      slotTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

      return (
        bookingDate.toDateString() === selectedDate.toDateString() &&
        slotTime >= bookingStart &&
        slotTime < bookingEnd
      );
    });
  };
  const isAvailable = (dayIndex, timeIndex) => {
    if (!data || !days[dayIndex]) return false;

    const dayLabel = days[dayIndex].label.split(" ")[0]; // e.g., "Sun", "Mon", etc.
    const dayAvailability = data[dayLabel];

    // Extract the date, month, and year from the days array
    const [dayOfWeek, dateStr] = days[dayIndex].label.split(" ");
    const date = Number.parseInt(dateStr); // Get the date part (e.g., "26" for "Sun 26")
    const month = days[dayIndex].month; // Month as string (e.g., "Jan")
    const year = days[dayIndex].year; // Year as number (e.g., 2025)

    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth(); // Get current month as a number (0-11)
    const todayYear = today.getFullYear();

    // Convert the selected month to a number (0-11)
    const selectedMonth = new Date(`${month} 1, ${year}`).getMonth();

    // If the selected date's year is before today's year, return false
    if (year < todayYear) {
      return false;
    }

    // If the selected date's year is the same as today's, check the month and date
    if (year === todayYear) {
      if (selectedMonth < todayMonth) {
        return false; // Month is before today's month
      }
      if (selectedMonth === todayMonth && date < todayDate) {
        return false; // Date is before today's date in the same month
      }
    }

    const spanIndex = Math.floor(timeIndex / 2); // Every two 15-minute slots correspond to one 30-minute span

    // If the spanIndex is out of bounds, return false
    if (!dayAvailability || spanIndex >= dayAvailability.length) {
      return false;
    }

    const available = dayAvailability[spanIndex];

    // Check if the slot is booked
    if (isBooked(dayIndex, timeIndex)) {
      return false; // Booked slots are not available
    }

    return available; // Return true only if the 30-minute span is available
  };

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    // Initialize currentTime
    updateTime();

    // Update currentTime every second
    const intervalId = setInterval(updateTime, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className=" h-full ">
      <div
        style={{
          scrollbarWidth: "thin" /* Firefox ke liye */,
          scrollbarColor: "#888 #f1f1f1" /* Firefox ke liye color */,
        }}
        className="h-[calc(100%-60.8px)] overflow-y-auto"
      >
        {" "}
        <div className="flex items-center gap-4 text-sm px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-200" />
            <span className="text-[13px] font-semibold text-[#8c8c8c]">
              NOT AVAILABLE
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-200" />
            <span className="text-[13px] font-semibold text-[#8c8c8c]">
              AVAILABLE
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-[13px] font-semibold text-[#8c8c8c]">
              BOOKED
            </span>
          </div>
        </div>
        <div className="w-full bg-[#F2F2F2] text-sm flex justify-center items-center py-2">
          <span className="text-black">Note:</span>This calendar is to only
          check teacher's availability
        </div>
        <div className="flex items-center justify-between px-4 gap-4">
          <div className="flex text-[13px] text-[#8c8c8c] font-semibold">
            <span>My current time: </span>
            <span>
              {currentTime
                ? `${currentTime.toLocaleTimeString("en-US", {
                    hour12: false,
                  })} (${Intl.DateTimeFormat().resolvedOptions().timeZone})`
                : "Loading..."}
            </span>
          </div>

          <div className="flex justify-center items-center">
            <div className="text-[13px] text-[#8c8c8c] font-semibold">
              {formattedDateRange}
            </div>

            <button
              onClick={() => setCurrentWeek(currentWeek - 1)}
              className="px-2 py-2"
            >
              <LiaAngleLeftSolid size={20} />
            </button>

            <button
              onClick={() => setCurrentWeek(currentWeek + 1)}
              className="px-2 py-2"
            >
              <LiaAngleRightSolid size={20} />
            </button>
            <button
              onClick={() => setCurrentWeek(0)}
              className="px-4 py-2 text-[14px] font-semibold"
            >
              TODAY
            </button>
          </div>
        </div>
        <div className="grid grid-cols-[40px_repeat(7,_1fr)] text-sm mb-4 mx-4 border ">
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1, // Ensure it stays above other elements
            }}
            className="border-r h-[50px] flex justify-center items-center  bg-white text-center p-2 font-medium"
          ></div>
          {days.map((day, index) => (
            <div
              key={index}
              className={`border-r h-[50px] flex justify-center items-center text-center p-2 font-medium ${
                day.isToday ? "bg-[#FEF5E5] text-secondary" : "bg-white"
              }`}
              style={{
                position: "sticky",
                top: 0,
                zIndex: 1, // Ensure it stays above other elements
              }}
            >
              {day.label}
            </div>
          ))}

          {times.map((time, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <div
                className={`border-t text-[12px] h-[17px] px-1 text-center bg-white relative`}
              >
                {rowIndex % 2 === 0 ? (
                  <>
                    {time}
                    {/* Add red timeline */}
                    {currentTime &&
                      rowIndex ===
                        Math.floor(
                          (currentTime.getHours() * 60 +
                            currentTime.getMinutes()) /
                            15
                        ) && (
                        <FaCaretRight
                          size={10}
                          className="absolute text-secondary -translate-x-[6px] left-0 top-[50%] -translate-y-[50%]"
                        />
                      )}
                  </>
                ) : (
                  <div className="invisible">00:00</div>
                )}
              </div>
              {days.map((_, colIndex) => {
                const isBeforeCurrentTime =
                  days[colIndex]?.isToday &&
                  currentTime &&
                  rowIndex <
                    Math.floor(
                      (currentTime.getHours() * 60 + currentTime.getMinutes()) /
                        15
                    );

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`border-l p-1 relative ${
                      isBooked(colIndex, rowIndex)
                        ? "bg-red-500 border-t border-red-600" // Booked slots are red
                        : isAvailable(colIndex, rowIndex) &&
                          !isBeforeCurrentTime
                        ? "bg-bg_green border-t border-light_green" // Available slots are green
                        : isBeforeCurrentTime
                        ? "bg-[#FEF5E5] border-t border-gray-200" // Slots before current time are secondary
                        : "border-y border-gray-200" // Not available slots are gray
                    }`}
                  >
                    {/* Add red timeline to first two columns */}
                    {colIndex === 0 &&
                      currentTime &&
                      rowIndex ===
                        Math.floor(
                          (currentTime.getHours() * 60 +
                            currentTime.getMinutes()) /
                            15
                        ) && (
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: 0,
                            height: "2px",
                            width: "100%",
                            backgroundColor: "#eda256",
                          }}
                        ></div>
                      )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
