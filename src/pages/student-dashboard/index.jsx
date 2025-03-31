"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ScheduleView from "@/components/student-dashboard/ScheduleView";
import { StatsCard } from "../../components/student-dashboard/StatsCard";
import StudentDashboardLayout from "../../layouts/student-dashboard/StudentDashboardLayout";
import ContinueWatching from "@/components/student-dashboard/ContinueWatching";
import { fetchBookingsAsync } from "@/store/slices/bookingSlice";
import TicketsContainer from "@/container/instructor/dashboard/TicketsContainer";
import { getInstructorTickets } from "@/store/slices/supportSlice";

import { getAllEnrolledCourses } from "@/store/slices/coursesSlice";


export default function DashboardPage() {
  const dispatch = useDispatch();
  const { enrolledCourses } = useSelector((state) => state.courses);
  const { tickets } = useSelector((state) => state.support);

  const [startDate, setStartDate] = useState(new Date());

  const { bookings, isLoading } = useSelector((state) => state.booking);

  const stats = [
    {
      title: "Enrolled Courses",
      value: (enrolledCourses && enrolledCourses?.length) || 0,
      iconSrc: "assets/student-dashboard/icons/EnrolledCourses.svg",
      bgColor: "bg-[#EBEAFC]",
    },
    {
      title: "Active Courses",
      value:
        (enrolledCourses &&
          enrolledCourses?.filter((item) => item?.progress !== 100)?.length) ||
        0,
      iconSrc: "assets/student-dashboard/icons/ActiveCourses.svg",
      bgColor: "bg-[#DBFCDF]",
    },
    {
      title: "Completed Courses",
      value:
        (enrolledCourses &&
          enrolledCourses?.filter((item) => item?.progress === 100)?.length) ||
        0,
      iconSrc: "assets/student-dashboard/icons/CompletedCourses.svg",
      bgColor: "bg-[#F8E9FC]",
    },
    {
      title: "Booked Lessons",
      value: bookings?.length || 0,
      iconSrc: "assets/student-dashboard/icons/BookedCourses.svg",
      bgColor: "bg-[#E9F6FA]",
    },
  ];

  useEffect(() => {
    dispatch(getAllEnrolledCourses());
    dispatch(
      fetchBookingsAsync({
        status: "confirmed",
        startDate: startDate.toISOString(),
        page: 1,
        limit: 3,
      })
    );
  }, [dispatch, startDate]);

  useEffect(() => {
    dispatch(
      getInstructorTickets({
        page: 1,
        limit: 10,
      })
    );
  }, []);

  return (
    <StudentDashboardLayout>
      <div className="w-full p-10 space-y-8">
        <div className="flex gap-6">
          <div className="w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {stats.map((stat, index) => (
                <StatsCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  iconSrc={stat.iconSrc}
                  bgColor={stat.bgColor}
                />
              ))}
            </div>
            <ContinueWatching />
          </div>

          <div className="w-[30%] sticky top-0 z-[0] space-y-5">
            <ScheduleView
              bookingLoading={isLoading?.["fetchBookingsAsync"]}
              startDate={startDate}
              setStartDate={setStartDate}
              bookings={bookings}
              link={"/student-dashboard/booking"}
            />
            <TicketsContainer
              link={"/student-dashboard/support"}
              tickets={tickets}
            />
          </div>
        </div>
    </div>
    </StudentDashboardLayout>
  );
}
