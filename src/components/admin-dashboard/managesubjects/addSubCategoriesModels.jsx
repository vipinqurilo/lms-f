import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllManageSubjects } from "@/store/slices/admin-dashboard/manageSubjectsCategorySlice";
import { addSubCategory } from "@/store/slices/admin-dashboard/manageSubjectsSubCategorySlice";
import Loader from "@/components/common/Loader";
import { uploadImage } from "@/store/slices/uploadSlice";
import Image from "next/image";

const AddSubCategories = ({ isOpen, onClose, setIsModalOpen, loading }) => {
  const dispatch = useDispatch();
  const { subjects: categories, isLoading } = useSelector(
    (state) => state.admin.managesubjects
  );

  const [name, setName] = useState("");
  const [icon, seticon] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [pricePerHour, setPricePerHour] = useState(""); // Added state for pricePerHour
  const imageLoader = useSelector(
    (state) => state.upload.isLoading.uploadImage
  );

  useEffect(() => {
    if (isOpen) {
      dispatch(getAllManageSubjects());
    }
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!name.trim()) {
      alert("Please enter a subcategory name.");
      return;
    }
    if (!selectedCategoryId) {
      alert("Please select a category.");
      return;
    }
    if (!pricePerHour) {
      alert("Please enter the price per hour.");
      return;
    }
    if (!icon) {
      alert("Please select an icon.");
      return;
    }

    const subCategoryData = {
      name,
      courseCategory: selectedCategoryId,
      pricePerHour, // Add pricePerHour to the data
      icon,
    };
    dispatch(addSubCategory(subCategoryData))
      .unwrap()
      .then(() => {
        console.log("Subcategory added successfully");
        setName(""); // Reset input
        setSelectedCategoryId(""); // Reset selection
        setPricePerHour(""); // Reset pricePerHour input
        seticon("");
        setIsModalOpen(!isOpen); // Close modal
      })
      .catch((error) => {
        console.error("Error adding subcategory:", error);
      });
  };

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
      <div className="bg-white p-6 rounded-lg shadow-lg w-5/12 relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
          onClick={() => setIsModalOpen(!isOpen)}
        >
          ✖
        </button>

        <h2 className="text-xl font-semibold mb-4">Add Sub-Category</h2>

        <div className="pb-4">
          <label className="block text-sm font-medium">
            Subcayegory Icon*
          </label>
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

        <label className="block mb-2 text-sm font-medium">
          Sub Category Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full border p-2 rounded mb-4"
          placeholder="Enter subcategory name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block mb-2 text-sm font-medium">Category</label>
        <select
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          value={selectedCategoryId}
        >
          <option value="">Select a category</option>
          {isLoading["getAllManageSubjects"] ? (
            <option>Loading...</option>
          ) : (
            categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))
          )}
        </select>

        <label className="block mb-2 text-sm font-medium">
          Price per Hour<span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          step="0.01"
          className="w-full border p-2 rounded mb-4"
          placeholder="Enter price per hour"
          value={pricePerHour}
          onChange={(e) => setPricePerHour(e.target.value)}
        />

        <div className="flex justify-end space-x-2 mt-7">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => setIsModalOpen(!isOpen)}
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

export default AddSubCategories;
