"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function ContinueWatching() {
  const swiperRef = useRef(null);

  const { enrolledCourses, courses } = useSelector((state) => state.courses);

  const [continueCourse, setcontinueCourse] = useState([]);

  useEffect(() => {
    if (enrolledCourses?.length > 0 && courses?.length > 0) {
      const enrolledCoursesIds = enrolledCourses.map(
        (course) => course?.courseId
      );
      const continueWatching = courses.filter((course) =>
        enrolledCoursesIds.includes(course?._id)
      );
      setcontinueCourse(continueWatching);
    }
  }, [courses, enrolledCourses]);

  return (
    <div className="w-full py-6">
      <div className="flex items-end justify-between mb-6">
        <div className="flex items-center justify-between gap-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Continue Watching
          </h2>
          <Link
            href={"/student-dashboard/enrolled-courses"}
            className="text-sm font-medium text-secondary hover:text-primary underline"
          >
            Go to all courses
          </Link>
        </div>
        <div className="flex gap-2">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-secondary text-gray-400 hover:text-white "
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-secondary text-gray-400 hover:text-white "
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={2.5}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          640: {
            slidesPerView: 2.5,
          },
          1024: {
            slidesPerView: 2.5,
          },
        }}
      >
        {continueCourse?.map((course, index) => (
          <SwiperSlide key={index}>
            <CourseCard course={course} enrolledCourses={enrolledCourses} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function CourseCard({ course, enrolledCourses }) {
  const enrolledCourseData =
    enrolledCourses &&
    enrolledCourses.find((item) => item?.courseId === course?._id);

  return (
    <div className="bg-white rounded-2xl overflow-hidden  border border-gray-100 ">
      <div className="relative w-full h-48">
        <Image
          src={course?.courseImage || "/placeholder.svg"}
          alt={course.courseTitle}
          fill
          className="object-cover filter brightness-75" // Added black filter
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Progress overlay at the bottom of the image */}
        <div className="absolute bottom-0 left-0  right-0 h-1 bg-gray-200 z-10">
          <div
            className="h-full bg-blue-400 transition-all duration-300"
            style={{ width: `${enrolledCourseData?.progress}%` }}
          />
        </div>
        {/* Progress percentage */}
        <div className="absolute bottom-2 right-2 px-2 py-1 text-xs font-medium bg-black/60 text-white rounded-md z-10">
          {enrolledCourseData?.progress}%
        </div>
      </div>
      <div className="p-5">
        <div
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 bg-blue-100`}
        >
          {course?.courseSubCategory?.name}
        </div>
        <Link href={`/courses/${course?._id}`}>
          <h3 className="text-gray-900 font-semibold line-clamp-2 hover:text-secondary transition-custom">
            {course?.courseTitle}
          </h3>
        </Link>
        <p className="!mt-2 text-sm text-gray-500 line-clamp-2 mb-4">
          {course?.courseDescription}
        </p>
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <Image
              src={course?.courseInstructor?.profilePhoto || "/placeholder.svg"}
              alt={course.courseInstructor.firstName}
              fill
              className="rounded-full object-cover"
              sizes="32px"
            />
          </div>
          <div className="text-sm text-gray-600">
            {course?.courseInstructor?.firstName}{" "}
            {course?.courseInstructor?.lastName}
          </div>
        </div>
      </div>
    </div>
  );
}
