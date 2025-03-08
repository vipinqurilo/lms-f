"use client";

import React, { useEffect } from "react";
import Heading from "./Heading";
import { RatingStars } from "./RatingStars";
import Image from "next/image";
import { MdOutlinePlayLesson } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { makeCategorySubCategoryArray } from "@/store/slices/categorySlice";

const AboutInstructor = ({ data }) => {
  const lessonsData = [
    {
      Icon: <MdOutlinePlayLesson />,
      value: `${data?.totalCourses} Courses`,
      color: "text-blue-500", // Add a Tailwind class for blue color
    },
    // {
    //   Icon: <FaRegCirclePlay />,
    //   value: `${data?.lessons}+ Lessons`,
    //   color: "text-green-500", // Add a Tailwind class for green color
    // },
    // {
    //   Icon: <GoStopwatch />,
    //   value: `${data?.totalTime}`,
    //   color: "text-yellow-500", // Add a Tailwind class for yellow color
    // },
    {
      Icon: <FaUsers />,
      value: `${data?.totalStudents} students enrolled`,
      color: "text-red-500", // Add a Tailwind class for red color
    },
  ];

  const { languages } = useSelector((state) => state.languages);
  const { categories } = useSelector((state) => state.category);
  const course = data?.course;
  const teacherProfile = course?.courseInstructor?.teacherProfile;

  return (
    <div className="course-sub-container">
      <Heading data="About Instructor" />
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 border-4 border-black/10 relative flex items-center justify-center bg-gray-300 rounded-full overflow-hidden">
            {course?.courseInstructor?.profileImage ? (
              <Image
                src={course?.courseInstructor?.profileImage}
                alt={course?.courseInstructor?.firstName}
                fill={true}
                className="object-cover rounded-full"
              />
            ) : (
              <span className="text-black font-semibold text-lg">
                {course?.courseInstructor?.firstName
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() || "?"}
              </span>
            )}
          </div>
          <div className="">
            <p className="text-lg font-semibold">
              {course?.courseInstructor?.firstName}{" "}
              {course?.courseInstructor?.lastName}
            </p>
            <p className="font-medium">
              {course?.courseInstructor?.role || "Instructor"}
            </p>
          </div>
        </div>
        <div className="flex items-center font-semibold gap-1">
          {course?.ratings && (
            <>
              <RatingStars rating={course?.rating} /> Instructor Rating
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:gap-x-4 gap-y-4">
        {lessonsData.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className={`text-xl ${item.color}`}>{item.Icon}</span>
            <span className={item.color}>{item.value}</span>
          </div>
        ))}
      </div>

      <div className="text-lg font-medium">
        <p className="pb-2">Experience:</p>
        {teacherProfile?.experience?.map((exp, i) => (
          <p key={i} className="text-base font-normal">
            {exp.title} at {exp.company} (
            {new Date(exp.startDate).getFullYear()} -{" "}
            {new Date(exp.endDate).getFullYear()})
          </p>
        ))}
      </div>

      <div className="text-lg font-medium">
        <p className="pb-2">Education:</p>
        {teacherProfile?.education?.map((edu, i) => (
          <p key={i} className="text-base font-normal">
            {edu.title} from {edu.institute} (
            {new Date(edu.startDate).getFullYear()} -{" "}
            {new Date(edu.endDate).getFullYear()})
          </p>
        ))}
      </div>

      <div className="text-lg font-medium">
        <p className="pb-2">Languages Spoken:</p>
        {teacherProfile?.languagesSpoken?.map((lang, i) => (
          <span key={i} className="text-base text-light">
            {languages?.find((l) => l._id === lang)?.name}
            {i !== teacherProfile?.languagesSpoken.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>
      <div className="text-lg font-medium">
        <p className="pb-2">Subjects Taught:</p>
        {teacherProfile?.subjectsTaught?.map((sub, i) => (
          <span key={i} className="text-base text-light">
            {categories &&
              categories?.map(
                (cat) => cat?.subCategories?.find((s) => s?.id === sub)?.name
              )}
            {i !== teacherProfile?.subjectsTaught.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>

      <div className="text-lg font-medium">
        <p className="pb-2">Tuition Slots:</p>
        {teacherProfile?.tutionSlots?.map((slot, i) => (
          <span key={i} className="text-base text-light">
            {slot} mins
            {i !== teacherProfile?.tutionSlots.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AboutInstructor;
