"use client";
import InstructorButton from "@/components/instructor/InstructorButton";
import { CourseCard } from "@/components/student-dashboard/CourseCard";
import { Pagination } from "@/components/student-dashboard/Pagination";
import React, { useEffect, useState } from "react";
import { FiEdit, FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BiBook, BiCheckCircle, BiTime, BiEdit } from "react-icons/bi";
import DeleteModal from "@/components/instructor/DeleteModal";
import CommonButton from "@/components/common/CommonButton";
import { useRouter } from "next/navigation";
import CreatedCourses from "./CreatedCourses";

const tabs = [
  {
    icon: <BiBook size={20} />,
    tab: "All",
  },
  {
    icon: <BiCheckCircle size={20} />,
    tab: "Publish",
  },
  {
    icon: <BiTime size={20} />,
    tab: "Pending",
  },
  {
    icon: <BiEdit size={20} />,
    tab: "Draft",
  },
];

const InstructorMyCourses = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { courses } = useSelector((state) => state.instructor.course);
  const [isDelete, setisDelete] = useState(null);
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

  const handleDelete = () => {
    console.log(isDelete);
  };

  const filteredData = filteredCourses?.map((course) => ({
    image: course?.thumbnail,
    title: course?.title,
    des: course?.description,
    value1: course?.entrolled || 425,
    value2: (
      <div className="flex items-center gap-5">
        <button className="p-1.5 border border-black/10 rounded hover:border-green-200 transition-custom hover:text-green-500">
          <FiEdit3 size={20} className="" />
        </button>
        <button className="p-1.5 border border-black/10 rounded hover:border-red-200 transition-custom hover:text-red-500">
          <MdDeleteOutline size={20} />
        </button>
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

      <CreatedCourses
        headingsData={["Courses", "Enrolled", "Action"]}
        data={filteredData}
      />

      {/* <div className="w-full grid grid-cols-3 gap-5">
        {filteredCourses?.map((course, index) => (
          <div className="relative flex items-start gap-2">
            <CourseCard course={course} key={index} />
            <div className="flex items-center gap-2 flex-col ">
              <CommonButton label={<FiEdit size={20} />} variant="secondary" />
              <CommonButton
                label={<MdDeleteOutline size={20} />}
                variant="secondary"
                onClick={() => setisDelete(course?.title)}
              />
            </div>
          </div>
        ))}
      </div> */}
      <Pagination
        currentPage={currentPage}
        totalPages={5}
        onPageChange={(val) => setCurrentPage(val)}
      />

      {isDelete !== null && (
        <DeleteModal
          handleDelete={handleDelete}
          onClose={() => setisDelete(null)}
        />
      )}
    </section>
  );
};

export default InstructorMyCourses;
