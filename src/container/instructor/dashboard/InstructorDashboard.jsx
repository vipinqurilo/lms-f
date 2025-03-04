"use client";
import { StatsCard } from "@/components/student-dashboard/StatsCard";
import React, { useEffect, useState } from "react";
import CreatedCourses from "./CreatedCourses";
import { useDispatch, useSelector } from "react-redux";
import { getAllIntructorCourses } from "@/store/slices/instructor/courseSlice";
import Loader from "@/components/common/Loader";
import {
  FaBook,
  FaPlay,
  FaCheckCircle,
  FaUsers,
  FaCalendarCheck,
} from "react-icons/fa";
import { getInstructorTickets } from "@/store/slices/supportSlice";
import Link from "next/link";
import TicketCard from "./TicketCard";
import { TbMoneybag } from "react-icons/tb";
import ScheduleView from "@/components/student-dashboard/ScheduleView";
import { getBookings } from "@/store/slices/instructor/bookingsSlice";
import dateFormat from "dateformat";

const stats = [
  {
    title: "Total Courses",
    value: 20,
    icon: <FaBook size={25} className="text-blue-600" />,
    color: "bg-blue-100/60",
  },
  {
    title: "Published Courses",
    value: 3,
    icon: <FaPlay size={25} className="text-green-500" />,
    color: "bg-green-100/60",
  },
  {
    title: "Inactive Courses",
    value: 13,
    icon: <FaCheckCircle size={25} className="text-yellow-500" />,
    color: "bg-yellow-100/60",
  },
  {
    title: "Total Students",
    value: 20,
    icon: <FaUsers size={25} className="text-purple-500" />,
    color: "bg-purple-100/60",
  },
  {
    title: "Total Bookings",
    value: 12,
    icon: <FaCalendarCheck size={25} className="text-orange-500" />,
    color: "bg-orange-100/60",
  },
  {
    title: "Total Earnings",
    value: 456,
    icon: <TbMoneybag size={25} className="text-green-600" />,
    color: "bg-green-100/60",
  },
];

const headingsData = ["Courses", "Enrolled", "Status"];

const InstructorDashboard = () => {
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state.instructor.course.isLoading.getAllIntructorCourses
  );
  const { courses } = useSelector((state) => state.instructor.course);
  const { bookings, isLoading } = useSelector((state) => state.instructor.booking);
  const { tickets } = useSelector((state) => state.support);
  const filteredData = courses?.slice(0, 5)?.map((course) => ({
    image: course?.courseImage,
    title: course?.courseTitle,
    des: course?.courseDescription,
    value2: course?.status,
    value1: 100,
  }));
  const [startDate, setstartDate] = useState(new Date()) 

  useEffect(() => {
    const requestData = {
      page: 1,
      limit: 10,
    };
    dispatch(getAllIntructorCourses(requestData));
    dispatch(getInstructorTickets(requestData));
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getBookings({ startDate: dateFormat(startDate, "yyyy-mm-dd") }))
  }, [startDate])
  
  return (
    <div className="w-full p-10">
      {loading ? (
        <div className="w-full h-[calc(100vh-200px)] flex items-center justify-center">
          <Loader color={"text-secondary"} text={"Loader..."} isBig={true} />
        </div>
      ) : (
        <div className="w-full ">
          <div className="w-full flex items-start gap-5 justify-between">
            <div className="w-[70%] relative flex flex-col gap-6">
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
              <div className="rounded-lg overflow-hidden">
                <CreatedCourses
                  headingsData={headingsData}
                  data={filteredData}
                  isCols={true}
                />
              </div>
            </div>
            <div className="w-[30%] sticky top-0 z-[0] space-y-5">
              <ScheduleView bookingLoading={isLoading["getBookings"]} startDate={startDate} setStartDate={setstartDate} bookings={bookings} link={"/instructor-dashboard/bookings"} />
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
