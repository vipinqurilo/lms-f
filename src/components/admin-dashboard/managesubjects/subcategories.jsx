import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import AddSubCategories from "./addSubCategoriesModels";
import EditSubCategories from "./editSubCategoriesModels";
import TableHeader from "@/components/instructor/TableHeader";
import {
  deleteSubCategoryById,
  editSubCategoryById,
  getAllSubCategories,
} from "@/store/slices/admin-dashboard/manageSubjectsSubCategorySlice";
import DeleteSubCategoriesModal from "./deletesSubCategoriesModels";
import { useRouter } from "next/router"; // Import useRouter from next/router
import Loader from "@/components/common/Loader";
import { fetchCategories } from "@/store/slices/coursesSlice";
import { Pagination } from "@/components/student-dashboard/Pagination";

const columns = [
  "S.No",
  // "Icon",
  "Name",
  "Categories",
  "Updated",
  "Price Per Hour",
  "Action",
];

const SubCategories = () => {
  const dispatch = useDispatch();
  const { subcategories, isLoading, totalPages } = useSelector(
    (state) => state.admin.managesubjectssubctegory
  );

  const router = useRouter(); // Use Next.js router for query parameters
  const { categoryId, categoryName } = router.query; // Extract categoryId and categoryName from the URL query

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete modal
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setcurrentPage] = useState(1);

  // Fetch subcategories on categoryId change or if categoryId is not provided
  useEffect(() => {
    const data = {
      page: currentPage,
      limit: 10,
    };
    if (categoryId) {
      data.courseCategory = categoryId;
    }
    dispatch(getAllSubCategories(data));
  }, [dispatch, categoryId, currentPage]);

  // Handle the deletion of a subcategory
  const handleDelete = (id) => {
    dispatch(deleteSubCategoryById(id));
    setIsDeleteModalOpen(false); // Close the delete modal after deletion
  };

  // Handle the save for editing a subcategory
  const handleSave = (updatedCategory) => {
    if (selectedCategory) {
      dispatch(
        editSubCategoryById({
          id: selectedCategory._id,
          updatedData: updatedCategory,
        })
      ).then(() => {
        dispatch(getAllSubCategories());
      });
      setIsEditModalOpen(false);
    }
  };

  if (isLoading.length) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader isBig={true} color={"text-secondary"} />
      </div>
    );
  }

  return (
    <>
      <div className="p-10 rounded-lg">
        {/* Header with dynamic category name */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-background font-bold">
            {categoryName
              ? `Subcategories of ${categoryName}`
              : "Subcategories"}
          </h2>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Add New
          </button>
        </div>

        {/* Subcategories Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <TableHeader headingsData={columns} />
            <tbody className="">
              {isLoading?.["getAllSubCategories"] ||
              isLoading?.["editSubCategoryById"] ? (
                <tr>
                  <td colSpan={columns?.length}>
                    <div className=" w-full py-10 flex justify-center items-center">
                      <Loader isBig={true} color={"text-secondary"} />
                    </div>
                  </td>
                </tr>
              ) : (
                subcategories.map((cat, index) => (
                  <tr key={cat?._id} className="border-t border-gray-200">
                    <td className="py-3  px-8  text-sm">{index + 1}</td>
                    {/* <td className="py-4 px-4 align-middle">
                      <img
                        src={
                          cat.profilePhoto || "https://via.placeholder.com/40"
                        }
                        alt="User"
                        className="w-10 h-10 rounded-full"
                      />
                    </td> */}
                    <td className="py-3 px-4 text-sm">{cat?.name}</td>
                    <td className="py-3 px-4 text-sm">
                      {cat?.courseCategory?.name}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {new Date(cat?.updatedAt).toLocaleString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </td>
                    <td className="py-3  px-12 text-sm">{cat?.pricePerHour}</td>
                    <td className="py-3 px-4    space-x-4">
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
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsDeleteModalOpen(true); // Open the delete modal
                        }}
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Add & Edit Modals */}
        <AddSubCategories
          isOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />

        <EditSubCategories
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          category={selectedCategory}
          onSave={handleSave}
        />

        {/* Delete Confirmation Modal */}
        <DeleteSubCategoriesModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          handleDelete={handleDelete}
          categoryId={selectedCategory?._id}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        onPageChange={(val) => setcurrentPage(val)}
        totalPages={totalPages}
      />
    </>
  );
};

export default SubCategories;
