import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import AddSubCategories from "./addSubCategoriesModels";
import EditSubCategories from "./editSubCategoriesModels";
import TableHeader from "@/components/instructor/TableHeader";
import { deleteSubCategoryById, editSubCategoryById, getAllSubCategories } from "@/store/slices/admin-dashboard/manageSubjectsSubCategorySlice";
 

const columns = ["S.No", "Name", "Categories", "Updated", "Status", "Action"];

const SubCategories = () => {
  const dispatch = useDispatch();
  const { subcategories , isLoading} = useSelector((state) => state.admin.managesubjectssubctegory);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch subcategories on component mount
  useEffect(() => {
    dispatch(getAllSubCategories());
  }, [dispatch]);

  // Delete a subcategory
  const handleDelete = (id) => {
    dispatch(deleteSubCategoryById(id));
  };


  const handleSave = (updatedCategory) => {
    if (selectedCategory) {
      dispatch(editSubCategoryById({ id: selectedCategory._id, updatedData: updatedCategory }));
      setIsEditModalOpen(false);
    }
  };
  
 

  return (
    <div className="p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Subcategories</h2>
        <div>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-lg mr-2"
            onClick={() => setIsModalOpen(true)}
          >
            Add New
          </button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
            Export
          </button>
        </div>
      </div>

      {/* Subcategories Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <TableHeader headingsData={columns} />
          <tbody>
            {isLoading?.["getAllSubCategories"] ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : subcategories.length > 0 ? (
              subcategories.map((cat, index) => (
                <tr key={cat?._id} className="border-t border-gray-200">
                  <td className="py-3 px-4 text-sm">{index + 1}</td>
                  <td className="py-3 px-4 text-sm">{cat?.name}</td>
                  <td className="py-3 px-4 text-sm">{cat?.courseCategory?.name}</td>
                  <td className="py-3 px-4 text-sm">{new Date(cat?.updatedAt).toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      cat?.status ? "bg-green-500 text-white" : "bg-gray-400 text-white"
                    }`}>
                      {cat?.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center flex items-center justify-center space-x-4">
                    <button
                      className="text-gray-600 hover:text-yellow-500"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      className="text-gray-600 hover:text-red-500"
                      onClick={() => handleDelete(cat._id)}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  No subcategories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add & Edit Modals */}
      <AddSubCategories isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <EditSubCategories
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        category={selectedCategory}
        onSave={handleSave} // Fix: Passing the save function
      />
    </div>
  );
};

export default SubCategories;
