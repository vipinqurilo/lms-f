import Loader from "@/components/common/Loader";
import React from "react";
import { RxCross2 } from "react-icons/rx";

const RejectModal = ({
  isOpen,
  onClose,
  onReject,
  rejectionReason,
  setRejectionReason,
  loading,
}) => {
  if (!isOpen) return null; // Don't render if the modal is not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
          onClick={onClose}
        >
          <RxCross2 size={22} />
        </button>

        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Rejecting a Request
        </h2>
        <p className="text-gray-500 mb-4">
          Rejecting a Request for booking on{" "}
          <span className="text-red-500 font-medium">
            4 February, 2025 12:00
          </span>
        </p>

        <label className="text-gray-700 font-medium">Reason</label>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 mt-2 h-28 focus:outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Eg. your text here"
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
        ></textarea>

        <div className="flex justify-end mt-4">
          <button
            className="px-5 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
            onClick={() => {
              onReject(); // Invoke the reject function
            }}
          >
            {loading ? <Loader /> : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;
