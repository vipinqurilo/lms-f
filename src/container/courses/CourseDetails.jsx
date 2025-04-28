"use client";
import AboutInstructor from "@/components/course-main-page/AboutInstructor";
import CommentForm from "@/components/course-main-page/CommentForm";
import CourseHighLights from "@/components/course-main-page/CourseHighLights";
import CourseOverview from "@/components/course-main-page/CourseOverview";
import CourseReview from "@/components/course-main-page/CourseReview";
import LecturesOverview from "@/components/course-main-page/LecturesOverview";
import TopSection from "@/components/course-main-page/TopSection";
import { makeCategorySubCategoryArray } from "@/store/slices/categorySlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CourseDetails = () => {
  const [isScrolled, setisScrolled] = useState(false);
  const { courseData: data, enrolledCourses } = useSelector(
    (state) => state.courses
  );
  const { subjects, subSubjects } = useSelector((state) => state.category);
  const { authUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isEnrolled =
    enrolledCourses &&
    enrolledCourses.some((item) => item?.courseId === data?.course?._id);

  const enrolledCourseData =
    enrolledCourses &&
    enrolledCourses.find((item) => item?.courseId === data?.course?._id);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (scrollY > 200) {
        setisScrolled(true);
      } else {
        setisScrolled(false);
      }
    });
  }, []);

  useEffect(() => {
    dispatch(makeCategorySubCategoryArray());
  }, [subjects, subSubjects]);

  const enrollNowRef = useRef(null);

  return (
    <div className="w-full relative overflow-hidden">
      <TopSection data={data?.course} />
      <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-10 custom-container relative">
        <div className="lg:hidden w-full lg:!w-[35%]">
          <CourseHighLights data={data} />
        </div>
        <div className="w-full lg:w-[65%] space-y-10">
          <CourseOverview data={data?.course} />
          <LecturesOverview
            data={data?.course?.courseContent}
            id={data?.course?._id}
            isEnrolled={isEnrolled}
            enrolledCourseData={enrolledCourseData}
          />
          <AboutInstructor data={data} />
          {authUser && authUser?.role === "student" && (
            <CommentForm id={data?.course?._id} data={data?.totalReviews} />
          )}
          <CourseReview data={data?.totalReviews} />
        </div>
        <div className="lg:block hidden w-full lg:!w-[30%] lg:-mt-80  lg:top-10">
          <CourseHighLights
            data={data}
            isEnrolled={isEnrolled}
            enrollNowRef={enrollNowRef}
            enrolledCourseData={enrolledCourseData}
          />
        </div>
      </div>
      {!isEnrolled && (
        <div className={`block ${isScrolled ? "lg:block" : "lg:hidden"}`}>
          <div className="w-full bg-white border-t border-black/10 fixed bottom-0 shadow-lg">
            <div className=" px-8 md:px-10 lg:px-20 py-4 flex items-center justify-between gap-5">
              <div className="flex items-center gap-2">
                <h3 className="text-green-500 text-2xl font-bold">
                  {data?.course?.coursePrice || "--"} R
                </h3>
                {/* <p className="text-gray-500">
                  <span className="line-through">₹1999.00</span>{" "}
                  <span>50% off</span>
                </p> */}
              </div>
              <button
                onClick={() => enrollNowRef.current?.click()}
                className="px-4 py-2 md:w-[40%] lg:w-[20%] bg-secondary hover:bg-black transition-custom w-full text-white rounded-full"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
