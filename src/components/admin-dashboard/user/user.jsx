import TableHeader from "@/components/instructor/TableHeader";
import React, { useState, useEffect } from "react";
import { FiEye, FiEdit2, FiMoreVertical } from "react-icons/fi"; // Importing icons
import EditModal from "./EditModel";
import { Pagination } from "@/components/student-dashboard/Pagination";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch, useSelector
import {
  getAllUsers,
  updateUserStatus,
} from "@/store/slices/admin-dashboard/userSlice";
import { CiLogin } from "react-icons/ci";
import { MdLogin } from "react-icons/md";
import UserFilter from "./UserFilter";

const columns = [
  "ID",
  "Image",
  "Name/ID",
  "Email/Phone",
  "Type",
  "Registered",
  "Verified",
  "Status",
  "Action",
];

const UsersHistory = () => {
  const dispatch = useDispatch();
  const { users, total, currentPage, totalPages, isLoading } = useSelector(
    (state) => state.admin.user
  );

  const [filters, setFilters] = useState({});


  const [filteredUsers, setFilteredUsers] = useState(users); // State to store filtered users



  const [page, setPage] = useState(1); // Ensure page is initialized

  const handlePageChange = (newPage) => {
    setPage(newPage);
    dispatch(getAllUsers({ page: newPage, limit: 5 })); // Fetch new page data
  };

  useEffect(() => {
    dispatch(
      getAllUsers({
        search: "",
        userStatus: "",
        role: "",
        page,
        limit: 5,
      })
    );
  }, [dispatch, page]);  
  
  useEffect(() => {
    setFilteredUsers(users); // Reset filtered users when the users from Redux store change
  }, [users]);

  const toggleStatus = (user) => {
    const newStatus = user.userStatus === "active" ? "inactive" : "active";
    dispatch(updateUserStatus({ userId: user._id, status: newStatus }));
  };

  const handleApplyFilters = (filters) => {
    const { role, status, search } = filters;
    dispatch(
      getAllUsers({ role, userStatus: status, search, page: 1, limit: 5 })
    ); // Apply filters and reset to page 1
  };

  const filterUsers = (searchTerm) => {
    // Filtering users locally based on the search term
    const filtered = users.filter((user) => {
      return (
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user._id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredUsers(filtered); // Update filteredUsers when search term changes
  };

 

  return (
    <div className="rounded-lg p-1 w-11/12 mx-auto">
      <UserFilter onApplyFilters={handleApplyFilters} onSearch={filterUsers}    />
      <div className="overflow-x-auto mt-4">
        <table className="w-full border border-gray-200 rounded-lg">
          <TableHeader headingsData={columns} />
          <tbody>
            {filteredUsers?.map((user, index) => (
              <tr key={user._id} className="border-t border-gray-200">
                <td className="py-4 px-4 text-gray-700 text-sm">{index + 1}</td>
                <td className="py-4 px-4">
                  <img
                    src={user.profilePhoto || "https://via.placeholder.com/40"}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-4 px-4 text-gray-700 text-sm">
                  <p className="font-medium text-sm">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-gray-500">User ID: {user._id}</p>
                </td>
                <td className="py-4 px-4 text-gray-700 text-sm">
                  <p>{user.email}</p>
                  <p className="text-sm text-gray-500">{user.phone?.number}</p>
                </td>
                <td className="py-4 px-4 text-gray-700 text-sm">{user.role}</td>
                <td className="py-4 px-4 text-gray-700 text-sm">
                  {user.registered || "N/A"}
                </td>
                <td className="py-4 px-4 text-gray-700 text-sm">
                  {user.userStatus === "active" ? "Verified" : "Not Verified"}
                </td>

                <td className="py-4 px-3 text-center text-sm">
                  <button className="flex items-center text-gray-600 hover:text-yellow-500">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={user.userStatus === "active"}
                        onChange={() => toggleStatus(user)}
                      />
                      <div className="relative w-9 h-4 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.6 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#12a449] dark:peer-checked:bg-blue-600"></div>
                    </label>
                  </button>
                </td>

                <td className="py-4 px-4 text-center text-sm">
                  <div className="flex items-center justify-center space-x-3">
                    <button className="text-gray-700 hover:text-blue-500">
                      <MdLogin size={23} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UsersHistory;
