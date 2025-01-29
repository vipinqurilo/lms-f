"use client";

import { useState } from "react";
import StudentDashboardLayout from "../../../layouts/student-dashboard/StudentDashboardLayout";
import { CourseCard } from "../../../components/student-dashboard/CourseCard";

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

const courses = {
  enrolled: [
    {
      id: "1",
      title: "Wordpress for Beginners - Master Wordpress Quickly",
      instructor: {
        name: "Cooper",
        image:
          "/assets/student-dashboard/course/course-03.jpg",
      },
      thumbnail:
        "/assets/student-dashboard/course/course-03.jpg",
      lessons: 12,
      duration: "70hr 30min",
      rating: 5.0,
      reviews: 20,
      price: 80,
      originalPrice: 99,
    },
    {
      id: "2",
      title: "Sketch from A to Z (2024): Become an app designer",
      instructor: {
        name: "Jenny",
        image:
          "/assets/student-dashboard/course/course-03.jpg",
      },
      thumbnail:
        "/assets/student-dashboard/course/course-03.jpg",
      lessons: 10,
      duration: "40hr 10min",
      rating: 3.0,
      reviews: 18,
      isFree: true,
    },
    {
      id: "3",
      title: "Learn Angular Fundamentals From beginning to advance...",
      instructor: {
        name: "Nicole Brown",
        image:
          "/assets/student-dashboard/course/course-03.jpg",
      },
      thumbnail:
        "/assets/student-dashboard/course/course-03.jpg",
      lessons: 15,
      duration: "80hr 40min",
      rating: 4.0,
      reviews: 10,
      price: 65,
      originalPrice: 70,
    },
  ],
  active: [
    // Add active courses data here
  ],
  completed: [
    // Add completed courses data here
  ],
};

export default function EnrolledCoursesPage() {
  const [activeTab, setActiveTab] = useState("enrolled");

  const tabs = [
    { id: "enrolled", label: "Enrolled Courses", count: "06" },
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
        {courses[activeTab].map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onWishlist={false}
            onWishlistClick={() => {}}
          />
        ))}
      </div>
    </StudentDashboardLayout>
  );
}
