import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllManageSubjects } from "@/store/slices/admin-dashboard/manageSubjectsCategorySlice";
import { addSubCategory } from "@/store/slices/admin-dashboard/manageSubjectsSubCategorySlice";

const AddSubCategories = ({ isOpen, onClose, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const { subjects: categories, isLoading } = useSelector(
    (state) => state.admin.managesubjects
  );

  const [name, setName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [pricePerHour, setPricePerHour] = useState(""); // Added state for pricePerHour

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

    const subCategoryData = {
      name,
      courseCategory: selectedCategoryId,
      pricePerHour, // Add pricePerHour to the data
    };

    dispatch(addSubCategory(subCategoryData))
      .unwrap()
      .then(() => {
        console.log("Subcategory added successfully");
        setName(""); // Reset input
        setSelectedCategoryId(""); // Reset selection
        setPricePerHour(""); // Reset pricePerHour input
        setIsModalOpen(!isOpen); // Close modal
      })
      .catch((error) => {
        console.error("Error adding subcategory:", error);
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
            className="bg-orange-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSubCategories;
