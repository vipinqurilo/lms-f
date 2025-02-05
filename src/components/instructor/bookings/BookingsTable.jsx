import React from "react";

export const BookingsTable = ({ bookings, searchQuery, selectedSlot }) => {
  const filteredBookings = bookings.filter(
    ({ student, timeSlot }) =>
      (student.toLowerCase().includes(searchQuery.toLowerCase()) ||
        searchQuery === "") &&
      (selectedSlot === "" || timeSlot === selectedSlot)
  );

  return (
    <div className="overflow-x-auto border rounded-lg mt-4">
      <table className="w-full">
        <thead className="text-left text-sm text-gray-500">
          <tr>
            <th className="px-4 py-3">Booking Date</th>
            <th className="px-4 py-3">Student</th>
            <th className="px-4 py-3">Instructor</th>
            <th className="px-4 py-3">Time Slot</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {filteredBookings.map((booking, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-3">{booking.date}</td>
              <td className="px-4 py-3">{booking.student}</td>
              <td className="px-4 py-3">{booking.instructor}</td>
              <td className="px-4 py-3">{booking.timeSlot}</td>
              <td className="px-4 py-3 text-green-600">{booking.status}</td>
              <td className="px-4 py-3">
                <button>
                  {/* <ChevronDown className="w-5 h-5 text-gray-400" /> */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
