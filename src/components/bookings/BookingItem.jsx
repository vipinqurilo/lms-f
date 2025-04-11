"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Clock, 
  Calendar, 
  Video, 
  CircleX, 
  CircleCheckBig, 
  ListRestart, 
  FilePenLine 
} from "lucide-react";
import Loader from "@/components/common/Loader";
import Tooltip from "@/container/common/Tooltip";
import StatusBadge from "./StatusBadge";
import BookingActions from "./BookingActions";
import RescheduleApproval from "./RescheduleApproval";

const BookingItem = ({ 
  booking, 
  currentTime, 
  isAdmin, 
  authUser, 
  onActionClick, 
  onRescheduleResponse,
  isLoading 
}) => {
  const sessionStartTime = new Date(booking.sessionStartTime);
  const sessionEndTime = new Date(booking.sessionEndTime);
  const timeUntilStart = sessionStartTime - currentTime;
  const timeUntilEnd = sessionEndTime - currentTime;
  const daysUntilStart = Math.floor(timeUntilStart / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeUntilStart / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeUntilStart / (1000 * 60)) % 60);
  const seconds = Math.floor((timeUntilStart / 1000) % 60);

  return (
    <div className="bg-white relative rounded-lg shadow-sm px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 pl-5">
          <div className="flex items-center gap-2 justify-between">
            <h2 className="text-lg font-semibold">
              {booking?.sessionDuration
                ? `${booking.sessionDuration} minutes Lesson on ${
                    booking?.subject?.name || "Course Title"
                  }`
                : booking?.subject?.name || "Course Title"}
            </h2>
          </div>
          <hr className="my-3 w-[80%]" />

          <div
            className={`grid ${
              isAdmin ? "grid-cols-12" : "grid-cols-10"
            } gap-6 relative`}
          >
            {/* Instructor/Student */}
            <div className={`${isAdmin ? "col-span-2" : "col-span-2"}`}>
              {authUser?.role === "teacher" ? (
                <>
                  <p className="mb-1 font-semibold">{`${booking?.student?.firstName} ${booking?.student?.lastName}`}</p>
                  <div className="flex items-center gap-2">
                    <Image
                      width={28}
                      height={28}
                      src={booking?.student?.profilePhoto || "/assets/tutor/profile.png"}
                      alt="Student"
                      className="rounded-full"
                    />
                    <span className="text-sm text-gray-600">Student</span>
                  </div>
                </>
              ) : (
                <>
                  <p className="mb-1 font-semibold">{`${booking?.teacher?.firstName} ${booking?.teacher?.lastName}`}</p>
                  <div className="flex items-center gap-2">
                    <Image
                      width={28}
                      height={28}
                      src={booking?.teacher?.profilePhoto || "/assets/tutor/profile.png"}
                      alt="Tutor"
                      className="rounded-full"
                    />
                    <span className="text-sm text-gray-600">Instructor</span>
                  </div>
                </>
              )}
            </div>

            {isAdmin ? (
              <>
                <div className="absolute h-10 w-px bg-gray-300 top-1/2 -translate-y-1/2 left-[15%]"></div>
                <div className="col-span-2">
                  <p className="mb-1 font-semibold">{`${booking?.student?.firstName} ${booking?.student?.lastName}`}</p>
                  <div className="flex items-center gap-2">
                    <Image
                      width={28}
                      height={28}
                      src="/assets/tutor/Marlenereilly.jpg"
                      alt="Tutor"
                      className="rounded-full"
                    />
                    <span className="text-sm text-gray-600">Student</span>
                  </div>
                </div>
              </>
            ) : null}

            {/* Custom divider */}
            <div
              className={`absolute h-10 w-px bg-gray-300 top-1/2 -translate-y-1/2 ${
                isAdmin ? "left-[33.33%]" : "left-[20%]"
              }`}
            ></div>

            {/* Session Timing */}
            <div className={`col-span-2 ${isAdmin ? "pl-2" : "pl-8"}`}>
              <p className="mb-1 font-semibold">Session Timing</p>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="text-sm text-nowrap">
                  {`${new Date(booking.sessionStartTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })} - ${new Date(booking.sessionEndTime).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}`}
                </span>
              </div>
            </div>

            {/* Custom divider */}
            <div
              className={`absolute h-10 w-px bg-gray-300 top-1/2 -translate-y-1/2 ${
                isAdmin ? "left-[50%]" : "left-[40%]"
              }`}
            ></div>

            {/* Booking Date */}
            <div className={`col-span-2 ${isAdmin ? "pl-2" : "pl-8"}`}>
              <p className="mb-1 font-semibold">Booking Date</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-red-500" />
                <span className="text-sm">
                  {new Date(booking.sessionStartTime).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </span>
              </div>
            </div>

            {/* Custom divider */}
            <div
              className={`absolute h-10 w-px bg-gray-300 top-1/2 -translate-y-1/2 ${
                isAdmin ? "left-[66.66%]" : "left-[60%]"
              }`}
            ></div>

            {/* Status */}
            <div className={`col-span-2 ${isAdmin ? "pl-1" : "pl-8"}`}>
              <p className="mb-1 font-semibold">Status</p>
              <div>
                {timeUntilEnd < 0 ? (
                  <span className="text-red-500 text-sm">Class has Ended</span>
                ) : timeUntilStart > 0 ? (
                  <span className="text-orange-500 text-sm">
                    Starts in: {daysUntilStart}d {hours}h {minutes}m {seconds}s
                  </span>
                ) : (
                  <span className="text-green-500 text-sm">
                    Class is ongoing
                  </span>
                )}
              </div>
            </div>

            {/* Custom divider */}
            <div
              className={`absolute h-10 w-px bg-gray-300 top-1/2 -translate-y-1/2 ${
                isAdmin ? "left-[87%]" : "left-[80%]"
              }`}
            ></div>

            {/* Action Buttons */}
            <BookingActions
              booking={booking}
              timeUntilStart={timeUntilStart}
              daysUntilStart={daysUntilStart}
              authUser={authUser}
              isLoading={isLoading}
              onActionClick={onActionClick}
            />
          </div>
        </div>
      </div>

      {/* Status Badges */}
      <StatusBadge booking={booking} />

      {/* Reschedule approval UI */}
      <RescheduleApproval
        booking={booking}
        authUser={authUser}
        onRescheduleResponse={onRescheduleResponse}
        isLoading={isLoading}
      />
    </div>
  );
};

export default BookingItem; 