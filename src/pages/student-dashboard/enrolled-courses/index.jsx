"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import StudentDashboardLayout from "../../../layouts/student-dashboard/StudentDashboardLayout";
import { CourseCard } from "../../../components/student-dashboard/CourseCard";
import { fetchEnrolledCoursesAsync } from "@/store/slices/student-dashboard/enrolledCoursesSlice";
import TitleComp from "@/components/instructor/TitleComp";
import UserFilter from "@/components/admin-dashboard/user/UserFilter";
import { Pagination } from "@/components/student-dashboard/Pagination";
import Loader from "@/components/common/Loader";

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors
      ${
        active
          ? "bg-secondary text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
  >
    {children}
  </button>
);

export default function EnrolledCoursesPage() {
  const dispatch = useDispatch();
  const {
    data: enrolledCourses,
    isLoading,
    totalPages,
  } = useSelector((state) => state.student.enrolledCourses);
  const [filters, setfilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const data = {
      page: currentPage,
      limit: 5,
    };
    if (filters?.search) data.search = filters.search;
    dispatch(fetchEnrolledCoursesAsync(data));
  }, [dispatch, filters, currentPage]);

  // const tabs = [
  //   {
  //     id: "enrolled",
  //     label: "Enrolled Courses",
  //     count: enrolledCourses?.length?.toString(),
  //   },
  //   { id: "active", label: "Active Courses", count: "03" },
  //   { id: "completed", label: "Completed Courses", count: "03" },
  // ];

  return (
    <StudentDashboardLayout className="space-y-8 ">
      <div className="p-10">
        <div className="dashboard-container">
          <TitleComp
            heading={"Enrolled Courses"}
            des={
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, corporis."
            }
          />

          <div className="w-full !sticky !-top-0 bg-white px-5 !z-[5]">
            <UserFilter
              isRole={false}
              isStatus={false}
              statusData={[]}
              onApplyFilters={setfilters}
            />
          </div>

          {/* Orders Table */}
          {enrolledCourses?.length === 0 && (
            <p className="text-center py-12 text-gray-500">
              No Courses Entrolled
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 px-5">
            {isLoading["fetchEnrolledCoursesAsync"] ? (
              <div className="w-full col-span-3 py-10 flex items-center justify-center">
                <Loader color={"text-secondary"} isBig={true} />
              </div>
            ) : (
              enrolledCourses?.map((enrollment) => (
                <CourseCard
                  key={enrollment?._id}
                  course={{
                    id: enrollment?.courseId?._id,
                    title: enrollment?.courseId?.courseTitle,
                    instructor: {
                      name:
                        enrollment?.courseId?.courseInstructor?.email || "N/A",
                      image: enrollment?.courseId?.courseImage,
                    },
                    thumbnail: enrollment?.courseId?.courseImage,
                    lessons: enrollment?.courseId?.courseContent.reduce(
                      (acc, module) => acc + module.lessons.length,
                      0
                    ),
                    duration: "N/A", // Replace if duration data is available
                    price: enrollment?.courseId?.coursePrice,
                    originalPrice: "N/A", // Replace if original price is available
                  }}
                  onWishlist={false}
                  onWishlistClick={() => {}}
                />
                // <p>Hello</p>
              ))
            )}
          </div>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </StudentDashboardLayout>
  );
}
