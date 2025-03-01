import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "@/components/instructor/TableHeader";
import {
  getAllAdminCourses,
  rejectAdminCourse,
  updateAdminCourseStatus,
} from "@/store/slices/admin-dashboard/courseSlice";
import { FiEye } from "react-icons/fi";
import { FaRegCalendarCheck } from "react-icons/fa6";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import ApprovelModal from "../../teacherrequests/approvel";
import RejectModal from "../../teacherrequests/rejectModel";
import Loader from "@/components/common/Loader";

const columns = [
  "Sr. No.",
  "Course Title",
  "Module Titles",
  "Price",
  "Status",
  "Requested on",
  "Action",
];

const Course = () => {
  const dispatch = useDispatch();
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [selectedCoursesId, setSelectedCoursesId] = useState(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const { courses, isLoading } = useSelector((state) => state?.admin?.course);
  console.log(courses, "pppppppppppppooooooppp");

  useEffect(() => {
    dispatch(getAllAdminCourses({})); // Fetch all courses when component mounts
  }, [dispatch]);

  const handleApprove = async () => {
    if (!selectedCoursesId) return;

    try {
      await dispatch(
        updateAdminCourseStatus({
          courseId: selectedCoursesId,
          status: "published",
        })
      ).unwrap();

      console.log("Course successfully approved and published");

      dispatch(getAllAdminCourses({})); // Refresh the course list
      setIsApproveModalOpen(false);
    } catch (error) {
      console.error("Error approving Course:", error);
    }
  };

  const handleOpenApproveModal = (courseId) => {
    console.log(courseId, "ppopo");
    setSelectedCoursesId(courseId);
    setIsApproveModalOpen(true);
  };

  const handleReject = async () => {
    if (!selectedCoursesId || !rejectionReason) return;

    try {
      await dispatch(
        rejectAdminCourse({
          courseId: selectedCoursesId,
          reason: rejectionReason,
        })
      ).unwrap();

      console.log("Course successfully rejected");

      setIsRejectModalOpen(false);
      setRejectionReason(""); // Clear input field
      dispatch(getAllAdminCourses({})); // Refresh course list
    } catch (error) {
      console.error("Error rejecting course:", error);
    }
  };

  const handleOpenRejectModal = (courseId) => {
    setSelectedCoursesId(courseId);
    setIsRejectModalOpen(true);
  };

  if (isLoading["rejectAdminCourse"] || isLoading["updateAdminCourseStatus"]) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader isBig={true} color={"text-secondary"} />
      </div>
    );
  }

  return (
    <div className="rounded-lg p-6 w-full max-w-6xl mx-auto">
      <div className="overflow-x-auto mt-4">
        <table className="w-full border border-gray-200 rounded-lg">
          <TableHeader headingsData={columns} />
          <tbody>
            {isLoading?.getAllAdminCourses ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : (
              (Array.isArray(courses) ? courses : []).map((course, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="py-4 px-4 text-gray-700 text-sm">
                    {index + 1}
                  </td>
                  <td className="py-4 px-4 text-gray-700 text-sm">
                    <p className="font-medium text-sm">{course?.courseTitle}</p>
                  </td>
                  <td className="py-4 px-4 text-gray-700 text-sm">
                    {course?.courseContent?.map((lesson, i) => (
                      <p key={i} className="text-sm text-gray-600">
                        {lesson?.moduleTitle}
                      </p>
                    ))}
                  </td>

                  <td className="py-4 px-4 text-gray-700 text-sm">
                    {course?.coursePrice || "N/A"}
                  </td>

                  <td className="py-4 px-4 text-center text-sm text-gray-700">
                    <div
                      className={`px-2 py-1 rounded-full ${
                        course?.status === "pending"
                          ? "bg-[#FEF9C3] text-yellow-950"
                          : course?.status === "Approved"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {course?.status}
                    </div>
                  </td>

                  <td className="py-4 px-4 text-gray-700 text-sm">
                    {course?.updatedAt
                      ? new Date(course.updatedAt).toLocaleString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })
                      : "N/A"}
                  </td>

                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-4">
                      <button className="text-gray-600 hover:text-yellow-500">
                        <Link href={`/instructor-request/${course?._id}`}>
                          <FiEye size={18} />
                        </Link>
                      </button>
                      <button
                        className="text-gray-600 hover:text-blue-500"
                        onClick={() => handleOpenApproveModal(course?._id)}
                      >
                        <FaRegCalendarCheck size={16} />
                      </button>

                      <button
                        className="text-gray-600 hover:text-red-500"
                        onClick={() => handleOpenRejectModal(course?._id)}
                      >
                        <RxCross2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ApprovelModal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        onConfirm={handleApprove}
      />

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

export default Course;
