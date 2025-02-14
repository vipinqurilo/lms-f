import React from "react";
import Image from "next/image";

const BookingConfirmationModel = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[500px] relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute right-4 top-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Modal content */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Confirmation</h2>
          <p className="text-gray-600 mb-8">Stream. says wants to Confirm</p>

          {/* Meeting options */}
          <div className="flex justify-center gap-8 mb-8">
            {/* Zoom option */}
            <div className="text-center">
              <div className="w-16 h-16  shadow-[0_4px_18px_rgba(0,0,0,0.1)] rounded-full flex items-center justify-center mx-auto mb-2">
                <Image
                  src="/assets/common/zoom.png"
                  alt="Zoom"
                  width={32}
                  height={32}
                />
              </div>
              <p>Zoom Link</p>
            </div>

            {/* Google Meet option */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white shadow-[0_4px_18px_rgba(0,0,0,0.1)] rounded-full flex items-center justify-center mx-auto mb-2">
                <Image
                  src="/assets/common/meet.png"
                  alt="Google Meet"
                  width={32}
                  height={32}
                />
              </div>
              <p>Google Meet</p>
            </div>
          </div>

          {/* Cancel button */}
          <button
            onClick={onClose}
            className="w-1/2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-[0_0_4px_rgba(0,0,0,0.1)]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationModel;
