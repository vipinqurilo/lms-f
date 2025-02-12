import React from "react";

const DeleteCategoriesModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(); // Execute the approve action
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Are you sure you want to delete this category?
        </h2>
        <p className="text-gray-500 mb-6">This action cannot be undone.</p>
        
        <div className="flex justify-center space-x-4">
          <button
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={handleConfirm} // Confirm action
          >
            Confirm
          </button>
          <button
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
            onClick={onClose} // Cancel action
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoriesModal;

