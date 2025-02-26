import React from "react";
import Heading from "./Heading";
import { RatingStars } from "./RatingStars";
import { GoStopwatch } from "react-icons/go";
import Image from "next/image";
import { MdOutlinePlayLesson } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";

const AboutInstructor = ({ data }) => {
  const lessonsData = [
    {
      Icon: <MdOutlinePlayLesson />,
      value: `${data?.totalCourses} Courses`,
      color: "text-blue-500", // Add a Tailwind class for blue color
    },
    {
      Icon: <FaRegCirclePlay />,
      value: `${data?.lessons}+ Lessons`,
      color: "text-green-500", // Add a Tailwind class for green color
    },
    {
      Icon: <GoStopwatch />,
      value: `${data?.totalTime}`,
      color: "text-yellow-500", // Add a Tailwind class for yellow color
    },
    {
      Icon: <FaUsers />,
      value: `${data?.totalStudents} students enrolled`,
      color: "text-red-500", // Add a Tailwind class for red color
    },
  ];

  return (
    <div className="course-sub-container">
      <Heading data="About Instructor" />
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 relative">
            <Image
              src={data?.courseInstructor?.profileImage}
              alt={data?.name}
              fill={true}
              className="object-cover rounded-full border-4 border-black/10"
            />
          </div>
          <div className="">
            <p className="text-lg font-semibold">{data?.courseInstructor?.firstName} {data?.courseInstructor?.lastName}</p>
            <p className="font-medium">{data?.courseInstructor?.role || "Instructor"}</p>
          </div>
        </div>
        <div className="flex items-center font-semibold gap-1">
          {data?.ratings && (
            <>
              <RatingStars rating={data?.rating} /> Instructor Rating
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

      <div className="">
        <p>
          <span className="font-semibold text-lg">Skills: </span>
          {data?.skills?.map((skill, i) => (
            <span key={i}>{skill}, </span>
          ))}{" "}
        </p>
      </div>
      <div className="text-lg font-medium">
        <p className="pb-2">Available for :</p>
        {data?.availableFor?.map((skill, i) => (
          <p key={i} className="text-base font-normal">
            {i + 1}. {skill}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AboutInstructor;
