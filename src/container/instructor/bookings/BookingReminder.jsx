import { Clock, User, Video } from "lucide-react";

const BookingReminder = ({ bookings }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm mb-8">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <Clock className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <p className="text-lg text-gray-500">
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
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end gap-2  ">
            <span className=" text-gray-600 px-6 py-[6px]  border border-gray-300 rounded-md text-sm flex items-center gap-4">
              <Video className="h-6 w-6 text-gray-600" />
              Available on{" "}
              {new Date(bookings[0]?.sessionStartTime)?.toLocaleString([], {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span className="text-sm text-gray-500">
              {bookings[0]?.countdown}
            </span>
          </div>
          {/* <div className="h-10 px-3 gap-2 bg-gray-100 rounded-lg flex items-center justify-center  ">
            <span className="text-xs text-gray-600">Join</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BookingReminder;
