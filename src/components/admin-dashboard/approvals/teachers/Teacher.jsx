import TableHeader from "@/components/instructor/TableHeader";
import React, { useState } from "react";
import { FiEye, FiEdit2, FiMoreVertical } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

const columns = ["ID","Name", "Status", "Action"];

const Teacher = () => {
  const { data: teachers } = useSelector(
    (state) => state.admin?.teacher?.teachers
  ) || { data: [] };

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState({});

  const handleEditClick = (index, currentStatus) => {
    setEditIndex(index);
    setUpdatedStatus({ ...updatedStatus, [index]: currentStatus });
  };

  const handleStatusChange = (index, newStatus) => {
    setUpdatedStatus({ ...updatedStatus, [index]: newStatus });
  };

  const handleSubmit = (index) => {
    // Logic to update the status
    setEditIndex(null);
  };

  return (
    <div className="rounded-lg p-6 w-full max-w-6xl mx-auto">
      {/* Search Filters */}
      <div className="border rounded-lg bg-gray-50">
        <div
          className="p-4 cursor-pointer flex justify-between items-center bg-gray-100 rounded-t-lg"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <h2 className="text-lg font-semibold text-gray-700">Search</h2>
          <span
            className="text-gray-600 transition-transform duration-500"
            style={{
              transform: isSearchOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            ▼
          </span>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full border border-gray-200 rounded-lg">
          <TableHeader headingsData={columns} />

          <tbody>
            {teachers?.map((teacher, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="py-4 px-4 text-gray-700 text-sm">{index + 1}</td>
                <td className="py-4 px-4 text-gray-700 text-sm">
                  <p className="font-medium text-sm ">{teacher?.courseTitle}</p>
                </td>
                <td className="py-4 px-4 text-gray-700 text-sm">
                  <p>{teacher.email}</p>
                  <p className="text-sm text-gray-500">{teacher.coursePrice}</p>
                </td>
                <td className="py-4 px-4 text-gray-700 text-sm">
                  {editIndex === index ? (
                    <select
                      className="border h-9 rounded w-full"
                      value={updatedStatus[index] || teacher.status}
                      onChange={(e) =>
                        handleStatusChange(index, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                    </select>
                  ) : (
                    <p>{teacher.status}</p>
                  )}
                </td>
                <td className="py-4 px-4 text-center text-sm">
                  <div className="flex items-center justify-center space-x-3">
                    {editIndex === index ? (
                      <button
                        className="bg-blue-600 text-white px-4 py-1 rounded"
                        onClick={() => handleSubmit(index)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="text-gray-600 hover:text-blue-500"
                        onClick={() => handleEditClick(index, teacher.status)}
                      >
                        <FaRegEdit size={15} />
                      </button>
                    )}
                    <button className="text-gray-600 hover:text-gray-500">
                      <FiMoreVertical size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Teacher;
