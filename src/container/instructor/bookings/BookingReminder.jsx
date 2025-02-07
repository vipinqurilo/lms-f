import { Clock, User } from "lucide-react";

const BookingReminder = ({ booking }) => {
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
              {booking?.courseName || booking?.subject?.name || "Your lesson"}
            </p>
            <h3 className="font-semibold">{booking.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                by {booking.teacher.firstName} {booking.teacher.lastName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingReminder;
