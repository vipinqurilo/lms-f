"use client";
import InstructorButton from "@/components/instructor/InstructorButton";
import { CourseCard } from "@/components/student-dashboard/CourseCard";
import { Pagination } from "@/components/student-dashboard/Pagination";
import React, { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BiBook, BiCheckCircle, BiTime, BiEdit } from "react-icons/bi";
import DeleteModal from "@/components/instructor/DeleteModal";
import CommonButton from "@/components/common/CommonButton";

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

  return (
    <section className="dashboard-sub-container flex flex-col gap-6">
      <div className="flex items-center gap-4">
        {tabs.map((tab, index) => (
          <InstructorButton
            key={index}
            tab={tab?.tab}
            icon={tab?.icon}
            condition={`${selecteStatus === tab?.tab && "!bg-secondary text-white"}`}
            handleClick={() => handleStatusChange(tab?.tab)}
          />
        ))}
      </div>
      <div className="w-full grid grid-cols-3 gap-10">
        {filteredCourses?.map((course, index) => (
          <div className="border border-black/10 flex flex-col justify-between bg-white px-5 py-5 rounded-lg hover:bg-secondary/5 transition-custom">
            <CourseCard course={course} key={index} />
            <div className=" flex justify-between gap-2 pt-4">
              <CommonButton label={"Edit"} variant="secondary" />
              <CommonButton
                label={"Delete"}
                variant="secondary"
                onClick={() => setisDelete(course?.title)}
              />
            </div>
          </div>
        ))}
      </div>
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
