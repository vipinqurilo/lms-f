import { cancelBooking } from "@/store/slices/bookingSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { toast } from "react-hot-toast";

const CancelBookingModel = ({ onClose, bookingId, booking }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.booking);
  const [reason, setReason] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [customReason, setCustomReason] = useState(false);
  
  const cancellationReasons = [
    "Schedule conflict with another appointment",
    "No longer available at this time",
    "Need to reschedule for a different date/time",
    "Issue with the selected subject/topic",
    "Found another teacher/student",
    "Personal emergency",
    "Other (please specify)"
  ];

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    return new Date(timeString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleReasonSelect = (selectedReason) => {
    if (selectedReason === "Other (please specify)") {
      setCustomReason(true);
      setReason("");
    } else {
      setCustomReason(true);
      setReason(selectedReason);
    }
  };

  const handleCancelBooking = () => {
    if (!reason.trim()) {
      toast.error("Please provide a reason for cancellation");
      return;
    }

    // Show confirmation modal
    setShowConfirmation(true);
  };

  const confirmCancellation = () => {
    dispatch(cancelBooking({ bookingId, reason }))
      .unwrap()
      .then(() => {
        onClose();
      })
      .catch((error) => {
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Main cancellation modal */}
      {!showConfirmation ? (
        <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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

          {/* Modal content */}
          <div className="text-start">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">
              Cancelling A Booking
            </h2>
            <p className="text-gray-600 mb-2 text-sm sm:text-base">
              Cancelling booking of{" "}
              <span className="text-primary font-medium">
                {formatDate(booking?.sessionDate)}
              </span>
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-4">
            {/* Left column - Booking details */}
            <div className="w-full md:w-1/3">
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                <h3 className="font-medium text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Booking Details</h3>
                <div className="flex flex-col gap-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subject:</span>
                    <span className="font-medium">{booking?.subject?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">
                      {formatTime(booking?.sessionStartTime)} - {formatTime(booking?.sessionEndTime)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{booking?.sessionDuration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{booking?.student ? "Student:" : "Teacher:"}</span>
                    <span className="font-medium">
                      {booking?.student 
                        ? `${booking.student.firstName} ${booking.student.lastName}`
                        : `${booking?.teacher?.firstName} ${booking?.teacher?.lastName}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Reason selection */}
            <div className="w-full md:w-2/3">
              <div className="mb-4 sm:mb-6">
                <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-2">
                  Reason for cancellation <span className="text-red-500">*</span>
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 sm:mb-4 text-xs sm:text-sm">
                  {cancellationReasons.map((cancelReason, index) => (
                    <div 
                      key={index}
                      onClick={() => handleReasonSelect(cancelReason)}
                      className={`px-2 sm:px-3 py-1 border rounded-lg cursor-pointer transition-all ${
                        reason === cancelReason && cancelReason !== "Other (please specify)" 
                          ? "border-secondary bg-secondary bg-opacity-10" 
                          : "border-gray-200 hover:border-secondary"
                      }`}
                    >
                      {cancelReason}
                    </div>
                  ))}
                </div>

                {customReason && (
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 h-24 sm:h-32 focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
                    placeholder="Please provide a reason for cancellation"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Cancel button */}
          <button
            disabled={!reason.trim() || isLoading?.cancelBooking}
            onClick={handleCancelBooking}
            className={`w-full ${
              !reason.trim() ? "bg-gray-400" : "bg-secondary hover:bg-red-600"
            } text-white py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base`}
          >
            {isLoading?.cancelBooking ? <Loader text="Cancelling..." /> : "Cancel Booking"}
          </button>
        </div>
      ) : (
        /* Confirmation modal */
        <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-sm">
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Confirm Cancellation</h3>
            <div className="bg-yellow-50 border border-yellow-200 p-3 sm:p-4 rounded-lg">
              <p className="text-yellow-700 font-medium text-sm sm:text-base">Are you sure you want to cancel this booking?</p>
              <p className="text-yellow-600 text-xs sm:text-sm mt-1">This action cannot be undone.</p>
            </div>
          </div>
          
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => setShowConfirmation(false)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
            >
              Go Back
            </button>
            <button
              onClick={confirmCancellation}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
            >
              {isLoading?.cancelBooking ? <Loader text="Cancelling..." /> : "Confirm"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CancelBookingModel;
