import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ScheduleView from "@/components/student-dashboard/ScheduleView";
import { CourseCard } from "../../components/student-dashboard/CourseCard";
import { StatsCard } from "../../components/student-dashboard/StatsCard";
import StudentDashboardLayout from "../../layouts/student-dashboard/StudentDashboardLayout";
import ContinueWatching from "@/components/student-dashboard/ContinueWatching";
import { fetchEnrolledCoursesAsync } from "@/store/slices/student-dashboard/enrolledCoursesSlice";
import { fetchBookingsAsync } from "@/store/slices/student-dashboard/bookingSlice";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { data: enrolledCourses, isLoading } = useSelector(
    (state) => state.student.enrolledCourses
  );
  const [startDate, setStartDate] = useState(new Date());

  const { bookings, isLoading: bookingLoading } = useSelector(
    (state) => state.student.booking
  );

  const stats = [
    {
      title: "Enrolled Courses",

      value: enrolledCourses?.length || 0,
      iconSrc: "assets/student-dashboard/icons/EnrolledCourses.svg",
      bgColor: "bg-[#EBEAFC]",
    },
    {
      title: "Active Courses",
      value: "03",
      iconSrc: "assets/student-dashboard/icons/ActiveCourses.svg",
      bgColor: "bg-[#DBFCDF]",
    },
    {
      title: "Completed Courses",
      value: "13",
      iconSrc: "assets/student-dashboard/icons/CompletedCourses.svg",
      bgColor: "bg-[#F8E9FC]",
    },
    {
      title: "Booked Courses",
      value: bookings?.length || 0,
      iconSrc: "assets/student-dashboard/icons/BookedCourses.svg",
      bgColor: "bg-[#E9F6FA]",
    },
  ];

  useEffect(() => {
    dispatch(fetchEnrolledCoursesAsync());
    dispatch(
      fetchBookingsAsync({
        status:"confirmed",
        startDate: startDate.toISOString(),
        page: 1,
        limit: 3,
      })
    );
  }, [dispatch, startDate]);

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
          <div className="w-2/3">
            <ScheduleView
              bookingLoading={bookingLoading?.["fetchBookingsAsync"]}
              startDate={startDate}
              setStartDate={setStartDate}
              bookings={bookings}
              link={"/student-dashboard/booking"}
            />
          </div>
        </div>

        {/* Recently Enrolled Courses */}
        {/* <div className="py-8">
          <h2 className="text-2xl font-bold text-dark mb-6">
            Recently Enrolled Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!isLoading["fetchEnrolledCoursesAsync"] &&
              enrolledCourses?.map((enrollment) => (
                <CourseCard
                  key={enrollment?._id}
                  course={{
                    id: enrollment?.course?._id,
                    title: enrollment?.course?.courseTitle,
                    instructor: {
                      name: enrollment?.course?.courseInstructor || "N/A",
                      image: enrollment?.course?.courseImage,
                    },
                    thumbnail: enrollment?.course?.courseImage,
                    lessons: enrollment?.course?.courseContent.reduce(
                      (acc, module) => acc + module.lessons.length,
                      0
                    ),
                    duration: "N/A", // Replace if duration data is available
                    price: enrollment?.course?.coursePrice,
                  }}
                  onWishlist={false}
                  onWishlistClick={() => {}}
                />
              ))}
          </div>
        </div> */}
      </div>
    </StudentDashboardLayout>
  );
}
