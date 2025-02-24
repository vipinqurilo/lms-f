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
  fetchData,
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
  const [rejectionReason, setRejectionReason] = useState(""); // Track rejection reason
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [page, setPage] = useState(1);

  const { teachers, isLoading ,totalPages, } = useSelector((state) => state.admin?.teacher);

  // useEffect(() => {
  //   dispatch(fetchData({ search: "", limit: 2, page }));
  // }, [dispatch,page]);


    useEffect(() => {
      dispatch(fetchData({ page, limit: 2 })); // Set the limit as needed
    }, [dispatch, page]);

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

      dispatch(fetchData());
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
      await dispatch(
        rejectTeacher({ teacherId: selectedTeacherId, reason: rejectionReason })
      ).unwrap();

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

  if (isLoading["fetchTeachers"]) {
    return (
      <div className="w-full h-[80%] flex items-center justify-center">
        <Loader isBig={true} color={"text-secondary"} />
      </div>
    );
  }

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
            <UserFilter />
          </div>

          <div className="overflow-x-auto mt-4 rounded-b-lg">
            <table className="w-full border border-gray-200 rounded-lg">
              <TableHeader headingsData={columns} />
              <tbody>
                {teachers?.map((teacher, index) => (
                  <tr
                    key={teacher.userId}
                    className="border-t border-gray-200 text-sm text-nowrap"
                  >
                    <td className="py-4 px-4 text-gray-700">{index + 1}</td>
                    <td className="py-4 px-4 text-gray-700">
                      {teacher?.userId}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {teacher.personalInfo?.firstName}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {teacher.email}amankumar@gmail.com
                    </td>
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
                      <div className="flex items-center justify-center gap-4">
                        <button
                          className="text-gray-600 hover:text-blue-500"
                          onClick={() => handleOpenApproveModal(teacher._id)}
                        >
                          <FaRegCalendarCheck size={16} />
                        </button>
                        <button className="text-gray-600 hover:text-yellow-500">
                          <Link href={`/instructor-request/${teacher?._id}`}>
                            <FiEye size={18} />
                          </Link>
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
