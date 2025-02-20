"use client";
import InstructorButton from "@/components/instructor/InstructorButton";
import { Pagination } from "@/components/student-dashboard/Pagination";
import React, { useEffect, useMemo, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BiBook, BiCheckCircle, BiTime, BiEdit } from "react-icons/bi";
import DeleteModal from "@/components/instructor/DeleteModal";
import { useRouter } from "next/navigation";
import CreatedCourses from "./CreatedCourses";
import {
  deleteCourse,
  editCourseData,
  getAllIntructorCourses,
} from "@/store/slices/instructor/courseSlice";
import Loader from "@/components/common/Loader";
import TitleComp from "@/components/instructor/TitleComp";

const tabs = [
  {
    icon: <BiBook size={20} />,
    tab: "All",
  },
  {
    icon: <BiCheckCircle size={20} />,
    tab: "Published",
  },
  {
    icon: <BiTime size={20} />,
    tab: "Pending",
  },
];

const InstructorMyCourses = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { courses, totalPages } = useSelector((state) => state.instructor.course);
  const getloading = useSelector(
    (state) => state.instructor.course.isLoading.getAllIntructorCourses
  );
  const [isDelete, setisDelete] = useState(null);
  const [selecteStatus, setselecteStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const deleteLoading = useSelector(
    (state) => state.instructor.course.isLoading.deleteCourse
  );

  const handleStatusChange = (value) => setselecteStatus(value);

  const handleDelete = () => {
    dispatch(deleteCourse(isDelete))
      .unwrap()
      .then(() => setisDelete(null));
  };

  useEffect(() => {
    const status =
      selecteStatus?.toLowerCase() === "all"
        ? undefined
        : selecteStatus?.toLowerCase();
    const requestData = {
      page: currentPage,
      limit: 10,
    };
    if (status) {
      requestData.status = status.toLowerCase();
    }
    dispatch(getAllIntructorCourses(requestData));
  }, [selecteStatus, dispatch, currentPage]);

  const handleEditCourse = (course) => {
    const data = {
      id: course?._id,
      basic: {
        title: course?.courseTitle,
        courseCategory: course?.courseCategory,
        courseSubCategory: course?.courseSubCategory?._id,
        features: course?.courseFeatures,
        requirements: course?.courseRequirements,
        whatYouWillLearn: course?.courseLearning,
        description: course?.courseDescription,
      },
      media: {
        video: course?.courseVideo,
        image: course?.courseImage,
      },
      curriculum: course?.courseContent,
      price: course?.coursePrice,
    };
    dispatch(editCourseData(data));
    router.push("/instructor-dashboard/my-courses/add-course");
  };

  const filteredData = useMemo(() => {
    return courses?.map((course) => ({
      image: course?.courseImage,
      title: course?.courseTitle,
      des: course?.courseDescription,
      value1: course?.entrolled || 425,
      value2: (
        <div className="flex items-center gap-5">
          <button
            onClick={() => handleEditCourse(course)}
            className="p-1.5 border border-black/10 rounded hover:border-green-200 transition-custom hover:text-green-500"
          >
            <FiEdit3 size={20} />
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
  }, [courses]);

  return (
    <>
      <main className="p-10 ">
        <div className="dashboard-container pb-10">
          <TitleComp
            heading={"My Courses"}
            des={"Manage your courses and its updates"}
            iscourse={true}
          />
          <div className=" flex flex-col px-5">
            <div className="flex items-center gap-4 sticky top-0 bg-white z-10 py-4">
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
              <div className="w-full flex items-center justify-center py-8">
                <Loader color={"text-secondary"} isBig={true} />
              </div>
            ) : courses?.length === 0 ? (
              <div className="w-full py-12 flex items-center justify-center text-light">
                No Courses Created
              </div>
            ) : (
              <>
                <CreatedCourses
                  headingsData={["Courses", "Enrolled", "Action"]}
                  data={filteredData}
                />
              </>
            )}

            {isDelete !== null && (
              <DeleteModal
                handleDelete={handleDelete}
                text={"Course"}
                loading={deleteLoading}
                onClose={() => setisDelete(null)}
              />
            )}
          </div>
        </div>
      </main>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(val) => setCurrentPage(val)}
      />
    </>
  );
};

export default InstructorMyCourses;
