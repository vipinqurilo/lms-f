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
import { TbMoneybag } from "react-icons/tb";
import ScheduleView from "@/components/student-dashboard/ScheduleView";
import { getBookings } from "@/store/slices/instructor/bookingsSlice";
import dateFormat from "dateformat";
import TicketsContainer from "./TicketsContainer";
import { getCardStats } from "@/store/slices/instructor/dashboardSlice";

const headingsData = ["Courses", "Enrolled", "Status"];

const InstructorDashboard = () => {
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state.instructor.course.isLoading.getAllIntructorCourses
  );
  const { courses } = useSelector((state) => state.instructor.course);
  const { data } = useSelector((state) => state.instructor.dashboard);
  const { bookings, isLoading } = useSelector(
    (state) => state.instructor.booking
  );
  const { tickets } = useSelector((state) => state.support);
  const filteredData = courses?.slice(0, 5)?.map((course) => ({
    id: course?._id,
    image: course?.courseImage,
    title: course?.courseTitle,
    des: course?.courseDescription,
    value2: course?.status,
    value1: 100,
  }));
  const [startDate, setstartDate] = useState(new Date());

  useEffect(() => {
    const requestData = {
      page: 1,
      limit: 10,
    };
    dispatch(getAllIntructorCourses(requestData));
    dispatch(getInstructorTickets(requestData));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBookings({ startDate: dateFormat(startDate, "yyyy-mm-dd") }));
  }, [startDate]);

  useEffect(() => {
    dispatch(getCardStats());
  }, []);

  const stats = [
    {
      title: "Total Courses",
      value: data?.totalCourses || 0,
      icon: <FaBook size={25} className="text-blue-600" />,
      color: "bg-blue-100/60",
    },
    {
      title: "Published Courses",
      value: data?.publishedCourses || 0,
      icon: <FaPlay size={25} className="text-green-500" />,
      color: "bg-green-100/60",
    },
    {
      title: "Inactive Courses",
      value: data?.inactiveCourses || 0,
      icon: <FaCheckCircle size={25} className="text-yellow-500" />,
      color: "bg-yellow-100/60",
    },
    {
      title: "Total Students",
      value: data?.students || 0,
      icon: <FaUsers size={25} className="text-purple-500" />,
      color: "bg-purple-100/60",
    },
    {
      title: "Total Bookings",
      value: data?.totalBookings || 0,
      icon: <FaCalendarCheck size={25} className="text-orange-500" />,
      color: "bg-orange-100/60",
    },
    {
      title: "Total Earnings",
      value: data?.totalEearnings || 0,
      icon: <TbMoneybag size={25} className="text-green-600" />,
      color: "bg-green-100/60",
    },
  ];

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
                  link={"/instructor-dashboard/my-courses"}
                />
              </div>
            </div>
            <div className="w-[30%] sticky top-0 z-[0] space-y-5">
              <ScheduleView
                bookingLoading={isLoading["getBookings"]}
                startDate={startDate}
                setStartDate={setstartDate}
                bookings={bookings}
                link={"/instructor-dashboard/bookings"}
              />
              <TicketsContainer
                link={"/instructor-dashboard/support"}
                tickets={tickets}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;
