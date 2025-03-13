import React, { useState, useEffect } from "react";
import { FiEye } from "react-icons/fi";
import TableHeader from "@/components/instructor/TableHeader";
import { RxCross2 } from "react-icons/rx";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

import RejectModal from "./rejectModel";
import ApprovelModal from "./approvel";
import {
  approveTeacher,
  fetchTeachers,
  rejectTeacher,
} from "@/store/slices/admin-dashboard/teacherSlice";
import Link from "next/link";
import UserFilter from "../user/UserFilter";
import TitleComp from "@/components/instructor/TitleComp";
import { Pagination } from "@/components/student-dashboard/Pagination";
import Loader from "@/components/common/Loader";

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
  const [rejectionReason, setRejectionReason] = useState(""); 
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setfilters] = useState({});

  const { teachers, isLoading, totalPages } = useSelector(
    (state) => state.admin?.teacher
  );

 

  useEffect(() => {
    const data = {
      page,
      limit: 5,
    };
    if (filters?.search) {
      data.search = filters?.search;
    }
    if (filters?.startDate) {
      data.startDate = filters?.startDate;
    }
    if (filters?.endDate) {
      data.endDate = filters?.endDate;
    }
    dispatch(fetchTeachers(data));
  }, [dispatch, page, filters]);

  const handleOpenApproveModal = (teacherId) => {
    setSelectedTeacherId(teacherId);
    setIsApproveModalOpen(true);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleApprove = async () => {
    if (!selectedTeacherId) return;

    try {
      await dispatch(approveTeacher(selectedTeacherId)).unwrap();
      console.log("Teacher successfully approved");

      dispatch(fetchTeachers());
      setIsApproveModalOpen(false);
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
  //     dispatch(fetchTeachers()); // Refresh data
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
      await dispatch(
        rejectTeacher({ teacherId: selectedTeacherId, reason: rejectionReason })
      ).unwrap();

      // Log success message after successful rejection
      console.log("Teacher successfully rejected");

      // Close the modal and clear the rejection reason
      setIsRejectModalOpen(false);
      setRejectionReason(""); // Clear the reason
      dispatch(fetchTeachers()); // Refresh data
    } catch (error) {
      console.error("Error rejecting teacher:", error);
    }
  };

  return (
    <>
      <div className="p-10">
        <div className="dashboard-container w-full mx-auto">
          <TitleComp
            heading={"Teacher Requests"}
            des={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, officiis."
            }
          />
          <div className="w-full sticky py-4 top-0 bg-white px-5">
            <UserFilter
              onApplyFilters={(filter) => setfilters(filter)}
              isRole={false}
              isStatus={false}
            />
          </div>

          <div className="overflow-x-auto mt-4 rounded-b-lg">
            <table className="w-full border border-gray-200 rounded-lg">
              <TableHeader headingsData={columns} />
              {isLoading["fetchTeachers"] ? (
                <tr>
                  <td colSpan={columns?.length}>
                    <div className="w-full py-12 flex items-center justify-center">
                      <Loader isBig={true} color={"text-secondary"} />
                    </div>
                  </td>
                </tr>
              ) : (
                <tbody>
                  {teachers?.length === 0 ? (
                    <tr>
                      <td
                        colSpan={columns?.length}
                        className="text-center py-2"
                      >
                        No Data Found
                      </td>
                    </tr>
                  ) : (
                    <>
                      {teachers?.map((teacher, index) => (
                        <tr
                          key={teacher.userId}
                          className="border-t border-gray-200 text-sm text-nowrap"
                        >
                          <td className="py-4 px-4 text-gray-700">
                            {index + 1}
                          </td>
                          <td className="py-4 px-4 text-gray-700">
                            {teacher?.userId}
                          </td>
                          <td className="py-4 px-4 text-gray-700">
                            {teacher.personalInfo?.firstName}
                          </td>
                          <td className="py-4 px-4 text-gray-700">
                            {teacher.userDetails?.email}
                          </td>
                          <td className="py-4 px-4 text-gray-700">
                            {teacher.personalInfo?.firstName}
                          </td>
                          <td className="py-4 px-4 text-gray-700">
                            {new Date(teacher.createdAt).toLocaleString(
                              "en-US",
                              {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              }
                            )}
                          </td>
                          <td className="py-4 px-4 text-center text-gray-700">
                            <div
                              className={`px-2 py-1 rounded-full ${
                                teacher?.approvalStatus === "in review"
                                  ? "bg-[#FEF9C3] text-yellow-950"
                                  : teacher?.approvalStatus === "Approved"
                                  ? "bg-green-200 text-green-800"
                                  : "bg-red-200 text-red-800"
                              }`}
                            >
                              {teacher?.approvalStatus}
                            </div>
                          </td>

                          <td className="py-4 px-4 text-center">
                            <div className="flex items-center justify-center gap-4">
                              <button className="text-gray-600 hover:text-yellow-500">
                                <Link
                                  href={`/instructor-request/${teacher?._id}`}
                                >
                                  <FiEye size={18} />
                                </Link>
                              </button>
                              <button
                                className="text-gray-600 hover:text-blue-500"
                                onClick={() =>
                                  handleOpenApproveModal(teacher._id)
                                }
                              >
                                <FaRegCalendarCheck size={16} />
                              </button>

                              <button
                                className="text-gray-600 hover:text-red-500"
                                onClick={() =>
                                  handleOpenRejectModal(teacher._id)
                                }
                              >
                                <RxCross2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              )}
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
          <ApprovelModal
            isOpen={isApproveModalOpen}
            onClose={() => setIsApproveModalOpen(false)}
            onConfirm={handleApprove}
          />
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

export default TeacherRequests;








