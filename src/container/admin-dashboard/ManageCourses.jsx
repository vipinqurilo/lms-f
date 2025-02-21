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

const tabs = [
  {
    icon: <BiTime size={20} />,
    tab: "pending",
  },
  {
    icon: <BiCheckCircle size={20} />,
    tab: "publish",
  },
];

const ManageCourses = () => {
  const dispatch = useDispatch();
  const rawCourses = useSelector((state) => state.admin?.course?.courses);
  const courses = Array.isArray(rawCourses) ? rawCourses : [];
  const isLoading = useSelector(
    (state) => state.admin.course.isLoading.getAllAdminCourses
  );

  const [editCourseId, setEditCourseId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    dispatch(getAllAdminCourses({ status: selectedStatus }));
  }, [dispatch, selectedStatus]);

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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = courses?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const filteredData = paginatedCourses.map((course) => ({
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
              <option value="pending">Pending</option>
              <option className="text-green-600" value="publish">
                Published
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
    <section className="dashboard-sub-container flex flex-col gap-6">
      <div className="flex items-center gap-4">
        {tabs.map((tab, index) => (
          <InstructorButton
            key={index}
            tab={tab?.tab}
            icon={tab?.icon}
            condition={`${
              selectedStatus === tab?.tab && "!bg-secondary text-white"
            }`}
            handleClick={() => handleStatusChange(tab?.tab)}
          />
        ))}
      </div>

      {isLoading ? (
        <Loader color={"text-secondary"} isBig={true} />
      ) : (
        <CreatedCourses
          headingsData={["Courses", "Enrolled", "Status"]}
          data={filteredData}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(courses.length / itemsPerPage)}
        onPageChange={(val) => setCurrentPage(val)}
      />
    </section>
  );
};

export default ManageCourses;
