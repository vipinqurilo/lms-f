"use client";

import Loader from "@/components/common/Loader";
import { getAllManageSubjects } from "@/store/slices/admin-dashboard/manageSubjectsCategorySlice";
import { uploadImage } from "@/store/slices/uploadSlice";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditSubCategories = ({ isOpen, onClose, category, onSave, loading }) => {
  console.log(category, "subcategory");
  const dispatch = useDispatch();
  const { subjects: categories, isLoading } = useSelector(
    (state) => state.admin.managesubjects
  );

  const [name, setName] = useState("");
  const [icon, seticon] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pricePerHour, setPricePerHour] = useState(""); // Added state for pricePerHour

  const imageLoader = useSelector(
    (state) => state.upload.isLoading.uploadImage
  );

  // Load categories when the modal opens
  useEffect(() => {
    dispatch(getAllManageSubjects());
  }, [dispatch]);

  // Update fields when category changes
  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setSelectedCategory(category.courseCategory?._id || "");
      setPricePerHour(category.pricePerHour || "");
      seticon(category.icon || ""); // Set pricePerHour when category changes
    }
  }, [category]);

  if (!isOpen) return null;

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile.size > 1 * 1024 * 1024) {
      toast.error("File size must be less than 1MB");
      return;
    }
    const formData = new FormData();
    formData.append("courseImage", selectedFile);
    dispatch(uploadImage(formData))
      .unwrap()
      .then((res) => {
        if (res?.data) {
          seticon(res?.data);
        }
      });
  };

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

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Edit Subcategory
        </h2>

        <div className="pb-4">
          <label className="block text-sm font-medium">Subcayegory Icon*</label>
          <div className="flex items-start space-x-4 mt-2">
            <div className="w-20 h-20 lg:h-20 rounded-lg bg-gray-200 flex items-center justify-center relative">
              {imageLoader ? (
                <span className="text-gray-500 text-sm">Uploading...</span>
              ) : icon ? (
                <Image
                  src={icon}
                  alt="icon"
                  fill={true}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-500 text-sm">No Icon</span>
              )}
            </div>

            <div className="space-y-2">
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/gif, image/bmp"
                onChange={(e) => handleImageUpload(e)}
                disabled={imageLoader}
                className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm p-2 disabled:cursor-not-allowed disabled:opacity-60"
              />
              <p className="text-xs text-gray-500">
                Max size 1MB. Allowed formats: png, jpg, jpeg, gif, bmp.
              </p>
            </div>
          </div>
        </div>

        {/* Subcategory Name Input */}
        <label className="block text-gray-700 font-medium mb-1">
          Subcategory Name
        </label>
        <input
          type="text"
          className="w-full border p-2 rounded-lg"
          placeholder="Enter subcategory name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Category Dropdown */}
        <label className="block text-gray-700 font-medium mb-1 mt-4">
          Category
        </label>
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

        {/* Price per Hour Input */}
        <label className="block text-gray-700 font-medium mb-1 mt-4">
          Price per Hour
        </label>
        <input
          type="number"
          step="0.01"
          className="w-full border p-2 rounded-lg"
          placeholder="Enter price per hour"
          value={pricePerHour}
          onChange={(e) => setPricePerHour(e.target.value)}
        />

        <div className="flex justify-end mt-4 space-x-2">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
            onClick={() =>
              onSave({ name, courseCategory: selectedCategory, pricePerHour, icon })
            }
          >
            {loading ? <Loader /> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSubCategories;
