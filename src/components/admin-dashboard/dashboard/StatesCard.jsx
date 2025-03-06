import { StatsCard } from "@/components/student-dashboard/StatsCard";
import React from "react";
import {
  FaBook,
  FaShoppingCart,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";
import { useSelector } from "react-redux";

export default function StatesCard() {
  const { data } = useSelector((state) => state.admin.adminDashboard);

  const stats = [
    {
      title: "Total Courses",
      value: data?.totalCourses || 0,
      icon: <FaBook size={30} className="text-blue-600" />,
      color: "bg-blue-100",
    },
    {
      title: "Total Bookings",
      value: data?.totalBooking || 0,
      icon: <FaShoppingCart size={30} className="text-red-500" />,
      color: "bg-red-100",
    },
    {
      title: "Total Instructors",
      value: data?.totalTeachers || 0,
      icon: <FaChalkboardTeacher size={30} className="text-yellow-600" />,
      color: "bg-yellow-100",
    },
    {
      title: "Total Students",
      value: data?.totalStudents || 0,
      icon: <FaUserGraduate size={30} className="text-purple-600" />,
      color: "bg-purple-100",
    },
    {
      title: "Total Categories",
      value: data?.totalCategory || 0,
      icon: <FaDollarSign size={30} className="text-green-600" />,
      color: "bg-green-100",
    },
    {
      title: "Total Sub Categories",
      value: data?.totalSubCategory || 0,
      icon: <FaDollarSign size={30} className="text-green-600" />,
      color: "bg-green-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          isIcon={true}
          Icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
}
