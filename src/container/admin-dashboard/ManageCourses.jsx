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
  // {
  //   icon: <BiBook size={20} />,
  //   tab: "All",
  // },
  {
    icon: <BiTime size={20} />,
    tab: "pending",
  },
  {
    icon: <BiCheckCircle size={20} />,
    tab: "published",
  },
];

const ManageCourses = () => {
  const dispatch = useDispatch();
  const courses =
    useSelector((state) => state.admin?.course?.courses) || [];

  const getloading = useSelector(
    (state) => state.instructor.course.isLoading.getAllIntructorCourses
  );

  const [editCourseId, setEditCourseId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [currentPage, setCurrentPage] = useState(1);

  console.log(selectedStatus, "selctedkd");

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
      }
    );
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
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
              className="px-2 py-1 border rounded  bg-transparent border-none"
              value={course.status}
              onChange={(e) => handleStatusUpdate(course?._id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option className="text-green-600" value="published">
                Approved
              </option>
            </select>
          </div>
        ) : (
          <button
            onClick={() => handleEditClick(course?._id)}
            className="p-1.5 border  bg-transparent border-none flex border-black/10 rounded hover:border-green-200 transition-custom hover:text-green-500"
          >
            <span className="px-2">{course?.status}</span>
            <FiEdit3 size={20} />
          </button>
        )}
      </div>
    ),
  }));

  console.log(filteredData, "filtereddatakd");

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

      {getloading ? (
        <Loader color={"text-primary"} isBig={true} />
      ) : (
        <CreatedCourses
          headingsData={["Courses", "Enrolled", "Status"]}
          data={filteredData}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={5}
        onPageChange={(val) => setCurrentPage(val)}
      />
    </section>
  );
};

export default ManageCourses;
