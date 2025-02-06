// import React, { useState, useEffect } from "react";
// import { FiEye } from "react-icons/fi";
// import TableHeader from "@/components/instructor/TableHeader";
// import { RxCross2 } from "react-icons/rx";
// import { FaRegCalendarCheck } from "react-icons/fa6";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchData,
//   approveTeacher,
//   rejectTeacher,
// } from "@/store/slices/admin/teacherRequestSlice";
// import RejectModal from "@/components/RejectModal"; // Import modal

// const columns = [
//   "Sr. No.",
//   "Reference number",
//   "Name",
//   "Email",
//   "Comments",
//   "Requested on",
//   "Status",
//   "Action",
// ];

// const TeacherRequests = () => {
//   const dispatch = useDispatch();
//   const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
//   const [selectedTeacherId, setSelectedTeacherId] = useState(null);
//   const [rejectReason, setRejectReason] = useState("");

//   const { teachers } = useSelector((state) => state.admin?.teacher);

//   useEffect(() => {
//     dispatch(fetchData());
//   }, [dispatch]);

//   const handleApprove = async (teacherId) => {
//     try {
//       await dispatch(approveTeacher(teacherId)).unwrap();
//       dispatch(fetchData());
//     } catch (error) {
//       console.error("Error approving teacher:", error);
//     }
//   };

//   const openRejectModal = (teacherId) => {
//     setSelectedTeacherId(teacherId);
//     setIsRejectModalOpen(true);
//   };

//   const closeRejectModal = () => {
//     setIsRejectModalOpen(false);
//     setRejectReason("");
//   };

//   const handleReject = async () => {
//     if (!selectedTeacherId || !rejectReason) return;
//     try {
//       await dispatch(rejectTeacher({ id: selectedTeacherId, reason: rejectReason })).unwrap();
//       dispatch(fetchData());
//       closeRejectModal();
//     } catch (error) {
//       console.error("Error rejecting teacher:", error);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg p-6 w-full max-w-6xl mx-auto">
//       <div className="overflow-x-auto mt-4">
//         <table className="w-full border border-gray-200 rounded-lg">
//           <TableHeader headingsData={columns} />
//           <tbody>
//             {teachers?.map((teacher, index) => (
//               <tr key={teacher.userId} className="border-t border-gray-200">
//                 <td className="py-4 px-4 text-gray-700">{index + 1}</td>
//                 <td className="py-4 px-4 text-gray-700">{teacher?.userId}</td>
//                 <td className="py-4 px-4 text-gray-700">{teacher.personalInfo?.firstName}</td>
//                 <td className="py-4 px-4 text-gray-700">{teacher.email}</td>
//                 <td className="py-4 px-4 text-gray-700">{teacher.personalInfo?.firstName}</td>
//                 <td className="py-4 px-4 text-gray-700">
//                   {new Date(teacher.createdAt).toLocaleDateString()}
//                 </td>
//                 <td className="py-4 px-4 text-center text-gray-700">
//                   {teacher?.approvalStatus}
//                 </td>
//                 <td className="py-4 px-4 text-center">
//                   <div className="flex items-center justify-center space-x-3">
//                     <button
//                       className="text-gray-600 hover:text-blue-500"
//                       onClick={() => handleApprove(teacher._id)}
//                     >
//                       <FaRegCalendarCheck size={18} />
//                     </button>
//                     <button className="text-gray-600 hover:text-yellow-500">
//                       <FiEye />
//                     </button>
//                     <button
//                       className="text-gray-600 hover:text-red-500"
//                       onClick={() => openRejectModal(teacher._id)}
//                     >
//                       <RxCross2 size={18} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {isRejectModalOpen && (
//         <RejectModal
//           isOpen={isRejectModalOpen}
//           onClose={closeRejectModal}
//           onReject={handleReject}
//           setRejectReason={setRejectReason}
//           rejectReason={rejectReason}
//         />
//       )}
//     </div>
//   );
// };

// export default TeacherRequests;



// import React, { useState, useEffect } from "react";
// import { FiEye } from "react-icons/fi";
// import TableHeader from "@/components/instructor/TableHeader";
// import { RxCross2 } from "react-icons/rx";
// import { FaRegCalendarCheck } from "react-icons/fa6";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchData,
//   approveTeacher,
//   rejectTeacher,
// } from "@/store/slices/admin/teacherRequestSlice";
 
// const columns = [
//   "Sr. No.",
//   "Reference number",
//   "Name",
//   "Email",
//   "Comments",
//   "Requested on",
//   "Status",
//   "Action",
// ];

// const TeacherRequests = () => {
//   const dispatch = useDispatch();
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
//   const [selectedTeacherId, setSelectedTeacherId] = useState(null);

//   // Fetching teacher data from Redux store
//   const { teachers } = useSelector((state) => state.admin?.teacher);

//   useEffect(() => {
//     dispatch(fetchData()); // Fetch teacher data when the component mounts
//   }, [dispatch]);

//   const handleApprove = async (teacherId) => {
//     try {
//       await dispatch(approveTeacher(teacherId)).unwrap();
//       dispatch(fetchData()); // Refresh data after approval
//     } catch (error) {
//       console.error("Error approving teacher:", error);
//     }
//   };

//   // Function to open the reject modal
//   const openRejectModal = (teacherId) => {
//     setSelectedTeacherId(teacherId);
//     setIsRejectModalOpen(true);
//   };

//   // Function to close the reject modal
//   const closeRejectModal = () => {
//     setIsRejectModalOpen(false);
//     setSelectedTeacherId(null);
//   };

//   // Function to handle rejection with a reason
//   const handleReject = async (reason) => {
//     if (!selectedTeacherId) return;
//     try {
//       await dispatch(rejectTeacher({ teacherId: selectedTeacherId, reason })).unwrap();
//       dispatch(fetchData()); // Refresh data after rejection
//       closeRejectModal(); // Close modal after rejection
//     } catch (error) {
//       console.error("Error rejecting teacher:", error);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg p-6 w-full max-w-6xl mx-auto">
//       {/* Search Filters */}
//       <div className="border rounded-lg bg-gray-50">
//         <div
//           className="p-4 cursor-pointer flex justify-between items-center bg-gray-100 rounded-t-lg"
//           onClick={() => setIsSearchOpen(!isSearchOpen)}
//         >
//           <h2 className="text-lg font-semibold text-gray-700">Search</h2>
//           <span
//             className="text-gray-600 transition-transform duration-500"
//             style={{
//               transform: isSearchOpen ? "rotate(180deg)" : "rotate(0deg)",
//             }}
//           >
//             ▼
//           </span>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="overflow-x-auto mt-4">
//         <table className="w-full border border-gray-200 rounded-lg">
//           <TableHeader headingsData={columns} />
//           <tbody>
//             {teachers?.map((teacher, index) => (
//               <tr key={teacher.userId} className="border-t border-gray-200">
//                 <td className="py-4 px-4 text-gray-700">{index + 1}</td>
//                 <td className="py-4 px-4 text-gray-700">{teacher?.userId}</td>
//                 <td className="py-4 px-4 text-gray-700">
//                   {teacher.personalInfo?.firstName}
//                 </td>
//                 <td className="py-4 px-4 text-gray-700">{teacher.email}</td>
//                 <td className="py-4 px-4 text-gray-700">
//                   {teacher.personalInfo?.firstName}
//                 </td>
//                 <td className="py-4 px-4 text-gray-700">
//                   {new Date(teacher.createdAt).toLocaleDateString()}
//                 </td>
//                 <td className="py-4 px-4 text-center text-gray-700">
//                   {teacher?.approvalStatus}
//                 </td>
//                 <td className="py-4 px-4 text-center">
//                   <div className="flex items-center justify-center space-x-3">
//                     <button
//                       className="text-gray-600 hover:text-blue-500"
//                       onClick={() => handleApprove(teacher._id)}
//                     >
//                       <FaRegCalendarCheck size={18} />
//                     </button>
//                     <button className="text-gray-600 hover:text-yellow-500">
//                       <FiEye />
//                     </button>
//                     <button
//                       className="text-gray-600 hover:text-red-500"
//                       onClick={() => openRejectModal(teacher._id)}
//                     >
//                       <RxCross2 size={18} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Reject Modal */}
//       <RejectModal
//         isOpen={isRejectModalOpen}
//         onClose={closeRejectModal}
//         onReject={handleReject}
//       />
//     </div>
//   );
// };

// export default TeacherRequests;



// ..............................................................................................


// import React, { useState, useEffect } from "react";
// import { FiEye } from "react-icons/fi";
// import TableHeader from "@/components/instructor/TableHeader";
// import { RxCross2 } from "react-icons/rx";
// import { FaRegCalendarCheck } from "react-icons/fa6";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchData,
//   approveTeacher,
//   rejectTeacher,
// } from "@/store/slices/admin/teacherRequestSlice";

// const columns = [
//   "Sr. No.",
//   "Reference number",
//   "Name",
//   "Email",
//   "Comments",
//   "Requested on",
//   "Status",
//   "Action",
// ];

// const TeacherRequests = () => {
//   const dispatch = useDispatch();
//   const [isSearchOpen, setIsSearchOpen] = useState(false);

//   // Fetching teacher data from Redux store
//   const { teachers } = useSelector((state) => state.admin?.teacher);
//   console.log("Teachers data:", teachers);

//   useEffect(() => {
//     dispatch(fetchData()); // Fetch teacher data when the component mounts
//   }, [dispatch]);

//   const handleApprove = async (teacherId) => {
//     console.log("Approving teacher with ID:", teacherId);
//     try {
//       await dispatch(approveTeacher(teacherId)).unwrap();
//       console.log("Teacher approved successfully");
//       dispatch(fetchData()); // Refresh data after approval
//     } catch (error) {
//       console.error("Error approving teacher:", error);
//     }
//   };

//   // Function to handle reject action
//   const handleReject = async (teacherId) => {
//     console.log("Rejecting teacher with ID:", teacherId);
//     try {
//       await dispatch(rejectTeacher(teacherId)).unwrap();
//       console.log("Teacher rejected successfully");
//       dispatch(fetchData()); // Refresh data after rejection
//     } catch (error) {
//       console.error("Error rejecting teacher:", error);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg p-6 w-full max-w-6xl mx-auto">
//       {/* Search Filters */}
//       <div className="border rounded-lg bg-gray-50">
//         <div
//           className="p-4 cursor-pointer flex justify-between items-center bg-gray-100 rounded-t-lg"
//           onClick={() => setIsSearchOpen(!isSearchOpen)}
//         >
//           <h2 className="text-lg font-semibold text-gray-700">Search</h2>
//           <span
//             className="text-gray-600 transition-transform duration-500"
//             style={{
//               transform: isSearchOpen ? "rotate(180deg)" : "rotate(0deg)",
//             }}
//           >
//             ▼
//           </span>
//         </div>
//         <div
//           className={`transition-all duration-700 ease-in-out ${
//             isSearchOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
//           } overflow-hidden`}
//         >
//           <div className="p-4 border-t">
//             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               <div className="leading-9">
//                 <span className="text-sm font-medium text-gray-700">
//                   Keyword
//                 </span>
//                 <input type="text" className="border h-9 rounded w-full" />
//               </div>
//               <div className="leading-9">
//                 <span className="text-sm font-medium text-gray-700">
//                   Status
//                 </span>
//                 <select className="border h-9 rounded w-full">
//                   <option>Select</option>
//                   <option>Yes</option>
//                   <option>No</option>
//                 </select>
//               </div>
//               <div className="leading-9">
//                 <span className="text-sm font-medium text-gray-700">
//                   Start from
//                 </span>
//                 <input type="date" className="border h-9 rounded w-full" />
//               </div>

//               <div className="leading-9">
//                 <span className="text-sm font-medium text-gray-700">
//                   End to
//                 </span>
//                 <input type="date" className="border h-9 rounded w-full" />
//               </div>

//               <div className="flex gap-3 mt-9">
//                 <button className="bg-blue-600 text-white px-4 py-1 rounded">
//                   Search
//                 </button>
//                 <button className="bg-gray-500 text-white px-4 py-1 rounded">
//                   Clear
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="overflow-x-auto mt-4">
//         <table className="w-full border border-gray-200 rounded-lg">
//           <TableHeader headingsData={columns} />
//           <tbody>
//             {teachers?.map((teacher, index) => (
//               <tr key={teacher.userId} className="border-t border-gray-200">
//                 <td className="py-4 px-4 text-gray-700">{index + 1}</td>
//                 <td className="py-4 px-4 text-gray-700">{teacher?.userId}</td>
//                 <td className="py-4 px-4 text-gray-700">
//                   {teacher.personalInfo?.firstName}
//                 </td>
//                 <td className="py-4 px-4 text-gray-700">{teacher.email}amankumar@gmail.com</td>
//                 <td className="py-4 px-4 text-gray-700">
//                   {teacher.personalInfo?.firstName}
//                 </td>
//                 <td className="py-4 px-4 text-gray-700">
//                   {new Date(teacher.createdAt).toLocaleDateString()}
//                 </td>
//                 <td className="py-4 px-4 text-center text-gray-700">
//                   {teacher?.approvalStatus}
//                 </td>
//                 <td className="py-4 px-4 text-center">
//                   <div className="flex items-center justify-center space-x-3">
//                     <button
//                       className="text-gray-600 hover:text-blue-500"
//                       onClick={() => handleApprove(teacher._id)}
//                     >
//                       <FaRegCalendarCheck size={18} />
//                     </button>
//                     <button className="text-gray-600 hover:text-yellow-500">
//                       <FiEye />
//                     </button>
//                     <button
//                       className="text-gray-600 hover:text-red-500"
//                       onClick={() => handleReject(teacher._id)}
//                     >
//                       <RxCross2 size={18} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TeacherRequests;

// ............................................................................................






import React, { useState, useEffect } from "react";
import { FiEye } from "react-icons/fi";
import TableHeader from "@/components/instructor/TableHeader";
import { RxCross2 } from "react-icons/rx";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchData,
  approveTeacher,
  rejectTeacher,
} from "@/store/slices/admin/teacherRequestSlice";
import RejectModal from "./rejectModel";
 
const columns = [
  "Sr. No.",
  "Reference number",
  "Name",
  "Email",
  "Comments",
  "Requested on",
  "Status",
  "Action",
];

const TeacherRequests = () => {
  const dispatch = useDispatch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState(""); // Track rejection reason

  const { teachers } = useSelector((state) => state.admin?.teacher);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleApprove = async (teacherId) => {
    try {
      await dispatch(approveTeacher(teacherId)).unwrap();
      console.log("Teacher successfully approved");

      dispatch(fetchData());
    } catch (error) {
      console.error("Error approving teacher:", error);
    }
  };

  const handleOpenRejectModal = (teacherId) => {
    setSelectedTeacherId(teacherId);
    setIsRejectModalOpen(true);
  };

  // const handleReject = async () => {
  //   if (!selectedTeacherId || !rejectionReason) return;
  
  //   // Log the teacher ID and rejection reason to the console
  //   console.log("Teacher ID:", selectedTeacherId);
  //   console.log("Rejection Reason:", rejectionReason);
  
  //   try {
  //     // Dispatch rejectTeacher action with teacherId and reason
  //     await dispatch(rejectTeacher({ id: selectedTeacherId, reason: rejectionReason })).unwrap();
  //     setIsRejectModalOpen(false);
  //     setRejectionReason(""); // Clear the reason
  //     dispatch(fetchData()); // Refresh data
  //   } catch (error) {
  //     console.error("Error rejecting teacher:", error);
  //   }
  // };
  

  const handleReject = async () => {
    if (!selectedTeacherId || !rejectionReason) return;
  
    // Log the teacher ID and rejection reason to the console
    console.log("Teacher ID:", selectedTeacherId);
    console.log("Rejection Reason:", rejectionReason);
  
    try {
      // Dispatch rejectTeacher action with teacherId and reason
      await dispatch(rejectTeacher({ teacherId: selectedTeacherId, reason: rejectionReason })).unwrap();
      
      // Log success message after successful rejection
      console.log("Teacher successfully rejected");
  
      // Close the modal and clear the rejection reason
      setIsRejectModalOpen(false);
      setRejectionReason(""); // Clear the reason
      dispatch(fetchData()); // Refresh data
    } catch (error) {
      console.error("Error rejecting teacher:", error);
    }
  };
  

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-6xl mx-auto">
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
        <div
          className={`transition-all duration-700 ease-in-out ${
            isSearchOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="p-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="leading-9">
                <span className="text-sm font-medium text-gray-700">
                  Keyword
                </span>
                <input type="text" className="border h-9 rounded w-full" />
              </div>
              <div className="leading-9">
                <span className="text-sm font-medium text-gray-700">
                  Status
                </span>
                <select className="border h-9 rounded w-full">
                  <option>Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div className="leading-9">
                <span className="text-sm font-medium text-gray-700">
                  Start from
                </span>
                <input type="date" className="border h-9 rounded w-full" />
              </div>

              <div className="leading-9">
                <span className="text-sm font-medium text-gray-700">
                  End to
                </span>
                <input type="date" className="border h-9 rounded w-full" />
              </div>

              <div className="flex gap-3 mt-9">
                <button className="bg-blue-600 text-white px-4 py-1 rounded">
                  Search
                </button>
                <button className="bg-gray-500 text-white px-4 py-1 rounded">
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="w-full border border-gray-200 rounded-lg">
          <TableHeader headingsData={columns} />
          <tbody>
            {teachers?.map((teacher, index) => (
              <tr key={teacher.userId} className="border-t border-gray-200">
                <td className="py-4 px-4 text-gray-700">{index + 1}</td>
                <td className="py-4 px-4 text-gray-700">{teacher?.userId}</td>
                <td className="py-4 px-4 text-gray-700">
                  {teacher.personalInfo?.firstName}
                </td>
                <td className="py-4 px-4 text-gray-700">{teacher.email}</td>
                <td className="py-4 px-4 text-gray-700">
                  {teacher.personalInfo?.firstName}
                </td>
                <td className="py-4 px-4 text-gray-700">
                  {new Date(teacher.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-4 text-center text-gray-700">
                  {teacher?.approvalStatus}
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      className="text-gray-600 hover:text-blue-500"
                      onClick={() => handleApprove(teacher._id)}
                    >
                      <FaRegCalendarCheck size={18} />
                    </button>
                    <button className="text-gray-600 hover:text-yellow-500">
                      <FiEye />
                    </button>
                    <button
                      className="text-gray-600 hover:text-red-500"
                      onClick={() => handleOpenRejectModal(teacher._id)}
                    >
                      <RxCross2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reject Modal */}
      <RejectModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onReject={handleReject}
        rejectionReason={rejectionReason} // Pass rejectionReason to modal
        setRejectionReason={setRejectionReason} // Function to update rejectionReason in the modal
      />
    </div>
  );
};

export default TeacherRequests;
