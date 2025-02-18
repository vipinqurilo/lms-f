import TableHeader from "@/components/instructor/TableHeader";
import React, { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import AddCategories from "./addCategoriesModels";
import EditCategories from "./editCategoriesModels";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryById,
  editCategoryById,
  getAllManageSubjects,
} from "@/store/slices/admin-dashboard/manageSubjectsCategorySlice";
import DeleteCategoriesModal from "./deleteCategoriesModels";
 
const columns = [
  "S.No",
  "Name",
  "Sub Categories",
  "Updated",
  "Action",
];

const Categories = () => {
  const dispatch = useDispatch();
  const { subjects, isLoading, error } = useSelector(
    (state) => state.admin.managesubjects
  );

  console.log(subjects,"pppppp")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Track delete modal state
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(getAllManageSubjects());
  }, [dispatch]);

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (category) => {
    setSelectedCategory(category); // Set category to be deleted
    setIsDeleteModalOpen(true); // Open delete confirmation modal
  };

  const deleteCategory = () => {
    if (!selectedCategory) return;
    dispatch(deleteCategoryById(selectedCategory._id))
      .unwrap()
      .then(() => {
        console.log("Category deleted successfully");
        setIsDeleteModalOpen(false); // Close modal after success
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  const onSaveCategory = (updatedData) => {
    if (!selectedCategory) return;
    dispatch(editCategoryById({ id: selectedCategory._id, updatedData }))
      .unwrap()
      .then(() => {
        console.log("Category updated successfully");
        setIsEditModalOpen(false); // Close modal after success
      })
      .catch((error) => {
        console.error("Error updating category:", error);
      });
  };

  return (
    <div className="p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Categories</h2>
        <div>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-lg mr-2"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add New
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <TableHeader headingsData={columns} />
          <tbody>
  {subjects?.map((cat, index) => (
    <tr key={cat.id} className="border-t border-gray-200">
      <td className="py-3 px-4 text-sm text-center">{index + 1}</td>
      <td className="py-3 px-4 text-sm text-center">{cat.name}</td>
      <td className="py-3 px-4 text-blue-600 cursor-pointer text-sm text-center">
        {cat.courseSubCategory?.length}
      </td>
      <td className="py-3 px-4 text-sm text-center">
        {new Date(cat?.updatedAt).toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </td>
      <td className="py-3 px-4 text-center flex items-center justify-center space-x-4">
        <button
          className="text-gray-600 hover:text-yellow-500"
          onClick={() => openEditModal(cat)}
        >
          <FiEdit2 size={18} />
        </button>
        <button
          className="text-gray-600 hover:text-red-500"
          onClick={() => openDeleteModal(cat)} // Open delete confirmation modal
        >
          <FiTrash2 size={18} />
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>

      <AddCategories
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <EditCategories
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        category={selectedCategory}
        onSave={onSaveCategory}
      />

      {/* Integrating Delete Modal */}
      <DeleteCategoriesModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)} // Close modal
        onConfirm={deleteCategory} // Confirm deletion
      />
    </div>
  );
};

export default Categories;
