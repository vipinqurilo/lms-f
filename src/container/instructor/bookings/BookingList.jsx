"use client";
import {
  Clock,
  Calendar,
  Video,
  Cross,
  Ban,
  CircleX,
  CircleCheckBig,
} from "lucide-react";
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
                className="bg-white rounded-lg shadow-sm px-6 py-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 pl-6 ">
                    <div className="flex items-center gap-2 justify-between">
                      <h2 className="text-lg font-semibold  ">
                        {booking?.subject?.name || "Course Title"}
                      </h2>
                      <span className="text-sm bg-green-50 rounded-full px-4 py-1  text-green-500">
                        Scheduled
                      </span>
                    </div>
                    <hr className="my-3 w-[80%] " />

                    <div className="grid grid-cols-9 gap-8 relative">
                      {/* Instructor */}
                      <div className="col-span-2">
                        <p className=" mb-1 font-semibold">{`${booking.teacher.firstName} ${booking.teacher.lastName}`}</p>
                        <div className="flex items-center gap-2">
                          <Image
                            width={28}
                            height={28}
                            src="/assets/tutor/Marlenereilly.jpg"
                            alt="Tutor"
                            className="rounded-full"
                          />
                          <span className="text-sm text-gray-600 ">
                            instructor{" "}
                          </span>
                        </div>
                      </div>

                      {/* Custom divider */}
                      <div className="absolute h-10 w-px bg-gray-300 left-[22%] top-1/2 -translate-y-1/2"></div>

                      {/* Course Timing */}
                      <div className="col-span-2 pl-8">
                        <p className="mb-1 font-semibold">Course Timing</p>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-orange-500" />
                          <span className="text-sm">
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
                      </div>

                      {/* Custom divider */}
                      <div className="absolute h-10 w-px bg-gray-300 left-[44%] top-1/2 -translate-y-1/2"></div>

                      {/* Booking Date */}
                      <div className="col-span-2 pl-8">
                        <p className="mb-1 font-semibold">Booking Date</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-red-500" />
                          <span className="text-sm">
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

                      {/* Custom divider */}
                      <div className="absolute h-10 w-px bg-gray-300 left-[66%] top-1/2 -translate-y-1/2"></div>

                      {/* Status */}
                      <div className="col-span-2 pl-8">
                        <p className="mb-1 font-semibold">Status</p>
                        <div>
                          {timeUntilEnd < 0 ? (
                            <span className="text-red-500 text-sm">
                              Class has Ended
                            </span>
                          ) : timeUntilStart > 0 ? (
                            <span className="text-orange-500 text-sm">
                              Starts in: {hours}h {minutes}m {seconds}s
                            </span>
                          ) : (
                            <span className="text-green-500 text-sm">
                              Class is ongoing
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Custom divider */}
                      <div className="absolute h-10 w-px bg-gray-300 left-[88%] top-1/2 -translate-y-1/2"></div>

                      {/* Video Icon */}
                      <div className="col-span-1 flex  items-center justify-center gap-4">
                        <Video className="h-5 w-5 text-gray-600" />
                        <CircleX className="h-5 w-5 text-gray-600" />
                        <CircleCheckBig className="h-5 w-5 text-gray-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scheduled Tag */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 text-sm text-green-600 bg-green-50 rounded-full">
                    {booking.status}
                  </span>
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
