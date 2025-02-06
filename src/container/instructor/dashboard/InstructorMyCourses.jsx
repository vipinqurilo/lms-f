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
import {
  deleteCourse,
  editCourseData,
  getAllIntructorCourses,
} from "@/store/slices/instructor/courseSlice";
import Loader from "@/components/common/Loader";

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
  const getloading = useSelector(
    (state) => state.instructor.course.isLoading.getAllIntructorCourses
  );
  const [isDelete, setisDelete] = useState(null);
  const [selecteStatus, setselecteStatus] = useState("All");
  const [filteredCourses, setfilteredCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const deleteLoading = useSelector(
    (state) => state.instructor.course.isLoading.deleteCourse
  );

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
    dispatch(deleteCourse(isDelete));
  };

  useEffect(() => {
    dispatch(getAllIntructorCourses());
  }, []);

  // const handleFilterCourse

  const handleEditCourse = (course) => {
    const data = {
      id: course?._id,
      basic: {
        title: course?.courseTitle,
        category: course?.courseCategory,
        requirements: course?.courseRequirements,
        whatYouWillLearn: course?.courseLearning,
        description: course?.courseDescription,
      },
      media: {
        video: course?.courseVideo,
        image: course?.courseImage,
      },
      curriculum: course?.courseContent,
      price: course?.coursePrice
    };
    dispatch(editCourseData(data));
    router.push("/instructor-dashboard/my-courses/add-course");
  };

  const filteredData = filteredCourses?.map((course) => ({
    image: course?.courseImage,
    title: course?.courseTitle,
    des: course?.courseDescription,
    value1: course?.entrolled || 425,
    value2: (
      <div className="flex items-center gap-5">
        <button onClick={() => handleEditCourse(course)} className="p-1.5 border border-black/10 rounded hover:border-green-200 transition-custom hover:text-green-500">
          <FiEdit3 size={20} className="" />
        </button>
        <button
          onClick={() => setisDelete(course?._id)}
          className="p-1.5 border border-black/10 rounded hover:border-red-200 transition-custom hover:text-red-500"
        >
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

      {getloading ? (
        <Loader color={"text-primary"} isBig={true} />
      ) : (
        <CreatedCourses
          headingsData={["Courses", "Enrolled", "Action"]}
          data={filteredData}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={5}
        onPageChange={(val) => setCurrentPage(val)}
      />

      {isDelete !== null && (
        <DeleteModal
          handleDelete={handleDelete}
          text={"Course"}
          loading={deleteLoading}
          onClose={() => setisDelete(null)}
        />
      )}
    </section>
  );
};

export default InstructorMyCourses;
