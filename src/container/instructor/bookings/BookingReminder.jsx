import { Clock, User } from "lucide-react";

const BookingReminder = ({ bookings }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm mb-8">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <Clock className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Reminder:{" "}
              {bookings[0]?.courseName ||
                bookings[0]?.subject?.name ||
                bookings[0]?.title ||
                "Your lesson"}
            </p>
            <h3 className="font-semibold">{bookings[0].title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                by {bookings[0]?.teacher?.firstName}{" "}
                {bookings[0]?.teacher?.lastName}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm">
            Available at{" "}
            {new Date(bookings[0]?.sessionStartTime)?.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span className="text-sm text-gray-500">{bookings[0]?.countdown}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingReminder;
