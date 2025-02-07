"use client";
import { Clock, Calendar, Video } from "lucide-react";
import Image from "next/image";
import { Pagination } from "@/components/student-dashboard/Pagination";
import Loader from "@/components/common/Loader";

const BookingList = ({
  bookings,
  isLoading,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="text-center py-12">
          <Loader color={"text-primary"} isBig={true} />
        </div>
      ) : bookings.length > 0 ? (
        <>
          {bookings.map((booking) => {
            const currentTime = new Date();
            const sessionStartTime = new Date(booking.sessionStartTime);
            const sessionEndTime = new Date(booking.sessionEndTime);
            const timeUntilStart = sessionStartTime - currentTime;
            const timeUntilEnd = sessionEndTime - currentTime;
            const hours = Math.floor((timeUntilStart / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeUntilStart / (1000 * 60)) % 60);
            const seconds = Math.floor((timeUntilStart / 1000) % 60);

            return (
              <div
                key={booking._id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="flex gap-10 p-4">
                  {/* Tutor Image and Details */}
                  <div className="flex items-center gap-4">
                    <Image
                      width={128}
                      height={128}
                      src="/assets/tutor/Marlenereilly.jpg" // Default tutor image
                      alt="Tutor"
                      className="rounded-xl object-cover w-[80px] h-[80px]"
                    />
                    <div className="items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span>{`${booking.teacher.firstName} ${booking.teacher.lastName}`}</span>
                      </div>
                      <span className="text-xs text-emerald-700 font-semibold">
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-l border-gray-300 mx-4"></div>

                  {/* Booking Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-2">
                      {booking?.subject?.name || "N/A"}
                    </h3>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          {`${new Date(
                            booking.sessionStartTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })} - ${new Date(
                            booking.sessionEndTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(
                            booking.sessionStartTime
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    {/* Timer for the booked class */}
                    <div className="text-sm text-gray-600 mt-2">
                      {timeUntilEnd < 0 ? (
                        <span className="text-red-500">Class has ended</span>
                      ) : timeUntilStart > 0 ? (
                        <span>
                          Starts in: {hours}h {minutes}m {seconds}s
                        </span>
                      ) : (
                        <span className="text-green-500">Class is ongoing</span>
                      )}
                    </div>
                  </div>

                  {/* Action Icon */}
                  <div className="flex flex-col items-end justify-between">
                    <span className="text-sm text-gray-500 cursor-pointer hover:text-gray-800">
                      <Video />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No one-o-one bookings found
        </div>
      )}
    </div>
  );
};

export default BookingList;
