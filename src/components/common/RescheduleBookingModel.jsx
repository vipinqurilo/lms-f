import ScheduleCalendar from "@/container/booking/ScheduleCalendar";
import { fetchAvailabilityByIdAsync } from "@/store/slices/instructor/availabilitySlice";
import {
  confirmBooking,
  rescheduleBooking,
} from "@/store/slices/instructor/bookingsSlice";
import { ArrowLeft, MoveLeft } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";

const  RescheduleBookingModel = ({ onClose, booking, rowBookings }) => {
  const dispatch = useDispatch();
  // console.log(booking,'booking bookingbookingbookingbookingbooking')
  const [isOpen, setIsOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(null);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [sessionEndTime, setSessionEndTime] = useState(null);
  const  {currentAvailability, isLoading}  = useSelector(
    (state) => state.instructor.availability  
  );
  
  
  const [reason, setReason] = useState("");
  const hasFetchedRef = useRef(false);

  const handleReschedule = () => {
    if (!sessionStartTime) {
      alert("Please select a new time.");
      return;
    }
    if (!reason.trim()) {
      alert("Please enter a reason for rescheduling.");
      return;
    }
    if (new Date(sessionStartTime) < new Date()) {
      alert("You cannot schedule time in the past.");
      return;
    }

    dispatch(
      rescheduleBooking({
        bookingId: booking._id,
        newTime: sessionStartTime,
        reason,
      })
    )
      .unwrap()
      .then(() => {
        onClose();
      });
  };
  
  useEffect(() => {
    if (booking?.teacher?._id && !hasFetchedRef.current) {
      dispatch(fetchAvailabilityByIdAsync(booking?.teacher?._id));
      hasFetchedRef.current = true;
    }
  }, [dispatch, booking?.teacher?._id]);

  
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div
          className={`bg-white rounded-lg  ${
            isOpen
              ? "w-[90vw] h-[90vh] relative overflow-y-hidden "
              : "w-[40vw]"
          }  mx-4`}
        >
          {!isOpen ? (
            <div className="p-8 w-full">
              <div className="flex justify-end ">
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-navy-900 mb-2">
                  Do You Want to Reschedule?
                </h2>
                <p className="text-gray-500 mb-6">
                  Send a Video Link to the approved Students
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="w-full py-3 bg-secondary text-white rounded-lg hover:bg-opacity-95 transition-colors"
                  >
                    Reschedule
                  </button>

                  <button
                    onClick={onClose}
                    className="w-full py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className=" flex flex-col divide-y-2 ">
              <div className="relative w-full flex justify-center items-center mt-8">
                <h2 className="text-2xl font-bold text-navy-900 mb-2">
                  Reschedule Booking
                </h2>

                <button
                  className="absolute text-black top-0 left-10 flex justify-center items-center gap-2 font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  <ArrowLeft /> Back
                </button>
                <div className="flex justify-end absolute right-10 top-0">
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700  "
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="h-[65vh]">
                {isLoading?.[fetchAvailabilityByIdAsync] ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
                    <Loader isBig={true} color={"text-secondary"} />
                  </div>
                ) : (
                  <ScheduleCalendar
                    rawBookings={rowBookings}
                    scheduledDate={scheduledDate}
                    setScheduledDate={setScheduledDate}
                    sessionStartTime={sessionStartTime}
                    setSessionStartTime={setSessionStartTime}
                    sessionEndTime={sessionEndTime}
                    setSessionEndTime={setSessionEndTime}
                    calendar={currentAvailability}
                    duration={booking.sessionDuration}
                  />
                )}
              </div>

              <div className="flex justify-between items-start w-full px-10 py-4">
                {/* Reason input */}
                <div className=" flex justify-start items-start w-2/3 space-x-4">
                  <label className="block text-gray-700 text-lg mb-2">
                    Reason
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-14 focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="Eg. your text here"
                  />
                </div>

                <button
                  onClick={() => handleReschedule()}
                  className=" px-8 py-2 w-fit bg-secondary text-white rounded-lg hover:bg-opacity-95 transition-colors"
                >
                  Reschedule
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RescheduleBookingModel;
