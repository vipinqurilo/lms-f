"use client";
import InstructorButton from "@/components/instructor/InstructorButton";
import { Pagination } from "@/components/student-dashboard/Pagination";
import React, { useEffect, useState } from "react";
import { FiEdit, FiEdit3 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { BiBook, BiCheckCircle, BiTime, BiEdit } from "react-icons/bi";
import DeleteModal from "@/components/instructor/DeleteModal";
import { useRouter } from "next/navigation";
import CreatedCourses from "../instructor/dashboard/CreatedCourses";
import { getAllIntructorCourses } from "@/store/slices/instructor/courseSlice";
import Loader from "@/components/common/Loader";

const tabs = [
  {
    icon: <BiBook size={20} />,
    tab: "All",
  },
  {
    icon: <BiTime size={20} />,
    tab: "Pending",
  },
  {
    icon: <BiCheckCircle size={20} />,
    tab: "Approved",
  },
];

const ManageCourses = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: courses } = useSelector(
    (state) => state.admin?.course?.courses
  ) || { data: [] };

  const getloading = useSelector(
    (state) => state.instructor.course.isLoading.getAllIntructorCourses
  );
  const [isEdit, setIsEdit] = useState(false);
  const [selecteStatus, setselecteStatus] = useState("All");
  const [filteredCourses, setfilteredCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (selecteStatus !== "All") {
      setfilteredCourses(
        courses.filter((course) => course.status === selecteStatus)
      );
    } else {
      setfilteredCourses(courses);
    }
  }, [selecteStatus]);

  const handleStatusChange = (value) => setselecteStatus(value);

  const filteredData = filteredCourses?.map((course) => ({
    image: course?.courseImage,
    title: course?.courseTitle,
    des: course?.courseDescription,
    value1: course?.entrolled || 425,
    value2: (
      <div className="flex items-center gap-5">
        {isEdit ? (
          <div className="flex items-center gap-5">
            <select name="" id="" className="px-2 py-1">
              <option onClick={() => setIsEdit(!isEdit)} value="">
                Pending
              </option>
              <option onClick={() => setIsEdit(!isEdit)} value="">
                Approved
              </option>
            </select>
          </div>
        ) : (
          <button
            onClick={() => setIsEdit(!isEdit)}
            className="p-1.5 border flex border-black/10 rounded hover:border-green-200 transition-custom hover:text-green-500"
          >
            <span className="px-2 ">{course?.status}</span>
            <FiEdit3 size={20} className="" />
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
              selecteStatus === tab?.tab && "!bg-secondary text-white"
            }`}
            handleClick={() => handleStatusChange(tab?.tab)}
          />
        ))}
      </div>

      {getloading ? (
        <Loader color={"text-primary"} isBig={true} />
      ) : (
        <CreatedCourses
          headingsData={["Courses", "Enrolled", "status"]}
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
