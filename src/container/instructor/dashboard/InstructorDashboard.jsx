"use client";
import { StatsCard } from "@/components/student-dashboard/StatsCard";
import React, { useEffect } from "react";
import CreatedCourses from "./CreatedCourses";
import { CourseCard } from "@/components/student-dashboard/CourseCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllIntructorCourses } from "@/store/slices/instructor/courseSlice";
import Loader from "@/components/common/Loader";
import ScheduleView from "./ScheduleView";

const stats = [
  { title: "Enrolled Courses", value: 12 },
  { title: "Active Courses", value: 3 },
  { title: "Completed Courses", value: 13 },
  { title: "Total Students", value: 20 },
  { title: "Total Courses", value: 20 },
  { title: "Total Earnings", value: 456 },
];

const recentCourses = [
  {
    id: "1",
    title: "Wordpress for Beginners - Master Wordpress Quickly",
    instructor: {
      name: "Cooper",
      image: "/assets/student-dashboard/user/user1.jpg",
    },
    thumbnail: "/assets/student-dashboard/course/course-03.jpg",
    lessons: 12,
    duration: "70hr 30min",
    rating: 5,
    reviews: 20,
    price: 80,
    originalPrice: 99,
  },
  {
    id: "2",
    title: "Sketch from A to Z (2024): Become an app designer",
    instructor: {
      name: "Jenny",
      image: "/assets/student-dashboard/user/user2.jpg",
    },
    thumbnail: "/assets/student-dashboard/course/course-04.jpg",
    lessons: 10,
    duration: "40hr 10min",
    rating: 3,
    reviews: 18,
    isFree: true,
  },
  {
    id: "3",
    title: "Learn Angular Fundamentals From beginning to advance...",
    instructor: {
      name: "Nicole Brown",
      image: "/assets/student-dashboard/user/user3.jpg",
    },
    thumbnail: "/assets/student-dashboard/course/course-02.jpg",
    lessons: 15,
    duration: "80hr 40min",
    rating: 4,
    reviews: 10,
    price: 65,
    originalPrice: 70,
  },
  {
    id: "4",
    title: "Wordpress for Beginners - Master Wordpress Quickly",
    instructor: {
      name: "Cooper",
      image: "/assets/student-dashboard/user/user1.jpg",
    },
    thumbnail: "/assets/student-dashboard/course/course-03.jpg",
    lessons: 12,
    duration: "70hr 30min",
    rating: 5,
    reviews: 20,
    price: 80,
    originalPrice: 99,
  },
  {
    id: "5",
    title: "Sketch from A to Z (2024): Become an app designer",
    instructor: {
      name: "Jenny",
      image: "/assets/student-dashboard/user/user2.jpg",
    },
    thumbnail: "/assets/student-dashboard/course/course-04.jpg",
    lessons: 10,
    duration: "40hr 10min",
    rating: 3,
    reviews: 18,
    isFree: true,
  },
  {
    id: "6",
    title: "Learn Angular Fundamentals From beginning to advance...",
    instructor: {
      name: "Nicole Brown",
      image: "/assets/student-dashboard/user/user3.jpg",
    },
    thumbnail: "/assets/student-dashboard/course/course-02.jpg",
    lessons: 15,
    duration: "80hr 40min",
    rating: 4,
    reviews: 10,
    price: 65,
    originalPrice: 70,
  },
];

const headingsData = ["Courses", "Enrolled", "Status"];

const InstructorDashboard = () => {
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state.instructor.course.isLoading.getAllIntructorCourses
  );
  const { courses } = useSelector((state) => state.instructor.course);
  const filteredData = courses?.map((course) => ({
    image: course?.thumbnail,
    title: course?.title,
    des: course?.description,
    value2: course?.status,
    value1: 100,
  }));

  useEffect(() => {
    dispatch(getAllIntructorCourses());
  }, []);

  return (
    <div className="w-full h-full">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader color={"text-secondary text-2xl"} text={"Loader..."} />
        </div>
      ) : (
        <div className="w-full h-full flex items-start gap-5 justify-between relative">
          <div className="w-[70%]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {stats.map((stat, index) => (
                <StatsCard key={index} title={stat.title} value={stat.value} />
              ))}
            </div>

            <CreatedCourses headingsData={headingsData} data={filteredData} />

            <div className="py-8">
              <h2 className="text-2xl font-bold text-background mb-6">
                Recently Enrolled Courses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          </div>
          <div className="w-[30%] sticky top-32 h-fit bg-gray-400">
            <ScheduleView />
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;
