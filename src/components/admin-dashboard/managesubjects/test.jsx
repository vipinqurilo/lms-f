 // import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { FiEdit2, FiTrash2 } from "react-icons/fi";
// import AddSubCategories from "./addSubCategoriesModels";
// import EditSubCategories from "./editSubCategoriesModels";
// import TableHeader from "@/components/instructor/TableHeader";
// import {
//   deleteSubCategoryById,
//   editSubCategoryById,
//   getAllSubCategories,
// } from "@/store/slices/admin-dashboard/manageSubjectsSubCategorySlice";
// import DeleteSubCategoriesModal from "./deletesSubCategoriesModels";
 
// const columns = ["S.No", "Name", "Categories", "Updated", "Price Per Hour", "Action"];

// const SubCategories = () => {
//   const dispatch = useDispatch();
//   const { subcategories, isLoading } = useSelector(
//     (state) => state.admin.managesubjectssubctegory
//   );
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete modal
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   // Fetch subcategories on component mount
//   useEffect(() => {
//     dispatch(getAllSubCategories());
//   }, [dispatch]);

//   // Delete a subcategory
//   const handleDelete = (id) => {
//     dispatch(deleteSubCategoryById(id));
//     setIsDeleteModalOpen(false); // Close the modal after delete
//   };

//   const handleSave = (updatedCategory) => {
//     if (selectedCategory) {
//       dispatch(
//         editSubCategoryById({
//           id: selectedCategory._id,
//           updatedData: updatedCategory,
//         })
//       );
//       setIsEditModalOpen(false);
//     }
//   };

//   return (
//     <div className="p-6 rounded-lg">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Subcategories</h2>
//         <div>
//           <button
//             className="bg-orange-500 text-white px-4 py-2 rounded-lg mr-2"
//             onClick={() => setIsModalOpen(true)}
//           >
//             Add New
//           </button>
//         </div>
//       </div>

//       {/* Subcategories Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full border border-gray-200 rounded-lg">
//           <TableHeader headingsData={columns} />
//           <tbody className="text-center">
//             {isLoading?.["getAllSubCategories"] ? (
//               <tr>
//                 <td colSpan={columns.length} className="py-4">
//                   Loading...
//                 </td>
//               </tr>
//             ) : subcategories.length > 0 ? (
//               subcategories.map((cat, index) => (
//                 <tr key={cat?._id} className="border-t border-gray-200">
//                   <td className="py-3 px-4 text-sm">{index + 1}</td>
//                   <td className="py-3 px-4 text-sm">{cat?.name}</td>
//                   <td className="py-3 px-4 text-sm">{cat?.courseCategory?.name}</td>
//                   <td className="py-3 px-4 text-sm">
//                     {new Date(cat?.updatedAt).toLocaleString("en-US", {
//                       month: "short",
//                       day: "2-digit",
//                       year: "numeric",
//                       hour: "2-digit",
//                       minute: "2-digit",
//                       hour12: false,
//                     })}
//                   </td>
//                   <td className="py-3 px-4 text-sm">{cat?.pricePerHour}</td>
//                   <td className="py-3 px-4 text-center flex items-center justify-center space-x-4">
//                     <button
//                       className="text-gray-600 hover:text-yellow-500"
//                       onClick={() => {
//                         setSelectedCategory(cat);
//                         setIsEditModalOpen(true);
//                       }}
//                     >
//                       <FiEdit2 size={18} />
//                     </button>
//                     <button
//                       className="text-gray-600 hover:text-red-500"
//                       onClick={() => {
//                         setSelectedCategory(cat);
//                         setIsDeleteModalOpen(true); // Open the delete modal
//                       }}
//                     >
//                       <FiTrash2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={columns.length} className="py-4">
//                   No subcategories found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Add & Edit Modals */}
//       <AddSubCategories
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       />
//       <EditSubCategories
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         category={selectedCategory}
//         onSave={handleSave} // Pass save function
//       />
      
//       {/* Delete Confirmation Modal */}
//       <DeleteSubCategoriesModal
//         isOpen={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//         onConfirm={() => handleDelete(selectedCategory?._id)} // Pass handleDelete as onConfirm
//       />
//     </div>
//   );
// };

// export default SubCategories;



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import TableHeader from "@/components/instructor/TableHeader";
// import AddSubCategories from "./addSubCategoriesModels";
// import EditSubCategories from "./editSubCategoriesModels";
// import DeleteSubCategoriesModal from "./deleteSubCategoriesModels";
import {
  deleteSubCategoryById,
  editSubCategoryById,
  getAllSubCategories,
} from "@/store/slices/admin-dashboard/manageSubjectsSubCategorySlice";

const columns = ["S.No", "Name", "Categories", "Updated", "Price Per Hour", "Action"];

const SubCategories = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { categoryId, categoryName } = router.query;

  const { subcategories, isLoading } = useSelector(
    (state) => state.admin.managesubjectssubcategory
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (categoryId) {
      dispatch(getAllSubCategories({ categoryId }));
    }
  }, [dispatch, categoryId]);

  return (
    <div className="p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Subcategories for {categoryName}</h2>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg" onClick={() => setIsModalOpen(true)}>
          Add New
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <TableHeader headingsData={columns} />
          <tbody>
            {isLoading ? (
              <tr><td colSpan={columns.length} className="text-center py-4">Loading...</td></tr>
            ) : subcategories?.map((sub, index) => (
              <tr key={sub._id} className="border-t border-gray-200">
                <td className="py-3 px-4 text-sm text-center">{index + 1}</td>
                <td className="py-3 px-4 text-sm text-center">{sub.name}</td>
                <td className="py-3 px-4 text-sm text-center">{categoryName}</td>
                <td className="py-3 px-4 text-sm text-center">{new Date(sub.updatedAt).toLocaleString()}</td>
                <td className="py-3 px-4 text-sm text-center">{sub.pricePerHour}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubCategories;
