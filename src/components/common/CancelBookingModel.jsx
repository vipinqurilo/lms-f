import { cancelBooking } from "@/store/slices/instructor/bookingsSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const CancelBookingModel = ({ date, onClose, bookingId }) => {
  const dispatch = useDispatch();
  const [reason, setReason] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-[500px] max-w-[95%]">
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
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Cancelling A Booking
          </h2>
          <p className="text-gray-600 mb-6">
            Cancelling booking of{" "}
            <span className="text-primary">
              {date
                ? new Date(date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "17 June 2002"}
            </span>
          </p>
        </div>

        {/* Reason input */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg mb-2">Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-secondary"
            placeholder="Eg. your text here"
          />
        </div>

        {/* Cancel button */}
        <button
          disabled={reason === ""}
          onClick={() =>
            dispatch(cancelBooking({ bookingId: bookingId, reason: reason }))
              .unwrap()
              .then((res) => {
                onClose();
              })
          }
          className="w-full bg-secondary text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CancelBookingModel;
