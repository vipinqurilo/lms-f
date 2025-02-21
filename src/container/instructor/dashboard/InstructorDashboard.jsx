"use client";
import { StatsCard } from "@/components/student-dashboard/StatsCard";
import React, { useEffect } from "react";
import CreatedCourses from "./CreatedCourses";
import { CourseCard } from "@/components/student-dashboard/CourseCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllIntructorCourses } from "@/store/slices/instructor/courseSlice";
import Loader from "@/components/common/Loader";
import ScheduleView from "./ScheduleView";
import {
  FaBook,
  FaPlay,
  FaCheckCircle,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";
import { getInstructorTickets } from "@/store/slices/supportSlice";
import Link from "next/link";
import TicketCard from "./TicketCard";

const stats = [
  {
    title: "Enrolled Courses",
    value: 12,
    icon: <FaBook size={22} className="text-blue-500" />,
    color: "bg-blue-100",
  },
  {
    title: "Active Courses",
    value: 3,
    icon: <FaPlay size={22} className="text-green-500" />,
    color: "bg-green-100",
  },
  {
    title: "Completed Courses",
    value: 13,
    icon: <FaCheckCircle size={22} className="text-yellow-500" />,
    color: "bg-yellow-100",
  },
  {
    title: "Total Students",
    value: 20,
    icon: <FaUsers size={22} className="text-purple-500" />,
    color: "bg-purple-100",
  },
  {
    title: "Total Courses",
    value: 20,
    icon: <FaBook size={22} className="text-blue-600" />,
    color: "bg-blue-100",
  },
  {
    title: "Total Earnings",
    value: 456,
    icon: <FaDollarSign size={22} className="text-green-600" />,
    color: "bg-green-100",
  },
];

const headingsData = ["Courses", "Enrolled", "Status"];

const InstructorDashboard = () => {
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state.instructor.course.isLoading.getAllIntructorCourses
  );
  const { courses } = useSelector((state) => state.instructor.course);
  const { tickets } = useSelector((state) => state.support);
  const filteredData = courses?.map((course) => ({
    image: course?.courseImage,
    title: course?.courseTitle,
    des: course?.courseDescription,
    value2: course?.status,
    value1: 100,
  }));

  useEffect(() => {
    const requestData = {
      page: 1,
      limit: 10,
    };
    dispatch(getAllIntructorCourses(requestData));
    dispatch(getInstructorTickets(requestData));
  }, [dispatch]);

  return (
    <div className="w-full h-full p-10 pb-10">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader color={"text-secondary"} text={"Loader..."} isBig={true} />
        </div>
      ) : (
        <div className="w-full ">
          <div className="w-full flex items-start gap-5 justify-between">
            <div className="w-[70%] relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
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

              <CreatedCourses
                headingsData={headingsData}
                data={filteredData}
                isCols={true}
              />
            </div>
            <div className="w-[30%] sticky top-0 z-[0] space-y-5">
              <ScheduleView />
              <div className="w-full bg-white p-6 rounded-lg shadow-md border border-gray-200">
                {/* Header Section */}
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">
                    🎟️ Tickets
                  </h2>
                  <Link
                    href={"/instructor-dashboard/support"}
                    prefetch={false}
                    className="hover:text-secondary font-medium text-xs transition-custom"
                  >
                    View All →
                  </Link>
                </div>

                {/* Ticket List */}
                <div className="mt-4 space-y-4">
                  {tickets?.length === 0 ? (
                    <div className="text-center text-gray-500 text-sm py-4">
                      🚫 No tickets available
                    </div>
                  ) : (
                    tickets
                      ?.slice(0, 2)
                      .map((ticket, index) => (
                        <TicketCard ticket={ticket} key={index} />
                      ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;
