// "use client";

// import { getAllTeachers } from "@/store/slices/admin-dashboard/teachersSlice";
// import { useState, useEffect } from "react";
// import { GrView } from "react-icons/gr";
// import { useDispatch, useSelector } from "react-redux";
// import TeacherFilter from "./teacherFilter";
// import Loader from "@/components/common/Loader";
// import TitleComp from "@/components/instructor/TitleComp";
// import { Pagination } from "@/components/student-dashboard/Pagination";
// import { getStudent } from "@/store/slices/admin-dashboard/studentSlice";

// const TeachersTable = () => {
//   const [hoveredRow, setHoveredRow] = useState(null);
//   const dispatch = useDispatch();
//   const [page, setPage] = useState(1);
//   // const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
//   const { students, totalPages, currentPage } = useSelector(
//     (state) => state.admin.student
//   ); // Adjust the path to your state

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   useEffect(() => {
//     dispatch(getStudent({ page, limit: 2 })); // Set the limit as needed
//   }, [dispatch, page]);
  
//   const columns = [
//     "S.No.",
//     "Name",
//     "Email ID",
//     "Mobile no",
//     "Registered No",
//     "Action",
//   ];


//   if (isLoading["getAllTeachers"]) {
//     return (
//       <div className="w-full h-[80%] flex items-center justify-center">
//         <Loader isBig={true} color={"text-secondary"} />
//       </div>
//     );
//   }

//   // if (error["getAllTeachers"]) {
//   //   return <div>Error fetching teachers: {error["getAllTeachers"]}</div>;
//   // }

//   return (
//     <div className="p-10">
//       <div className="dashboard-container">
//         <TitleComp
//           heading={"Teachers List"}
//           des={
//             "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis, ad!"
//           }
//         />
//         <div className="w-full sticky top-0 py-4 px-5 bg-white">
//           <TeacherFilter />
//         </div>
//         <div className="overflow-x-auto mt-4 rounded-b-lg">
//           <div className="w-full grid grid-cols-6 gap-4 bg-gray-200 font-semibold py-4">
//             {columns?.map((column, index) => (
//               <p key={index} className="text-center">
//                 {column}
//               </p>
//             ))}
//           </div>
//           <div className="text-center ">
//             {students?.map((item, index) => {
//               const { user } = item;
//               return (
//                 <div
//                   key={item._id}
//                   className={`w-full bg-white border-b border-black/10 overflow-hidden ${
//                     hoveredRow === item?._id && "!bg-gray-100 cursor-pointer "
//                   }`}
//                   onMouseEnter={() => setHoveredRow(item._id)}
//                   onMouseLeave={() => setHoveredRow(null)}
//                 >
//                   {/* Main Row */}
//                   <div className="bg-white  grid grid-cols-12 items-center">
//                     <div className="col-span-2 text-sm py-4   ">
//                       {index + 1}
//                     </div>
//                     <div className="col-span-2 p-4 flex items-center gap-5">
//                     <img
//                     src={item?.user?.profilePhoto || "/placeholder.svg"}
//                     alt="profile"
//                     className="w-10 h-10 rounded-full"
//                   />
//                        <div className="text-sm">
//                     <p>{item?.user?.firstName || "student"}</p>
//                   </div>
//                     </div>
//                     <div className="col-span-2 p-4 text-sm">{user?.email}</div>
//                     <div className="col-span-2 p-4 text-sm">
//                       {user?.phone?.number || "N/A"}
//                     </div>
//                     <div className="col-span-2 p-4 text-sm">
//                       {item.requestedOn || "N/A"}
//                     </div>
//                     <div className="col-span-2 p-4">
//                       <button className="text-gray-600">
//                         <GrView className="text-base" />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Expandable Content */}
//                   <div
//                     className={`transition-all duration-300 origin-top ${
//                       hoveredRow === item._id
//                         ? "max-h-[500px] opacity-100"
//                         : "max-h-0 opacity-0"
//                     }`}
//                   >
//                     {/* Session Details */}
//                     <div className="bg-white relative border-gray-200 p-7">
//                       <div className="absolute top-0 left-[50%] translate-x-[-50%] w-[93%] h-[1px] bg-gray-200"></div>
//                       <div className="flex items-center space-x-9 ml-11">
//                         <h3 className="text-sm font-semibold">
//                           Session Details :
//                         </h3>
//                         <div className="flex space-x-8">
//                           {/* Session item boxes */}
//                           {[
//                             {
//                               label: "Total Sessions",
//                               value: item.totalSessions,
//                             },
//                             {
//                               label: "Scheduled",
//                               value: item.scheduledSessions,
//                             },
//                             {
//                               label: "Confirmed",
//                               value: item.confirmedSessions,
//                             },
//                             {
//                               label: "Completed",
//                               value: item.completedSessions,
//                             },
//                             {
//                               label: "Cancelled",
//                               value: item.cancelledSessions,
//                             },
//                             {
//                               label: "Rescheduled",
//                               value: item.rescheduledSessions,
//                             },
//                           ].map((stat, idx) => (
//                             <div
//                               key={idx}
//                               className="border rounded-lg px-4 h-9 flex w-32 items-center justify-center space-x-1 shadow-sm"
//                             >
//                               <p className="text-sm text-gray-600 text-nowrap">
//                                 {stat?.label}
//                               </p>
//                               <p className="text-base font-bold">
//                                 {stat?.value}
//                               </p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Course Details */}
//                     <div className="bg-white relative border-gray-200 p-4">
//                       <div className="absolute top-0 left-[50%] translate-x-[-50%] w-[93%] h-[1px] bg-gray-200"></div>

//                       <div className="flex items-center gap-4 p-4 ml-2">
//                         <h3 className="text-sm font-semibold w-36">
//                           Course Details :
//                         </h3>
//                         <div className="flex gap-4 flex-wrap">
//                           {[
//                             { label: "Pending", value: item.pendingCourses },
//                             {
//                               label: "Published",
//                               value: item.publishedCourses,
//                             },
//                             {
//                               label: "Unpublished",
//                               value: item.unpublishedCourses,
//                             },
//                           ].map((status, idx) => (
//                             <div
//                               key={idx}
//                               className="border rounded-lg px-6 h-9 flex items-center justify-center space-x-2 shadow-sm"
//                             >
//                               <p className="text-sm text-gray-600">
//                                 {status?.label}
//                               </p>
//                               <p className="text-base font-bold">
//                                 {status?.value}
//                               </p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//         <Pagination
//               currentPage={page}
//               totalPages={totalPages}
//               onPageChange={handlePageChange}
//             />
//     </div>
//   );
// };

// export default TeachersTable;



import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TableHeader from "@/components/instructor/TableHeader";
import TeacherFilter from "../teachers/teacherFilter";
import { Pagination } from "@/components/student-dashboard/Pagination";
import { GrView } from "react-icons/gr";
import { getStudent } from "@/store/slices/admin-dashboard/studentSlice";
import TitleComp from "@/components/instructor/TitleComp";

const StudentsTable = () => {
  const dispatch = useDispatch();
  const { students, totalPages, currentPage } = useSelector(
    (state) => state.admin.student
  ); // Adjust the path to your state
  const [hoveredRow, setHoveredRow] = useState(null);
  const [page, setPage] = useState(1); // Current page state
  const columns = [
    "S.No.",
    "Name",
    "Email ID",
    "Mobile no",
    "Registered No",
    "Action",
  ];

  // Fetch student data on component mount or page change
  useEffect(() => {
    dispatch(getStudent({ search: "", limit: 10, page }));
  }, [dispatch, page]); // Fetch students when page changes

  const handlePageChange = (newPage) => {
    setPage(newPage); // Update the page number
  };

  return (
    <div className="rounded-lg p-1 flex flex-col justify-center px-10 border border-gray-200">
      <TitleComp heading={"Students"} des={`Detail of Students`} />
      <TeacherFilter />
      <div className="overflow-x-auto overflow-y-hidden mt-4">
        <table className="w-full border border-gray-200 rounded-lg">
          <TableHeader headingsData={columns} />
          <tbody className="text-left">
            {students?.map((item, index) => (
              <tr
                key={item._id}
                className="bg-[#F9FAFB] rounded-lg transition-all duration-300 relative border-t border-gray-200"
                onMouseEnter={() => setHoveredRow(item._id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="p-4 text-sm">{(page - 1) * 2 + index + 1}</td>{" "}
                {/* Serial Number */}
                <td className="p-4 flex items-center gap-5 justify-left">
                  <img
                    src={item?.user?.profilePhoto || "/placeholder.svg"}
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="text-sm">
                    <p>{item?.user?.firstName || "student"}</p>
                  </div>
                </td>
                <td className="p-4 text-sm">{item?.user?.email}</td>
                <td className="p-4 text-sm pl-8">
                  {item?.user?.phone?.number || "N/A"}
                </td>
                <td className="p-4 text-sm pl-8">
                  {item.requestedOn || "N/A"}
                </td>
                <td className="p-4 relative">
                  <button className="text-gray-600">
                    <GrView className="text-base ml-4" />
                  </button>
                </td>
                {hoveredRow === item._id && (
                  <td
                    colSpan={6}
                    className="absolute left-0 right-0 top-[110%] p-2 bg-white shadow-lg rounded-lg z-10 transition-all duration-300 ease-in-out transform opacity-100 translate-y-0 animate-fadeDown"
                  >
                    <div className="grid grid-cols-6 gap-2 text-center">
                      <div>
                        <p className="text-base font-bold">02</p>
                        <p className="text-sm">Total Students</p>
                      </div>
                      <div>
                        <p className="text-base font-bold">02</p>
                        <p className="text-sm">Active Enrollment</p>
                      </div>
                      <div>
                        <p className="text-base font-bold">02</p>
                        <p className="text-sm">Completed Enrollment</p>
                      </div>
                      <div>
                        <p className="text-base font-bold">02</p>
                        <p className="text-sm">No. of Booking Sessions</p>
                      </div>
                      <div>
                        <p className="text-base font-bold">02</p>
                        <p className="text-sm">No. of Learners</p>
                      </div>
                      <div>
                        <p className="text-base font-bold">02</p>
                        <p className="text-sm">Bookings Cancelled</p>
                      </div>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages} // Pass totalPages from the API response
        onPageChange={handlePageChange} // Pass page change handler
      />
    </div>
  );
};

export default StudentsTable;
