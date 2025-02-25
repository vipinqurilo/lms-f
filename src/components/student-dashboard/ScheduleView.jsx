import { format, startOfWeek, addDays } from "date-fns";
import { useRouter } from "next/router";
import { useState } from "react";
import { Calendar } from "../common/Calendar";
import { SkeletonLoader } from "../common/SkeletonLoader";

export default function ScheduleView({
  startDate,
  setStartDate,
  bookings,
  bookingLoading,
  link,
}) {
  const router = useRouter();
  const [showCalendar, setShowCalendar] = useState(false);
  // Add this function to get color based on booking ID
  const getBookingColor = (id) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-pink-500",
    ];
    // Use the sum of char codes from the ID to determine color index
    const charSum = id
      .split("")
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
  };
  console.log(startDate, "startDate");
  // Get the start of the week from the startDate
  const weekStart = startOfWeek(startDate);
  // Generate array of dates for the current week
  const weekDates = [...Array(7)].map((_, i) => addDays(weekStart, i));

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg border border-gray-200 shadow-sm space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-gray-800">Schedule</h2>

          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="p-2 flex justify-center items-center hover:bg-gray-50 relative rounded-lg transition-colors"
          >
            <span className="absolute top-[50%] -translate-y-1/2 right-[110%] text-sm text-gray-600">
              {format(startDate, "MMM")}
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-gray-400"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {showCalendar && (
              <div className="absolute top-full right-0 mt-2 border rounded-lg shadow-lg z-50">
                <Calendar
                  selectedDate={startDate}
                  onDateSelect={setStartDate}
                />
              </div>
            )}
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-1 text-gray-400 font-medium">
              {day}
            </div>
          ))}
          {weekDates.map((date) => (
            <button
              key={date.toString()}
              onClick={() => setStartDate(date)}
              className={`py-1 rounded-full w-8 h-8 mx-auto font-medium ${
                format(date, "yyyy-MM-dd") === format(startDate, "yyyy-MM-dd")
                  ? "bg-indigo-500 text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {format(date, "d")}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl text-gray-800">Lessons</h3>
          <button
            onClick={() => router.push(link)}
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            View all
          </button>
        </div>

        <div className="space-y-3">
          {bookingLoading ? (
            <SkeletonLoader />
          ) : bookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No bookings the day</p>
            </div>
          ) : (
            bookings?.slice(0, 3).map((booking) => {
              const startTime = new Date(booking.sessionStartTime);
              const endTime = new Date(
                startTime.getTime() + booking.sessionDuration * 60000
              );

              return (
                <div
                  key={booking._id}
                  className="p-4 bg-white border rounded-xl flex items-center justify-between relative overflow-hidden"
                >
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 ${getBookingColor(
                      booking._id
                    )}`}
                  />
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">
                      {booking.teacher.firstName} {booking.teacher.lastName}
                    </p>
                    <p className="font-medium text-gray-800">
                      {booking.subject.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {format(startTime, "hh:mm a")} -{" "}
                      {format(endTime, "hh:mm a")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {booking.teacher.profilePhoto ? (
                        <img
                          src={booking.teacher.profilePhoto}
                          alt={`${booking.teacher.firstName} ${booking.teacher.lastName}`}
                          className="w-8 h-8 rounded-full border-2 border-white object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white" />
                      )}
                    </div>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="text-gray-400"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
