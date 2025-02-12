import React, { useState, useEffect } from "react";

const EditCategories = ({ isOpen, onClose, category, onSave }) => {
  if (!isOpen) return null;

  const [name, setName] = useState(category?.name || "Null");

  // Update state when a new category is selected
  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-6/12 relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-lg font-semibold text-gray-700 mb-4">Edit Category</h2>

        <label className="block text-gray-700 font-medium mb-1">Name</label>
        <input
          type="text"
          className="w-full border p-2 rounded-lg"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end mt-4 space-x-2">
          <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded"
            onClick={() => onSave({ name })}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategories;
