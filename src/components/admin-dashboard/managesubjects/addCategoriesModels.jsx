import React from "react";

const AddCategories = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-6/12">
        <h2 className="text-xl font-semibold mb-4">Add Category</h2>
        <label className="block mb-2 text-sm font-medium">
          Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full border p-2 rounded mb-4"
          placeholder="Enter identifier"
        />

       

         
        <div className="flex justify-end space-x-2 mt-7">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="bg-secondary text-white px-4 py-2 rounded">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategories;
