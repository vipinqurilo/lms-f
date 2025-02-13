// // // // //  import TableHeader from "@/components/instructor/TableHeader";
// // // // // import React, { useState } from "react";
// // // // // import { FiEye, FiEdit2, FiMoreVertical } from "react-icons/fi"; // Importing icons
// // // // // import EditModal from "./EditModel";
// // // // // import { Pagination } from "@/components/student-dashboard/Pagination";

// // // // // const initialWithdrawals = [
// // // // //   {
// // // // //     image: "https://via.placeholder.com/40",
// // // // //     method: "Landen Mosciski",
// // // // //     email: "landen.mosciski194@dummyid.com",
// // // // //     phone: "+599 28571271",
// // // // //     userId: "109",
// // // // //     type: "Affiliate",
// // // // //     registered: "Sep 11, 2022 16:40",
// // // // //     featured: "No",
// // // // //     verified: "Yes",
// // // // //     status: true, // Default status
// // // // //   },
   
// // // // // ];

// // // // // const columns = [
// // // // //   "ID",
// // // // //   "Image",
// // // // //   "Name/ID",
// // // // //   "Email/Phone",
// // // // //   "Type",
// // // // //   "Registered",
// // // // //    "Verified",
// // // // //   "Status", // Added status column
// // // // //   "Action",
// // // // // ];

// // // // // const UsersHistory = () => {
// // // // //   const [withdrawals, setWithdrawals] = useState(initialWithdrawals); // Set the withdrawals data in state
// // // // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // // // //   const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);

// // // // //   const openModal = (withdrawal) => {
// // // // //     setSelectedWithdrawal(withdrawal);
// // // // //     setIsModalOpen(true);
// // // // //   };

// // // // //   const closeModal = () => {
// // // // //     setIsModalOpen(false);
// // // // //     setSelectedWithdrawal(null);
// // // // //   };

// // // // //   const toggleStatus = (index) => {
// // // // //     const updatedWithdrawals = [...withdrawals];
// // // // //     updatedWithdrawals[index].status = !updatedWithdrawals[index].status;
// // // // //     setWithdrawals(updatedWithdrawals); // Update withdrawals state
// // // // //   };

// // // // //   return (
// // // // //     <div className="rounded-lg p-6 w-full max-w-6xl mx-auto">
// // // // //       <div className="overflow-x-auto mt-4">
// // // // //         <table className="w-full border border-gray-200 rounded-lg">
// // // // //           <TableHeader headingsData={columns} />

// // // // //           <tbody>
// // // // //             {withdrawals.map((withdrawal, index) => (
// // // // //               <tr key={index} className="border-t border-gray-200">
// // // // //                 <td className="py-4 px-4 text-gray-700 text-sm">{index + 1}</td>
// // // // //                 <td className="py-4 px-4">
// // // // //                   <img
// // // // //                     src={withdrawal.image}
// // // // //                     alt="User"
// // // // //                     className="w-10 h-10 rounded-full"
// // // // //                   />
// // // // //                 </td>
// // // // //                 <td className="py-4 px-4 text-gray-700 text-sm">
// // // // //                   <p className="font-medium text-sm">{withdrawal.method}</p>
// // // // //                   <p className="text-sm text-gray-500">
// // // // //                     User ID: {withdrawal.userId}
// // // // //                   </p>
// // // // //                 </td>
// // // // //                 <td className="py-4 px-4 text-gray-700 text-sm">
// // // // //                   <p>{withdrawal.email}</p>
// // // // //                   <p className="text-sm text-gray-500">{withdrawal.phone}</p>
// // // // //                 </td>
// // // // //                 <td className="py-4 px-4 text-gray-700 text-sm">
// // // // //                   {withdrawal.type}
// // // // //                 </td>
// // // // //                 <td className="py-4 px-4 text-gray-700 text-sm">
// // // // //                   {withdrawal.registered}
// // // // //                 </td>
                
// // // // //                 <td className="py-4 px-4 text-gray-700 text-sm">
// // // // //                   {withdrawal.verified}
// // // // //                 </td>

// // // // //                 {/* Status Toggle */}
// // // // //                 <td className="py-4 px-3 text-center text-sm">
// // // // //                   <button
// // // // //                     className={`py-2 px-4 rounded-full ${
// // // // //                       withdrawal.status
// // // // //                         ? "bg-blue-600 text-white"
// // // // //                         : "bg-gray-300 text-gray-700"
// // // // //                     }`}
// // // // //                     onClick={() => toggleStatus(index)}
// // // // //                   >
// // // // //                     {withdrawal.status ? "Active" : "Inactive"}
// // // // //                   </button>
// // // // //                 </td>

// // // // //                 <td className="py-4 px-4 text-center text-sm">
// // // // //                   <div className="flex items-center justify-center space-x-3">
// // // // //                     <button className="text-gray-600 hover:text-blue-500">
// // // // //                       <FiEye size={15} />
// // // // //                     </button>
// // // // //                     <button className="flex items-center text-gray-600 hover:text-yellow-500">
// // // // //                       <label className="inline-flex items-center cursor-pointer">
// // // // //                         <input
// // // // //                           type="checkbox"
// // // // //                           value=""
// // // // //                           className="sr-only peer"
// // // // //                           checked={withdrawal.status}
// // // // //                           onChange={() => toggleStatus(index)} // Toggle status when clicked
// // // // //                         />
// // // // //                         <div className="relative w-9 h-4 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.6 after:start-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
// // // // //                       </label>
// // // // //                     </button>

// // // // //                     <button className="text-gray-600 hover:text-gray-500">
// // // // //                       <FiMoreVertical size={15} />
// // // // //                     </button>
// // // // //                   </div>
// // // // //                 </td>
// // // // //               </tr>
// // // // //             ))}
// // // // //           </tbody>
// // // // //         </table>
// // // // //       </div>
      
// // // // //       {/* Pagination
// // // // //       <div className="px-6 py-4 ">
// // // // //             <Pagination
// // // // //               currentPage={currentPage}
// // // // //               totalPages={2}
// // // // //               onPageChange={setCurrentPage}
// // // // //             />
// // // // //           </div> */}



// // // // //       <EditModal
// // // // //         isOpen={isModalOpen}
// // // // //         onClose={closeModal}
// // // // //         withdrawal={selectedWithdrawal}
// // // // //       />
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default UsersHistory;


// // // // import TableHeader from "@/components/instructor/TableHeader";
// // // // import React, { useState } from "react";
// // // // import { FiEye, FiEdit2, FiMoreVertical } from "react-icons/fi"; // Importing icons
// // // // import EditModal from "./EditModel";
// // // // import { Pagination } from "@/components/student-dashboard/Pagination";

// // // // const initialWithdrawals = [
// // // //   {
// // // //     image: "https://via.placeholder.com/40",
// // // //     method: "Landen Mosciski",
// // // //     email: "landen.mosciski194@dummyid.com",
// // // //     phone: "+599 28571271",
// // // //     userId: "109",
// // // //     type: "Affiliate",
// // // //     registered: "Sep 11, 2022 16:40",
// // // //     featured: "No",
// // // //     verified: "Yes",
// // // //     status: true, // Default status
// // // //   },
   
// // // // ];

// // // // const columns = [
// // // //   "ID",
// // // //   "Image",
// // // //   "Name/ID",
// // // //   "Email/Phone",
// // // //   "Type",
// // // //   "Registered",
// // // //    "Verified",
// // // //   "Status", // Added status column
// // // //   "Action",
// // // // ];

// // // // const UsersHistory = () => {
// // // //   const [withdrawals, setWithdrawals] = useState(initialWithdrawals); // Set the withdrawals data in state
// // // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // // //   const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);

// // // //   const openModal = (withdrawal) => {
// // // //     setSelectedWithdrawal(withdrawal);
// // // //     setIsModalOpen(true);
// // // //   };

// // // //   const closeModal = () => {
// // // //     setIsModalOpen(false);
// // // //     setSelectedWithdrawal(null);
// // // //   };

// // // //   const toggleStatus = (index) => {
// // // //     const updatedWithdrawals = [...withdrawals];
// // // //     updatedWithdrawals[index].status = !updatedWithdrawals[index].status;
// // // //     setWithdrawals(updatedWithdrawals); // Update withdrawals state
// // // //   };

// // // //   return (
// // // //     <div className="rounded-lg p-6 w-full max-w-6xl mx-auto">
// // // //       <div className="overflow-x-auto mt-4">
// // // //         <table className="w-full border border-gray-200 rounded-lg">
// // // //           <TableHeader headingsData={columns} />

// // // //           <tbody>
// // // //             {withdrawals.map((withdrawal, index) => (
// // // //               <tr key={index} className="border-t border-gray-200">
// // // //                 <td className="py-4 px-4 text-gray-700 text-sm">{index + 1}</td>
// // // //                 <td className="py-4 px-4">
// // // //                   <img
// // // //                     src={withdrawal.image}
// // // //                     alt="User"
// // // //                     className="w-10 h-10 rounded-full"
// // // //                   />
// // // //                 </td>
// // // //                 <td className="py-4 px-4 text-gray-700 text-sm">
// // // //                   <p className="font-medium text-sm">{withdrawal.method}</p>
// // // //                   <p className="text-sm text-gray-500">
// // // //                     User ID: {withdrawal.userId}
// // // //                   </p>
// // // //                 </td>
// // // //                 <td className="py-4 px-4 text-gray-700 text-sm">
// // // //                   <p>{withdrawal.email}</p>
// // // //                   <p className="text-sm text-gray-500">{withdrawal.phone}</p>
// // // //                 </td>
// // // //                 <td className="py-4 px-4 text-gray-700 text-sm">
// // // //                   {withdrawal.type}
// // // //                 </td>
// // // //                 <td className="py-4 px-4 text-gray-700 text-sm">
// // // //                   {withdrawal.registered}
// // // //                 </td>
                
// // // //                 <td className="py-4 px-4 text-gray-700 text-sm">
// // // //                   {withdrawal.verified}
// // // //                 </td>

// // // //                 {/* Status Toggle */}
// // // //                 <td className="py-4 px-3 text-center text-sm">
// // // //                   <button
// // // //                     className={`py-2 px-4 rounded-full ${
// // // //                       withdrawal.status
// // // //                         ? "bg-blue-600 text-white"
// // // //                         : "bg-gray-300 text-gray-700"
// // // //                     }`}
// // // //                     onClick={() => toggleStatus(index)}
// // // //                   >
// // // //                     {withdrawal.status ? "Active" : "Inactive"}
// // // //                   </button>
// // // //                 </td>

// // // //                 <td className="py-4 px-4 text-center text-sm">
// // // //                   <div className="flex items-center justify-center space-x-3">
// // // //                     <button className="text-gray-600 hover:text-blue-500">
// // // //                       <FiEye size={15} />
// // // //                     </button>
// // // //                     <button className="flex items-center text-gray-600 hover:text-yellow-500">
// // // //                       <label className="inline-flex items-center cursor-pointer">
// // // //                         <input
// // // //                           type="checkbox"
// // // //                           value=""
// // // //                           className="sr-only peer"
// // // //                           checked={withdrawal.status}
// // // //                           onChange={() => toggleStatus(index)} // Toggle status when clicked
// // // //                         />
// // // //                         <div className="relative w-9 h-4 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.6 after:start-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
// // // //                       </label>
// // // //                     </button>

// // // //                     <button className="text-gray-600 hover:text-gray-500">
// // // //                       <FiMoreVertical size={15} />
// // // //                     </button>
// // // //                   </div>
// // // //                 </td>
// // // //               </tr>
// // // //             ))}
// // // //           </tbody>
// // // //         </table>
// // // //       </div>
      
// // // //       {/* Pagination
// // // //       <div className="px-6 py-4 ">
// // // //             <Pagination
// // // //               currentPage={currentPage}
// // // //               totalPages={2}
// // // //               onPageChange={setCurrentPage}
// // // //             />
// // // //           </div> */}



// // // //       <EditModal
// // // //         isOpen={isModalOpen}
// // // //         onClose={closeModal}
// // // //         withdrawal={selectedWithdrawal}
// // // //       />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default UsersHistory;


// // // import React, { useState } from "react";
// // // import { Search } from "lucide-react";

// // // const UserFilter = () => {
// // //   const [role, setRole] = useState("Admin");
// // //   const [status, setStatus] = useState("Active");
// // //   const [startDate, setStartDate] = useState("");
// // //   const [endDate, setEndDate] = useState("");
// // //   const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

// // //   return (
// // //     <div className="flex flex-wrap items-center gap-4 py-4">
// // //       {/* Search Input */}
// // //       <div className="w-full">
// // //         <div className="relative">
// // //           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 text-gray-400" />
// // //           <input
// // //             type="text"
// // //             placeholder="Search"
// // //             className="pl-10 pr-4 py-2 border rounded-full w-6/12 focus:border-gray-500 focus:outline-none"
// // //           />
// // //         </div>
// // //       </div>

// // //       <div className="flex w-full md:w-9/12 justify-between flex-wrap gap-4">
// // //         {/* Date Filters */}
// // //         <div className="flex items-center gap-2">
// // //           <input
// // //             type="date"
// // //             className="border px-4 py-2 rounded-full text-gray-500 w-40"
// // //             value={startDate}
// // //             onChange={(e) => setStartDate(e.target.value)}
// // //           />
// // //           <input
// // //             type="date"
// // //             className="border px-4 py-2 rounded-full text-gray-500 w-40"
// // //             value={endDate}
// // //             onChange={(e) => setEndDate(e.target.value)}
// // //           />
// // //         </div>

// // //         {/* Role Dropdown with full-width on click */}
// // //         <div
// // //           className={`border flex justify-between items-center px-4 py-2 rounded-full text-gray-500 relative cursor-pointer ${
// // //             roleDropdownOpen ? "w-48 transition-all duration-200" : "w-36"
// // //           }`}
// // //           onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
// // //         >
// // //           <p className="text-sm">Role:</p>
// // //           <p className="text-sm font-semibold">{role}</p>
// // //           {roleDropdownOpen && (
// // //             <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded-lg shadow-md z-10">
// // //               {["Admin", "User", "Manager"].map((r) => (
// // //                 <p
// // //                   key={r}
// // //                   className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
// // //                   onClick={() => {
// // //                     setRole(r);
// // //                     setRoleDropdownOpen(false);
// // //                   }}
// // //                 >
// // //                   {r}
// // //                 </p>
// // //               ))}
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Status Dropdown */}
// // //         <select
// // //           className="border px-4 py-2 rounded-full text-gray-500"
// // //           value={status}
// // //           onChange={(e) => setStatus(e.target.value)}
// // //         >
// // //           <option>Active</option>
// // //           <option>Inactive</option>
// // //         </select>

// // //         {/* More Filters Button */}
// // //         <button className="border px-4 py-2 rounded-full text-gray-500">
// // //           More Filters ⚙️
// // //         </button>
// // //       </div>

// // //       {/* Apply Filters Button */}
// // //       <div className="w-full flex justify-end md:w-56">
// // //         <button className="border px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300">
// // //           Apply Filters
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default UserFilter;




// // import React, { useState, useEffect } from "react";
// // import { Search } from "lucide-react";
// // import { FaAngleDown, FaAngleUp } from "react-icons/fa";
// // import { useDispatch } from "react-redux";
// // import { getAllUsers } from "@/store/slices/admin-dashboard/userSlice";

// // const UserFilter = ({ filters, setFilters }) => {
// //   const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
// //   const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
// //   const dispatch = useDispatch();

// //   const handleSearchChange = (e) => {
// //     setFilters((prev) => ({ ...prev, search: e.target.value }));
// //   };

// //   const handleRoleChange = (role) => {
// //     setFilters((prev) => ({ ...prev, role }));
// //     setRoleDropdownOpen(false);
// //   };

// //   const handleStatusChange = (status) => {
// //     setFilters((prev) => ({ ...prev, userStatus: status }));
// //     setStatusDropdownOpen(false);
// //   };

// //   useEffect(() => {
// //     dispatch(getAllUsers(filters));  // Dispatch the action to get users with filters
// //   }, [filters, dispatch]);

// //   return (
// //     <div className="flex flex-wrap items-center gap-4 py-4">
// //       <div className="w-full relative">
// //         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4" />
// //         <input
// //           type="text"
// //           placeholder="Search"
// //           value={filters.search}
// //           onChange={handleSearchChange}
// //           className="pl-10 pr-4 py-1 h-10 border rounded-full w-6/12 focus:border-gray-500 focus:outline-none"
// //         />
// //       </div>

// //       <div className="flex justify-between w-full">
// //         {/* Role Dropdown */}
// //         <div
// //           className="border text-sm flex bg-white items-center px-3 py-1 h-10 rounded-full text-gray-500 relative cursor-pointer w-32"
// //           onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
// //         >
// //           <div className="flex justify-center items-center w-full">
// //             <p className="text-xs">Role:</p>
// //             <p className="text-sm font-semibold ml-1">{filters.role || "All"}</p>
// //           </div>
// //           <div className="ml-1">{roleDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}</div>
// //           {roleDropdownOpen && (
// //             <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded-lg shadow-md z-10">
// //               {["Admin", "User", "Manager"].map((r) => (
// //                 <p
// //                   key={r}
// //                   className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
// //                   onClick={() => handleRoleChange(r)}
// //                 >
// //                   {r}
// //                 </p>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {/* Status Dropdown */}
// //         <div
// //           className="border flex items-center px-3 py-1 h-10 rounded-full bg-white text-gray-500 relative cursor-pointer w-36"
// //           onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
// //         >
// //           <div className="flex justify-center items-center w-full">
// //             <p className="text-xs">Status:</p>
// //             <p className="text-sm font-semibold ml-1">{filters.userStatus || "Active"}</p>
// //           </div>
// //           <div className="ml-2">{statusDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}</div>
// //           {statusDropdownOpen && (
// //             <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded-lg shadow-md z-10">
// //               {["Active", "Inactive"].map((s) => (
// //                 <p
// //                   key={s}
// //                   className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
// //                   onClick={() => handleStatusChange(s)}
// //                 >
// //                   {s}
// //                 </p>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserFilter;





// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllUsers, updateUserStatus } from "@/store/slices/admin-dashboard/userSlice";
// import UserFilter from "./UserFilter";

// const UsersHistory = () => {
//   const dispatch = useDispatch();
//   const { users, isLoading } = useSelector((state) => state.admin.user);

//   const [filters, setFilters] = useState({
//     search: '',
//     userStatus: 'active',
//     role: 'student',
//   });

//   // Fetch users when the component mounts or filters change
//   useEffect(() => {
//     dispatch(getAllUsers(filters));
//   }, [dispatch, filters]);

//   const handleApplyFilters = (newFilters) => {
//     setFilters(newFilters);
//   };

//   const toggleStatus = (user) => {
//     const newStatus = user.userStatus === "active" ? "inactive" : "active";
//     dispatch(updateUserStatus({ userId: user._id, status: newStatus }))
//       .then(() => {
//         dispatch(getAllUsers(filters));  // Fetch updated users list
//       })
//       .catch((error) => {
//         console.error("Error updating user status:", error);
//       });
//   };

//   return (
//     <div className="rounded-lg p-1 w-11/12 mx-auto">
//       <UserFilter onApplyFilters={handleApplyFilters} />
//       <div className="overflow-x-auto mt-4">
//         <table className="w-full border border-gray-200 rounded-lg">
//           <thead>
//             <tr>
//               {columns.map((col, index) => (
//                 <th key={index} className="px-4 py-2">{col}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {users?.map((user, index) => (
//               <tr key={user._id}>
//                 <td className="py-4 px-4 text-gray-700">{index + 1}</td>
//                 <td className="py-4 px-4">
//                   <img
//                     src={user.profilePhoto || "https://via.placeholder.com/40"}
//                     alt="User"
//                     className="w-10 h-10 rounded-full"
//                   />
//                 </td>
//                 <td className="py-4 px-4">{user.firstName} {user.lastName}</td>
//                 <td className="py-4 px-4">{user.email}</td>
//                 <td className="py-4 px-4">{user.role}</td>
//                 <td className="py-4 px-4">{user.registered}</td>
//                 <td className="py-4 px-4">{user.userStatus}</td>
//                 <td className="py-4 px-4">
//                   <button onClick={() => toggleStatus(user)}>
//                     {user.userStatus === "active" ? "Deactivate" : "Activate"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UsersHistory;



// UsersHistory.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "@/store/slices/admin-dashboard/userSlice";
import UserFilter from "./UserFilter";
import TableHeader from "@/components/instructor/TableHeader";

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
  const { users, isLoading } = useSelector((state) => state.admin.user);

  // Fetch all users when component mounts
  useEffect(() => {
    dispatch(getAllUsers({ search: '', userStatus: '', role: '' }));
  }, [dispatch]);

  const handleApplyFilters = (filters) => {
    dispatch(getAllUsers(filters)); // Fetch filtered users
  };

  return (
    <div className="rounded-lg p-1 w-11/12 mx-auto">
      <UserFilter onApplyFilters={handleApplyFilters} />
      <div className="overflow-x-auto mt-4">
        <table className="w-full border border-gray-200 rounded-lg">
          <TableHeader headingsData={columns} />
          <tbody>
            {users?.map((user, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="py-4 px-4 text-gray-700 text-sm">{index + 1}</td>
                <td className="py-4 px-4">
                  <img
                    src={user.profilePhoto || "https://via.placeholder.com/40"}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-4 px-4 text-gray-700 text-sm">
                  <p className="font-medium text-sm">{user.firstName} {user.lastName}</p>
                  <p className="text-sm text-gray-500">User ID: {user._id}</p>
                </td>
                <td className="py-4 px-4 text-gray-700 text-sm">
                  <p>{user.email}</p>
                  <p className="text-sm text-gray-500">{user.phone?.number}</p>
                </td>
                <td className="py-4 px-4 text-gray-700 text-sm">{user.role}</td>
                <td className="py-4 px-4 text-gray-700 text-sm">{user.registered || "N/A"}</td>
                <td className="py-4 px-4 text-gray-700 text-sm">
                  {user.userStatus === "active" ? "Verified" : "Not Verified"}
                </td>
                <td className="py-4 px-4 text-center text-sm">
                  <button
                    className="flex items-center text-gray-600 hover:text-gray-800"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersHistory;
