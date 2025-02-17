"use client";
import {
  Clock,
  Calendar,
  Video,
  CircleX,
  CircleCheckBig,
  ListRestart,
  FilePenLine,
} from "lucide-react";
import Image from "next/image";
import Loader from "@/components/common/Loader";

import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import BookingConfirmationModel from "@/components/common/BookingConfirmationModel";
import BackgroundModal from "@/components/instructor/BackgroundModal";
import CancelBookingModel from "@/components/common/CancelBookingModel";
import RescheduleBookingModel from "@/components/common/RescheduleBookingModel";
import EditMeetingLink from "@/components/common/EditMeetingLink"; 
import { useDispatch, useSelector } from "react-redux";
import { rescheduleResponseAsync } from "@/store/slices/student-dashboard/bookingSlice";

const BookingList = ({ bookings, isLoading }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathSegment = router.pathname.split("/")[1];
  const isAdmin = pathSegment === "admin-dashboard";
  const [booking, setBooking] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState("");
  const { authUser } = useSelector((state) => state.user);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center py-12">
            <Loader color={"text-primary"} isBig={true} />
          </div>
        ) : bookings.length > 0 ? (
          <>
            {bookings.map((booking) => {
              const sessionStartTime = new Date(booking.sessionStartTime);
              const sessionEndTime = new Date(booking.sessionEndTime);
              const timeUntilStart = sessionStartTime - currentTime;
              const timeUntilEnd = sessionEndTime - currentTime;
              const daysUntilStart = Math.floor(
                timeUntilStart / (1000 * 60 * 60 * 24)
              );
              const hours = Math.floor(
                (timeUntilStart / (1000 * 60 * 60)) % 24
              );
              const minutes = Math.floor((timeUntilStart / (1000 * 60)) % 60);
              const seconds = Math.floor((timeUntilStart / 1000) % 60);

              return (
                <div
                  key={booking._id}
                  className="bg-white relative rounded-lg shadow-sm px-6 py-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pl-5 ">
                      <div className="flex items-center gap-2 justify-between">
                        <h2 className="text-lg font-semibold  ">
                          {booking?.sessionDuration
                            ? `${booking.sessionDuration} minutes Lesson on ${
                                booking?.subject?.name || "Course Title"
                              }`
                            : booking?.subject?.name || "Course Title"}
                        </h2>
                      </div>
                      <hr className="my-3 w-[80%] " />

                      <div
                        className={`grid ${
                          isAdmin ? "grid-cols-12" : "grid-cols-10"
                        } gap-6 relative`}
                      >
                        {/* Instructor */}
                        <div className="col-span-2">
                          {authUser.role === "teacher" ? (
                            <>
                              <p className="mb-1 font-semibold">{`${booking?.student?.firstName} ${booking?.student?.lastName}`}</p>
                              <div className="flex items-center gap-2">
                                <Image
                                  width={28}
                                  height={28}
                                  src="/assets/tutor/Marlenereilly.jpg"
                                  alt="Student"
                                  className="rounded-full"
                                />
                                <span className="text-sm text-gray-600">
                                  Student
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              <p className="mb-1 font-semibold">{`${booking?.teacher?.firstName} ${booking?.teacher?.lastName}`}</p>
                              <div className="flex items-center gap-2">
                                <Image
                                  width={28}
                                  height={28}
                                  src="/assets/tutor/Marlenereilly.jpg"
                                  alt="Tutor"
                                  className="rounded-full"
                                />
                                <span className="text-sm text-gray-600">
                                  Instructor
                                </span>
                              </div>
                            </>
                          )}
                        </div>

                        {isAdmin ? (
                          <div className="col-span-2">
                            <p className=" mb-1 font-semibold">{`${booking?.student?.firstName} ${booking?.student?.lastName}`}</p>
                            <div className="flex items-center gap-2">
                              <Image
                                width={28}
                                height={28}
                                src="/assets/tutor/Marlenereilly.jpg"
                                alt="Tutor"
                                className="rounded-full"
                              />
                              <span className="text-sm text-gray-600 ">
                                Student{" "}
                              </span>
                            </div>
                          </div>
                        ) : null}
                        {/* Custom divider */}
                        <div className="absolute h-10 w-px bg-gray-300 left-[20%] top-1/2 -translate-y-1/2"></div>

                        {/* Session Timing */}
                        <div className="col-span-2 pl-8">
                          <p className="mb-1 font-semibold">Session Timing</p>
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
                        <div className="absolute h-10 w-px bg-gray-300 left-[40%] top-1/2 -translate-y-1/2"></div>

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
                        <div className="absolute h-10 w-px bg-gray-300 left-[60%] top-1/2 -translate-y-1/2"></div>

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
                                Starts in: {daysUntilStart}d {hours}h {minutes}m{" "}
                                {seconds}s
                              </span>
                            ) : (
                              <span className="text-green-500 text-sm">
                                Class is ongoing
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Custom divider */}
                        <div className="absolute h-10 w-px bg-gray-300 left-[80%] top-1/2 -translate-y-1/2"></div>

                        {/* Video Icon */}
                        <div className="col-span-2 flex  items-center justify-center gap-4">
                          <button
                            disabled={booking?.status === "cancelled"}
                            onClick={() => {
                              if (booking?.meetingLink) {
                                window.open(booking.meetingLink, "_blank");
                              }
                            }}
                          >
                            <Video className="h-5 w-5 text-gray-600 cursor-pointer" />
                          </button>

                          <button
                            disabled={booking?.status !== "scheduled"}
                            onClick={() => {
                              setBooking(booking);
                              setIsOpen("reschedule");
                            }}
                          >
                            <ListRestart className="h-5 w-5 text-gray-600  cursor-pointer" />
                          </button>

                          <button
                            disabled={booking?.status === "cancelled"}
                            onClick={() => {
                              setBooking(booking);
                              setIsOpen("cancelation");
                            }}
                          >
                            <CircleX className="h-5 w-5 text-gray-600 cursor-pointer" />
                          </button>

                          {booking?.status === "Confirmed" ? (
                            <button
                              disabled={booking?.status === "cancelled"}
                              onClick={() => {
                                setBooking(booking);
                                setIsOpen("edit");
                              }}
                            >
                              <FilePenLine className="h-5 w-5 text-gray-600 cursor-pointer" />
                            </button>
                          ) : (
                            <button
                              disabled={booking?.status === "cancelled"}
                              onClick={() => {
                                setBooking(booking);
                                setIsOpen("confiramation");
                              }}
                            >
                              <CircleCheckBig className="h-5 w-5 text-gray-600 cursor-pointer" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*  Status Tag */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        booking.status.toLowerCase() === "confirmed"
                          ? "text-green-600 bg-green-50"
                          : booking.status.toLowerCase() === "scheduled" ||
                            booking.status === "reschedule_in_progress"
                          ? "text-yellow-600 bg-yellow-50"
                          : "text-red-600 bg-red-50"
                      }`}
                    >
                      {booking.status === "reschedule_in_progress"
                        ? "Rescheduling"
                        : booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                    </span>
                  </div>
                  {/* buttons for reschedule and cancel */}
                  {booking?.status === "reschedule_in_progress" &&
                    authUser?.role === "student" && (
                      <div className="flex items-center gap-2 w-full justify-between pt-4 ">
                        <div className="flex items-center gap-2">
                          <h2 className="text-lg font-semibold">
                            Rescheduled to
                          </h2>
                          {new Date(
                            booking?.rescheduleRequest?.newTime
                          ).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}{" "}
                          at{" "}
                          {new Date(
                            booking?.rescheduleRequest?.newTime
                          ).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </div> 
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-1 text-sm rounded-full text-red-50 bg-red-600">
                            Deny
                          </button>
                          <button
                            onClick={() =>
                              dispatch(
                                rescheduleResponseAsync({
                                  bookingId: booking?._id,
                                  action: "accept",
                                })
                              )
                            }
                            className="px-3 py-1 text-sm rounded-full text-green-50 bg-green-600"
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    )}
                </div>
              );
            })}
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No booking found
          </div>
        
        )}
      </div>
      {isOpen === "confiramation" && (
        <BackgroundModal
          PropComponent={
            <BookingConfirmationModel
              type={isOpen}
              bookingId={booking?._id}
              onClose={() => setIsOpen("")}
            />
          }
        />
      )}
      {isOpen === "edit" && (
        <BackgroundModal
          PropComponent={
            <EditMeetingLink
              bookingId={booking?._id}
              meetingLink={booking?.meetingLink}
              onClose={() => setIsOpen("")}
            />
          }
        />
      )}
      {isOpen === "cancelation" && (
        <BackgroundModal
          PropComponent={
            <CancelBookingModel
              date={booking?.scheduledDate}
              bookingId={booking?._id}
              onClose={() => setIsOpen("")}
            />
          }
        />
      )}

      {isOpen === "reschedule" && (
        <BackgroundModal
          PropComponent={
            <RescheduleBookingModel
              rowBookings={bookings}
              booking={booking}
              onClose={() => setIsOpen("")}
            />
          }
        />
      )}
    </>
  );
};

export default BookingList;
