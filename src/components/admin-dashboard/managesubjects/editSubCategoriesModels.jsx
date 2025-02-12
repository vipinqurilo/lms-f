import { getAllManageSubjects } from "@/store/slices/admin-dashboard/manageSubjectsCategorySlice";
import { getAllSubCategories } from "@/store/slices/admin-dashboard/manageSubjectsSubCategorySlice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditSubCategories = ({ isOpen, onClose, category, onSave }) => {
  const dispatch = useDispatch();
  const { subjects: categories, isLoading } = useSelector((state) => state.admin.managesubjects);

  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Load categories when the modal opens
  useEffect(() => {
    dispatch(getAllManageSubjects());
  }, [dispatch]);

  // Update fields when category changes
  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setSelectedCategory(category.courseCategory?._id || "");
    }
  }, [category]);

  if (!isOpen) return null;

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

        <h2 className="text-lg font-semibold text-gray-700 mb-4">Edit Subcategory</h2>

        {/* Subcategory Name Input */}
        <label className="block text-gray-700 font-medium mb-1">Subcategory Name</label>
        <input
          type="text"
          className="w-full border p-2 rounded-lg"
          placeholder="Enter subcategory name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Category Dropdown */}
        <label className="block text-gray-700 font-medium mb-1 mt-4">Category</label>
        <select
          className="w-full border p-2 rounded-lg"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select a Category</option>
          {categories?.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end mt-4 space-x-2">
          <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded"
            onClick={() => onSave({ name, courseCategory: selectedCategory })}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSubCategories;
