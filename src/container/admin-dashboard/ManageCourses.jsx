"use client";
import InstructorButton from "@/components/instructor/InstructorButton";
import { Pagination } from "@/components/student-dashboard/Pagination";
import React, { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { BiBook, BiCheckCircle, BiTime } from "react-icons/bi";
import Loader from "@/components/common/Loader";
import {
  updateAdminCourseStatus,
  getAllAdminCourses,
} from "@/store/slices/admin-dashboard/courseSlice";
import CreatedCourses from "../instructor/dashboard/CreatedCourses";
import TitleComp from "@/components/instructor/TitleComp";

const tabs = [
  {
    icon: <BiTime size={20} />,
    tab: "Pending",
    value: "pending",
  },
  {
    icon: <BiCheckCircle size={20} />,
    tab: "Approved",
    value: "published",
  },
  {
    icon: <BiCheckCircle size={20} />,
    tab: "Rejected",
    value: "unpublished",
  },
];

const ManageCourses = () => {
  const dispatch = useDispatch();
  const rawCourses = useSelector((state) => state.admin?.course?.courses);
  const totalPages = useSelector((state) => state.admin?.course?.totalPages);
  const courses = Array.isArray(rawCourses) ? rawCourses : [];
  const isLoading = useSelector(
    (state) => state.admin.course.isLoading.getAllAdminCourses
  );

  const [editCourseId, setEditCourseId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const requestData = {
      page: currentPage,
      limit: 10,
    };
    if (selectedStatus) {
      requestData.status = selectedStatus.toLowerCase();
    }
    dispatch(getAllAdminCourses(requestData));
  }, [dispatch, currentPage, selectedStatus]);

  const handleEditClick = (courseId) => {
    setEditCourseId(editCourseId === courseId ? null : courseId);
  };

  const handleStatusUpdate = (courseId, newStatus) => {
    dispatch(updateAdminCourseStatus({ courseId, status: newStatus })).then(
      () => {
        setEditCourseId(null);
        dispatch(getAllAdminCourses({ status: selectedStatus }));
      }
    );
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  const filteredData = courses?.map((course) => ({
    image: course?.courseImage,
    title: course?.courseTitle,
    des: course?.courseDescription,
    value1: course?.entrolled || 425,
    value2: (
      <div className="flex items-center gap-5">
        {editCourseId === course?._id ? (
          <div className="flex items-center gap-5">
            <select
              className="px-2 py-1 border rounded bg-transparent border-none"
              value={course.status}
              onChange={(e) => handleStatusUpdate(course?._id, e.target.value)}
            >
              <option className="" value="pending">
                Pending
              </option>
              <option className="text-green-600" value="published">
                Published
              </option>
              <option className="text-red-600" value="unpublished">
                Reject
              </option>
            </select>
          </div>
        ) : (
          <button
            onClick={() => handleEditClick(course?._id)}
            className="p-1.5 border bg-transparent border-none flex border-black/10 rounded transition-custom"
          >
            <span className="px-2">{course?.status}</span>
            <FiEdit3 size={20} />
          </button>
        )}
      </div>
    ),
  }));

  return (
    <>
      <div className="p-10">
        <div className="dashboard-container">
          <TitleComp
            heading={"Manage Courses"}
            des={"Manage your courses and its updates"}
          />
          <div className="">
            <div className="flex items-center gap-4 sticky top-0 py-6 px-5 bg-white">
              {tabs.map((tab, index) => (
                <InstructorButton
                  key={index}
                  tab={tab?.tab}
                  icon={tab?.icon}
                  condition={`${
                    selectedStatus === tab?.value && "!bg-secondary text-white"
                  }`}
                  handleClick={() => handleStatusChange(tab?.value)}
                />
              ))}
            </div>

            {isLoading ? (
              <Loader color={"text-secondary"} isBig={true} />
            ) : (
              <CreatedCourses
                headingsData={["Courses", "Enrolled", "Status"]}
                data={filteredData}
                title=""
              />
            )}
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(val) => setCurrentPage(val)}
      />
    </>
  );
};

export default ManageCourses;
