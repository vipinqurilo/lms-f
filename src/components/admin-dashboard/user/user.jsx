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
  "S.No",
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [page, setPage] = useState(1);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm); // Update debounced search term after delay
    }, 1000); // 1000ms debounce delay

    return () => clearTimeout(timeoutId); // Clear timeout on cleanup or when searchTerm changes
  }, [searchTerm]);

  // Fetch users when page or filters or debouncedSearchTerm change
  useEffect(() => {
    const { role, status } = filters;
    if (debouncedSearchTerm) {
      dispatch(
        getAllUsers({
          role,
          userStatus: status,
          search: debouncedSearchTerm,
          page: 1,
          limit: 5,
        })
      );
    } else {
      dispatch(getAllUsers({ role, userStatus: status, page, limit: 5 }));
    }
  }, [page, filters, debouncedSearchTerm, dispatch]);

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setFilteredUsers(users); // Reset filtered users when users from Redux store change
  }, [users]);

  const toggleStatus = (user) => {
    const newStatus = user.userStatus === "active" ? "inactive" : "active";
    dispatch(updateUserStatus({ userId: user._id, status: newStatus }));
  };

  const handleApplyFilters = (filters) => {
    setFilters(filters); // Set filters and trigger re-fetch
  };

  return (
    <div className="rounded-lg p-1 w-11/12 mx-auto">
      <UserFilter
        onApplyFilters={handleApplyFilters}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="overflow-x-auto mt-4">
        <table className="w-full border border-gray-200 rounded-lg">
          <TableHeader headingsData={columns} />
          <tbody className="text-center">
            {filteredUsers?.length === 0 ? (
              <tr>
                <td colSpan="9" className="py-4 text-center text-gray-500">
                  Data not found
                </td>
              </tr>
            ) : (
              filteredUsers?.map((user, index) => (
                <tr key={user._id} className="border-t border-gray-200">
                  <td className="py-4 px-4 text-gray-700 text-sm align-middle">
                    {index + 1}
                  </td>
                  <td className="py-4 px-4 align-middle">
                    <img
                      src={
                        user.profilePhoto || "https://via.placeholder.com/40"
                      }
                      alt="User"
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="py-4 px-4 text-gray-700 text-sm align-middle">
                    <p className="font-medium text-sm">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-gray-500">User ID: {user._id}</p>
                  </td>
                  <td className="py-4 px-4 text-gray-700 text-sm align-middle">
                    <p>{user.email}</p>
                    <p className="text-sm text-gray-500">
                      {user.phone?.number}
                    </p>
                  </td>
                  <td className="py-4 px-4 text-gray-700 text-sm align-middle">
                    {user.role}
                  </td>
                  <td className="py-4 px-4 text-gray-700 text-sm align-middle">
                    {user.registered || "N/A"}
                  </td>
                  <td className="py-4 px-4 text-gray-700 text-sm align-middle">
                    {user.userStatus === "active" ? "Verified" : "Not Verified"}
                  </td>
                  <td className="py-4 px-4 text-gray-700 text-sm align-middle">
                    <div className="flex items-center justify-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={user.userStatus === "active"}
                          onChange={() => toggleStatus(user)}
                        />
                        <div className="relative w-9 h-4 bg-gray-200 rounded-full peer peer-checked:bg-[#12a449] peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600"></div>
                      </label>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-center text-sm align-middle">
                    <div className="flex items-center justify-center space-x-3">
                      <button className="text-gray-700 hover:text-blue-500">
                        <MdLogin size={23} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filteredUsers?.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default UsersHistory;
