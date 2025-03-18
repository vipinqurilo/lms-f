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
import UserFilter from "../../user/UserFilter";
import { Pagination } from "@/components/student-dashboard/Pagination";
import TitleComp from "@/components/instructor/TitleComp";
import dateFormat from "dateformat";

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

  const { courses, isLoading, totalPages } = useSelector(
    (state) => state?.admin?.course
  );
  const [filtersData, setFiltersData] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    const data = {};
    if (filtersData?.startDate) data.startDate = filtersData.startDate;
    if (filtersData?.endDate) data.endDate = filtersData.endDate;
    if (filtersData?.search) data.search = filtersData.search;

    dispatch(getAllAdminCourses({ ...data, page, limit: 5 }));
  }, [filtersData, page, dispatch]);

  const handleApprove = async () => {
    if (!selectedCoursesId) return;

    try {
      await dispatch(
        updateAdminCourseStatus({
          courseId: selectedCoursesId,
          status: "published",
        })
      )
        .unwrap()
        .then(() => {
          setIsApproveModalOpen(false);
          dispatch(getAllAdminCourses({}));
        });
    } catch (error) {
      console.error("Error approving Course:", error);
    }
  };

  const handleOpenApproveModal = (courseId) => {
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
      )
        .unwrap()
        .then(() => {
          setIsRejectModalOpen(false);
          setRejectionReason("");
          dispatch(getAllAdminCourses({}));
        });
    } catch (error) {
      console.error("Error rejecting course:", error);
    }
  };

  const handleOpenRejectModal = (courseId) => {
    setSelectedCoursesId(courseId);
    setIsRejectModalOpen(true);
  };

  const handleApplyFilters = (data) => {
    setFiltersData(data);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <div className="p-10">
        <div className="dashboard-container">
          <TitleComp
            heading={"Courses Approval Requests"}
            des={"following are the approval requests for all the courses."}
          />
          <div className="">
            <div className="overflow-x-auto pt-4 rounded-lg">
              <div className="w-full px-5">
                <UserFilter
                  isRole={false}
                  isStatus={false}
                  onApplyFilters={handleApplyFilters}
                />
              </div>
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
                    (Array.isArray(courses) ? courses : []).map(
                      (course, index) => (
                        <tr key={index} className="border-t border-gray-200">
                          <td className="py-4 px-6 text-gray-700 text-sm">
                            {index + 1}
                          </td>
                          <td className="py-4 px-6 text-gray-700 text-sm">
                            <p className="font-medium text-sm">
                              {course?.courseTitle}
                            </p>
                          </td>
                          <td className="py-4 px-6 text-gray-700 text-sm">
                            {(course?.courseContent?.length > 2
                              ? course.courseContent.slice(0, 2)
                              : course?.courseContent
                            ).map((lesson, i) => (
                              <p key={i} className="text-sm text-gray-600">
                                {lesson?.moduleTitle}
                              </p>
                            ))}
                            {course?.courseContent?.length > 2 &&
                              `...${course?.courseContent?.length - 2} More`}
                          </td>

                          <td className="py-4 px-6 text-gray-700 text-sm">
                            R{course?.coursePrice || "N/A"}
                          </td>

                          <td className="py-4 px-4 text-center text-sm text-gray-700">
                            <div
                              className={`px-2 py-1 rounded-full capitalize ${
                                course?.status === "pending"
                                  ? "bg-[#FEF9C3] text-yellow-950"
                                  : course?.status === "published"
                                  ? "bg-green-200 text-green-800"
                                  : "bg-red-200 text-red-800"
                              }`}
                            >
                              {course?.status}
                            </div>
                          </td>

                          <td className="py-4 px-4 text-gray-700 text-sm">
                            {dateFormat(
                              course?.updatedAt,
                              "mmm dd, yyyy - HH:MM"
                            ) || "N/A"}
                          </td>

                          <td className="py-4 px-4 text-center">
                            <div className="flex items-center justify-center gap-4">
                              <button className="text-gray-600 hover:text-yellow-500">
                                <Link
                                  href={`/courses/${course?._id}`}
                                  target="_blank"
                                >
                                  <FiEye size={18} />
                                </Link>
                              </button>
                              <button
                                className="text-gray-600 hover:text-blue-500"
                                onClick={() =>
                                  handleOpenApproveModal(course?._id)
                                }
                              >
                                <FaRegCalendarCheck size={16} />
                              </button>

                              <button
                                className="text-gray-600 hover:text-red-500"
                                onClick={() =>
                                  handleOpenRejectModal(course?._id)
                                }
                              >
                                <RxCross2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>
            <ApprovelModal
              isOpen={isApproveModalOpen}
              onClose={() => setIsApproveModalOpen(false)}
              onConfirm={handleApprove}
              loading={isLoading["updateAdminCourseStatus"]}
            />

            <RejectModal
              isOpen={isRejectModalOpen}
              onClose={() => setIsRejectModalOpen(false)}
              onReject={handleReject}
              rejectionReason={rejectionReason} // Pass rejectionReason to modal
              setRejectionReason={setRejectionReason} // Function to update rejectionReason in the modal
              loading={isLoading["rejectAdminCourse"]}
            />
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

export default Course;
