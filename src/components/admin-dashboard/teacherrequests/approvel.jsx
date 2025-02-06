import React from "react";

const ApprovelModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Do you really want to approve the Request?
        </h2>
        <p className="text-gray-500 mb-4">This action cannot be undone.</p>
        <button
          className="w-full py-2 bg-red-600 text-white font-semibold rounded-lg mb-3"
          onClick={onConfirm}
        >
          Confirm
        </button>
        <button
          className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ApprovelModal;
