"use client";
import InstructorButton from "@/components/instructor/InstructorButton";
import { Pagination } from "@/components/student-dashboard/Pagination";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiCheckCircle, BiTime, BiXCircle } from "react-icons/bi";
import Loader from "@/components/common/Loader";
import { getAllAdminCourses } from "@/store/slices/admin-dashboard/courseSlice";
import CreatedCourses from "../instructor/dashboard/CreatedCourses";
import TitleComp from "@/components/instructor/TitleComp";

const tabs = [
  {
    icon: <BiTime size={20} />,
    tab: "Pending",
    value: "pending",
  },
  {
    icon: <BiCheckCircle size={20} className="text-green-600" />,
    tab: "Approved",
    value: "published",
  },
  {
    icon: <BiXCircle size={20} className="text-red-600" />,
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
  const isAdmin = useSelector(
    (state) => state.user?.authUser?.role === "admin" || {}
  );

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
    console.log(requestData);

    dispatch(getAllAdminCourses(requestData));
  }, [dispatch, currentPage, selectedStatus]);

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  const getStatusCss = (status) => {
    return status === "unpublished"
      ? "bg-red-200 text-red-800"
      : status === "published"
      ? "bg-green-200 text-green-800"
      : status === "pending"
      ? "bg-yellow-200 text-yellow-800"
      : "bg-gray-200 text-gray-800";
  };

  const filteredData = courses?.map((course) => ({
    image: course?.courseImage,
    title: course?.courseTitle,
    des: course?.courseDescription,
    id: course?._id,
    value1: course?.studentsEnrolled || "0",
    firstName: (<span className="font-semibold text-nowrap">{course?.courseInstructor?.firstName} {course?.courseInstructor?.lastName}</span>),
    value2: (
      <div
        className={`flex items-center gap-5  ${getStatusCss(
          course.status
        )} rounded-md px-2 py-0.5`}
      >
        {
          <div className="flex items-center gap-5">
            <div className="px-2 py-1 border rounded bg-transparent border-none">
              {course.status}
            </div>
          </div>
        }
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
          <div className="w-full">
            <div
              className={`flex items-center gap-4 sticky top-0 py-6 px-5 w-full bg-white z-[5]`}
            >
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
              <div className="w-full py-12 flex items-center justify-center">
                <Loader color={"text-secondary"} isBig={true} />
              </div>
            ) : (
              <div className="w-full">
                <CreatedCourses
                  headingsData={
                    isAdmin
                      ? ["Courses", "Enrolled", "Teacher", "Status"]
                      : ["Courses", "Enrolled", "Status"]
                  }
                  data={filteredData}
                  title=""
                  isCols={true}
                />
              </div>
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
