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
import TitleComp from "@/components/instructor/TitleComp";
import Loader from "@/components/common/Loader";

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

  const [statusLoading, setstatusLoading] = useState(null);

  const toggleStatus = (user) => {
    const newStatus = user.userStatus === "active" ? "inactive" : "active";
    setstatusLoading(user?._id);
    dispatch(updateUserStatus({ userId: user._id, status: newStatus }))
      .unwrap()
      .then(() => setstatusLoading(null));
  };

  const handleApplyFilters = (filters) => {
    setFilters(filters); // Set filters and trigger re-fetch
  };

  return (
    <>
      <div className="p-10">
        <div className="dashboard-container">
          <TitleComp
            heading={"Manage Users"}
            des={"Reset filtered users when users from Redux store change"}
          />
          <div className="w-full sticky top-0 py-4 bg-white px-5">
            <UserFilter
              onApplyFilters={handleApplyFilters}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
          <div className="rounded-b-lg">
            {isLoading["getAllUsers"] ? (
              <div className="w-full py-10 flex items-center justify-center">
                <Loader color={"text-secondary"} isBig={true} />
              </div>
            ) : (
              <table className="w-full border border-black/10">
                <TableHeader headingsData={columns} />
                <tbody className="text-center">
                  {filteredUsers?.length === 0 ? (
                    <tr>
                      <td
                        colSpan="9"
                        className="py-4 text-center text-gray-500"
                      >
                        Data not found
                      </td>
                    </tr>
                  ) : (
                    filteredUsers?.map((user, index) => (
                      <tr key={user._id} className="border-t border-black/10">
                        <td className="py-4 px-4 text-gray-700 text-sm text-center">
                          {index + 1}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <img
                            src={
                              user.profilePhoto || "/assets/common/profile.png"
                            }
                            alt="User"
                            className="w-10 h-10 rounded-full"
                          />
                        </td>
                        <td className="py-4 px-4 text-gray-700 text-sm text-start">
                          <p className="font-medium text-sm">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-gray-500">
                            User ID: {user._id}
                          </p>
                        </td>
                        <td className="py-4 px-4 text-gray-700 text-sm text-start">
                          <p>{user.email}</p>
                          <p className="text-sm text-gray-500">
                            {user.phone?.number}
                          </p>
                        </td>
                        <td className="py-4 px-4 text-gray-700 text-sm text-center">
                          {user.role}
                        </td>
                        <td className="py-4 px-4 text-gray-700 text-sm text-center">
                          {user.registered || "N/A"}
                        </td>
                        <td className="py-4 px-4 text-gray-700 text-sm text-center">
                          {user.userStatus === "active"
                            ? "Verified"
                            : "Not Verified"}
                        </td>
                        <td className="py-4 px-4 text-gray-700 text-sm flex items-center justify-center">
                          {statusLoading === user?._id ? (
                            <Loader color={"text-secondary"} />
                          ) : (
                            <div
                              className={`relative flex items-center w-10 h-6 rounded-full cursor-pointer transition-all ${
                                user.userStatus === "active"
                                  ? "bg-secondary"
                                  : "bg-gray-300"
                              }`}
                              onClick={() => toggleStatus(user)}
                            >
                              <div
                                className={` w-5 h-5 bg-white rounded-full border border-gray-300 transition-all ${
                                  user.userStatus === "active"
                                    ? "translate-x-full"
                                    : "translate-x-0"
                                }`}
                              ></div>
                            </div>
                          )}
                        </td>

                        <td className="py-4 px-4 text-center text-sm">
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
            )}
          </div>
        </div>
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default UsersHistory;
