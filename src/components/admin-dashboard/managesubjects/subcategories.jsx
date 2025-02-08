import React, { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import AddSubCategories from "./addSubCategoriesModels";
import TableHeader from "@/components/instructor/TableHeader";
import EditSubCategories from "./editSubCategoriesModels";

const initialCategories = [
  {
    id: 1,
    Categories: "Mathematics",
    name: "Mathematics",
    subCategories: 7,
    records: 43,
    updated: "Jan 31, 2025 16:01",
    status: true,
  },
  {
    id: 2,
    Categories: "Science",
    name: "Science",
    subCategories: 7,
    records: 21,
    updated: "Jan 31, 2025 16:01",
    status: true,
  },
  {
    id: 3,
    Categories: "History",
    name: "History",
    subCategories: 6,
    records: 30,
    updated: "Jan 31, 2025 16:01",
    status: true,
  },
  {
    id: 4,
    Categories: "Literature",
    name: "Literature",
    subCategories: 6,
    records: 10,
    updated: "Jan 31, 2025 16:01",
    status: false,
  },
  {
    id: 5,
    Categories: "Social Studies",
    name: "Social Studies",
    subCategories: 8,
    records: 0,
    updated: "Jan 31, 2025 16:01",
    status: false,
  },
  {
    id: 6,
    Categories: "Foreign Languages",
    name: "Foreign Languages",
    subCategories: 9,
    records: 0,
    updated: "Jan 31, 2025 16:01",
    status: true,
  },
];

const columns = ["S.No", "Name", "Categories", "Updated", "Status", "Action"];
const SubCategories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const deleteCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const toggleStatus = (id) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, status: !cat.status } : cat
      )
    );
  };

  return (
    <div className="p-6  rounded-lg  ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Categories</h2>
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

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <TableHeader headingsData={columns} />

          <tbody>
            {categories.map((cat, index) => (
              <tr key={cat.id} className="border-t border-gray-200">
                <td className="py-3 px-4 text-sm">{index + 1}</td>
                <td className="py-3 px-4 text-sm">{cat.name}</td>
                <td className="py-3 px-4   cursor-pointer text-sm">
                  {cat.Categories}
                </td>

                <td className="py-3 px-4 text-sm">{cat.updated}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => toggleStatus(cat.id)}
                    className={`relative w-8 h-4 rounded-full transition-all ${
                      cat.status ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`absolute top-0 left-0 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        cat.status ? "translate-x-4" : ""
                      }`}
                    />
                  </button>
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
                    className="text-gray-600 text-sm hover:text-red-500"
                    onClick={() => deleteCategory(cat.id)}
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddSubCategories
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <EditSubCategories
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        category={selectedCategory}
      />
    </div>
  );
};

export default SubCategories;
