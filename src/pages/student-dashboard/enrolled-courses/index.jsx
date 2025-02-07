"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import StudentDashboardLayout from "../../../layouts/student-dashboard/StudentDashboardLayout";
import { CourseCard } from "../../../components/student-dashboard/CourseCard";
import { fetchEnrolledCoursesAsync } from "@/store/slices/student-dashboard/enrolledCoursesSlice";

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors
      ${
        active
          ? "bg-primary text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
  >
    {children}
  </button>
);

export default function EnrolledCoursesPage() {
  const [activeTab, setActiveTab] = useState("enrolled");
  const dispatch = useDispatch();
  const { data: enrolledCourses, isLoading } = useSelector(
    (state) => state.student.enrolledCourses
  );
  console.log(enrolledCourses, "enrolledCourses");

  useEffect(() => {
    dispatch(fetchEnrolledCoursesAsync());
  }, [dispatch]);

  const tabs = [
    {
      id: "enrolled",
      label: "Enrolled Courses",
      count: enrolledCourses?.length?.toString(),
    },
    { id: "active", label: "Active Courses", count: "03" },
    { id: "completed", label: "Completed Courses", count: "03" },
  ];

  return (
    <StudentDashboardLayout className="space-y-8 ">
      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-6">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label} ({tab.count})
          </TabButton>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {!isLoading["fetchEnrolledCoursesAsync"] &&
          activeTab === "enrolled" &&
          enrolledCourses?.map((enrollment) => (
            <CourseCard
              key={enrollment._id}
              course={{
                id: enrollment.course._id,
                title: enrollment.course.courseTitle,
                instructor: {
                  name: enrollment.course.courseInstructor || "N/A",
                  image: enrollment.course.courseImage,
                },
                thumbnail: enrollment.course.courseImage,
                lessons: enrollment.course.courseContent.reduce(
                  (acc, module) => acc + module.lessons.length,
                  0
                ),
                duration: "N/A", // Replace if duration data is available
                price: enrollment.course.coursePrice,
                originalPrice: "N/A", // Replace if original price is available
              }}
              onWishlist={false}
              onWishlistClick={() => {}}
            />
          ))}
      </div>
    </StudentDashboardLayout>
  );
}
