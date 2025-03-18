import Loader from "@/components/common/Loader";
import { addCategory } from "@/store/slices/admin-dashboard/manageSubjectsCategorySlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AddCategories = ({ isOpen, onClose, loading }) => {
  if (!isOpen) return null;

  const dispatch = useDispatch();

  // Local state for the form
  const [categoryName, setCategoryName] = useState("");

  const handleSave = () => {
    if (!categoryName.trim()) {
      console.error("All fields are required!");
      return;
    }

    const categoryData = {
      name: categoryName,
    };

    dispatch(addCategory(categoryData))
      .unwrap()
      .then(() => {
        console.log("Category added successfully");
        setCategoryName(""); // Reset input
        onClose(); // Close the modal after successful API call
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-5/12 relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-xl font-semibold mb-4">Add Category</h2>

        <label className="block mb-2 text-sm font-medium">
          Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full border p-2 rounded mb-4"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <div className="flex justify-end space-x-2 mt-7">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
            onClick={handleSave}
          >
            {loading ? <Loader /> : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategories;
