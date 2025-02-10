import TableHeader from "@/components/instructor/TableHeader";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
 import { FiEdit2, FiTrash2 } from "react-icons/fi";
import AddCategories from "./addCategoriesModels";
import EditCategories from "./editCategoriesModels";
import { getAllManageSubjects } from "@/store/slices/admin-dashboard/manageSubjectsCategorySlice";

const columns = ["S.No", "Name", "Sub Categories", "Updated", "Status", "Action"];

const Categories = () => {
  const dispatch = useDispatch();
  const { subjects, isLoading, error } = useSelector((state) => state.admin.managesubjects);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(getAllManageSubjects());
  }, [dispatch]);

  console.log("Fetched Subjects:", subjects);

  const deleteCategory = (id) => {
    // Implement deletion logic as needed
  };

  const toggleStatus = (id) => {
    // Implement toggle logic as needed
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Categories</h2>
        <div>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg mr-2" onClick={() => setIsAddModalOpen(true)}>
            Add New
          </button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">Export</button>
        </div>
      </div>

      {isLoading["getAllManageSubjects"] ? (
        <p>Loading...</p>
      ) : error["getAllManageSubjects"] ? (
        <p className="text-red-500">Error fetching data</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <TableHeader headingsData={columns} />
            <tbody>
              {subjects?.map((cat, index) => (
                <tr key={cat.id} className="border-t border-gray-200">
                  <td className="py-3 px-4 text-sm">{index + 1}</td>
                  <td className="py-3 px-4 text-sm">{cat.name}</td>
                  <td className="py-3 px-4 text-blue-600 cursor-pointer text-sm">{cat.subCategories}</td>
                  <td className="py-3 px-4 text-sm">{cat.updated}</td>
                  <td className="py-3 px-4 text-center">
                    <button onClick={() => toggleStatus(cat.id)} className={`relative w-8 h-4 rounded-full transition-all ${cat.status ? "bg-blue-600" : "bg-gray-300"}`}>
                      <div className={`absolute top-0 left-0 w-4 h-4 bg-white rounded-full shadow transition-transform ${cat.status ? "translate-x-4" : ""}`} />
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center flex items-center justify-center space-x-4">
                    <button className="text-gray-600 hover:text-yellow-500" onClick={() => openEditModal(cat)}>
                      <FiEdit2 size={18} />
                    </button>
                    <button className="text-gray-600 text-sm hover:text-red-500" onClick={() => deleteCategory(cat.id)}>
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddCategories isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <EditCategories isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} category={selectedCategory} />
    </div>
  );
};

export default Categories;
